import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Estadisticas = () => {
  const location = useLocation();
  const jugador = location.state?.jugador;
  const [estadisticas, setEstadisticas] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/estadisticas/${jugador.id}`)
      .then((res) => res.json())
      .then((data) => setEstadisticas(data))
      .catch((err) => console.error("Error al obtener estadísticas:", err));
  }, [jugador]);

  if (!estadisticas) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#081C3A] to-[#15317E] flex items-center justify-center text-white">
        Cargando estadísticas...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#081C3A] to-[#15317E] p-8 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-yellow-300 mb-4">
          Estadísticas de {jugador.player_name}
        </h1>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center sm:items-stretch">
          <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-lg w-full sm:w-1/2">
            <img
              src={jugador.photo}
              alt={jugador.player_name}
              className="w-32 h-32 object-cover rounded-full border-2 border-white mx-auto mb-4"
            />
            <h2 className="text-lg font-semibold">{jugador.player_name}</h2>
            <p className="text-sm text-gray-300">Dorsal: {jugador.number}</p>
            <p className="text-sm text-gray-300">Posición: {jugador.position}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-lg w-full sm:w-1/2">
            <h3 className="text-xl font-bold text-yellow-300 mb-4">Temporada actual</h3>
            <p className="text-sm mb-2">Partidos: {estadisticas.partidos}</p>
            <p className="text-sm mb-2">Goles: {estadisticas.goles}</p>
            <p className="text-sm mb-2">Asistencias: {estadisticas.asistencias}</p>
            <p className="text-sm mb-2">Minutos jugados: {estadisticas.minutos}</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-yellow-300 mb-2">Gráfico de rendimiento</h3>
          <div className="w-full h-64 bg-white/10 border border-white/10 rounded-xl flex items-center justify-center text-sm text-gray-300">
            Próximamente: Visualización avanzada
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;
