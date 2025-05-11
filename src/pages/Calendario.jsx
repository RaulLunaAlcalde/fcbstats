import React, { useEffect, useState } from 'react';

const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const Calendario = () => {
  const [partidos, setPartidos] = useState([]);
  const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth());
  const [añoSeleccionado, setAñoSeleccionado] = useState(new Date().getFullYear());

  useEffect(() => {
    fetch('http://localhost:5000/api/calendario')
      .then(response => response.json())
      .then(data => setPartidos(data))
      .catch(error => console.error('Error al cargar los partidos:', error));
  }, []);

  const partidosDelMes = partidos.filter(p => {
    const [año, mes] = p.fecha.split('-').map(Number);
    return mes === mesSeleccionado + 1 && año === añoSeleccionado;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#081C3A] to-[#15317E] p-8 text-white">
      <h2 className="text-3xl font-bold text-center text-yellow-300 mb-6">
        Partidos del FC Barcelona - {meses[mesSeleccionado]} {añoSeleccionado}
      </h2>

      <div className="flex justify-center gap-4 mb-8">
        <select
          value={mesSeleccionado}
          onChange={(e) => setMesSeleccionado(parseInt(e.target.value))}
          className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg"
        >
          {meses.map((mes, idx) => (
            <option key={idx} value={idx}>{mes}</option>
          ))}
        </select>

        <select
          value={añoSeleccionado}
          onChange={(e) => setAñoSeleccionado(parseInt(e.target.value))}
          className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg"
        >
          {[2024, 2025].map((año) => (
            <option key={año} value={año}>{año}</option>
          ))}
        </select>
      </div>

      {partidosDelMes.length === 0 ? (
        <p className="text-center text-gray-300">No hay partidos este mes.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partidosDelMes.map((partido, index) => {
            const fecha = new Date(`${partido.fecha}T00:00:00`);
            return (
              <div key={index} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-md flex flex-col items-center">
                <div className="text-sm font-semibold text-yellow-300 mb-1">
                  {fecha.toLocaleDateString()} - {partido.hora}
                </div>
                <div className="flex items-center gap-2">
                  <img src={partido.localImage} alt="local" className="w-8 h-8" />
                  <span className="font-medium text-sm">{partido.local}</span>
                  <span className="text-xs font-semibold">vs</span>
                  <span className="font-medium text-sm">{partido.visitante}</span>
                  <img src={partido.visitanteImage} alt="visitante" className="w-8 h-8" />
                </div>
                <div className="text-xs text-gray-300 mt-2">{partido.liga}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Calendario;
