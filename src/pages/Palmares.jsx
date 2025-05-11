import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const titulosTotales = [
  { nombre: 'Champions League', cantidad: 5, imagen: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632/d6297891682131.5e3864b00f466.png' },
  { nombre: 'La Liga', cantidad: 27, imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/LaLiga_EA_Sports_2023_Vertical_Logo.svg/1200px-LaLiga_EA_Sports_2023_Vertical_Logo.svg.png' },
  { nombre: 'Copa del Rey', cantidad: 31, imagen: '/trofeos/copadelrey.png' },
  { nombre: 'Mundial de Clubes', cantidad: 3, imagen: '/trofeos/mundial.png' }
];

const resumenesPorDecada = {
  "1950s": {
    presidente: "Francesc Miró-Sans",
    entrenadores: ["Ferdinand Daučík", "Domènec Balmanya"],
    resumen: `La década de 1950 fue una era dorada inicial para el FC Barcelona. Destacó por la incorporación de Ladislao Kubala, una de las grandes figuras del fútbol de la época, que transformó el juego ofensivo del equipo. Se ganaron numerosas Copas y Ligas, y en 1957 se inauguró el Camp Nou, un estadio colosal para la época, reflejo del crecimiento y la ambición del club. Fue un periodo de consolidación tanto deportiva como institucional.`,
    imagen: "https://www.fcbarcelona.com/fcbarcelona/photo/2018/03/13/8b8bd472-6ec5-4e24-92b0-9948112eb78a/16183532.jpg"
  },
  "1960s": {
    presidente: "Enric Llaudet",
    entrenadores: ["Vic Buckingham", "Roque Olsen"],
    resumen: `Los años 60 fueron una década de transición, marcada por inestabilidad deportiva y pocas alegrías en cuanto a títulos. El equipo vivió varios cambios en el banquillo y una constante renovación de plantilla. Sin embargo, el Barça mantuvo su papel como uno de los grandes del fútbol español y europeo, afianzando su masa social y sentando bases para un crecimiento posterior.`,
    imagen: "https://fcb-abj-pre.s3.amazonaws.com/img/plantilles/1964-65.jpg"
  },
  "1970s": {
    presidente: "Agustí Montal i Costa",
    entrenadores: ["Rinus Michels", "Weisweiler", "Lucien Muller"],
    resumen: `Esta década vio la llegada de Johan Cruyff como jugador, un ícono que revolucionaría al club no solo en el campo, sino también en su filosofía de juego. En 1974, el equipo ganó la Liga tras una sequía de 14 años, destacando una histórica victoria 0-5 en el Bernabéu. Aunque los títulos fueron limitados, se instauró un estilo que marcaría el futuro del club.`,
    imagen: "https://fcb-abj-pre.s3.amazonaws.com/img/plantilles/1974-75.jpg"
  },
  "1980s": {
    presidente: "Josep Lluís Núñez",
    entrenadores: ["Terry Venables", "Luis Aragonés"],
    resumen: `Durante los años 80, el club vivió momentos de reconstrucción. Se lograron títulos importantes como una Liga tras más de una década y la primera Recopa de Europa. La gestión de Núñez consolidó el modelo de club moderno, con fuerte presencia institucional. Hacia finales de la década, se preparó el terreno para la llegada del Dream Team en los 90.`,
    imagen: "https://fcb-abj-pre.s3.amazonaws.com/img/plantilles/1984-85.jpg"
  },
  "1990s": {
    presidente: "Josep Lluís Núñez",
    entrenadores: ["Johan Cruyff", "Louis van Gaal"],
    resumen: `La década de los 90 es recordada como una de las más gloriosas en la historia del club. Con Johan Cruyff en el banquillo, nació el Dream Team, que ganó cuatro Ligas consecutivas y, en 1992, la primera Copa de Europa en Wembley. El estilo de posesión y ataque que impuso Cruyff se convirtió en la seña de identidad del Barça. Más adelante, Van Gaal continuó con los éxitos en competiciones domésticas.`,
    imagen: "https://fcb-abj-pre.s3.amazonaws.com/img/plantilles/1997-98.jpg"
  },
  "2000s": {
    presidente: "Joan Laporta",
    entrenadores: ["Frank Rijkaard", "Pep Guardiola"],
    resumen: `Una década que comenzó con dudas, pero que alcanzó la cima con el renacer del club gracias a figuras como Ronaldinho y Messi. Bajo Rijkaard se recuperó el prestigio europeo con una Champions en 2006. Con Guardiola, el Barça alcanzó el cénit del fútbol mundial, ganando seis títulos en 2009 y maravillando al mundo con un juego de posesión y presión inigualable.`,
    imagen: "https://fcb-abj-pre.s3.amazonaws.com/img/plantilles/2005-06.jpg"
  },
  "2010s": {
    presidente: "Sandro Rosell / Josep Maria Bartomeu",
    entrenadores: ["Pep Guardiola", "Luis Enrique", "Valverde"],
    resumen: `Una de las décadas más exitosas del club. Bajo Guardiola se consolidó el estilo tiki-taka, con Lionel Messi en su máximo esplendor. Luis Enrique logró el segundo triplete en 2015, y Valverde mantuvo la competitividad en La Liga. A pesar de algunas decepciones europeas, el dominio nacional fue absoluto y se vivió una era de fútbol brillante.`,
    imagen: "https://fcb-abj-pre.s3.amazonaws.com/img/plantilles/2014-15.jpg"
  },
  "2020s": {
    presidente: "Joan Laporta (segunda etapa)",
    entrenadores: ["Ronald Koeman", "Xavi Hernández", "Hansi Flick"],
    resumen: `Tras una etapa complicada por la marcha de Messi y problemas económicos, el club apostó por la cantera y el liderazgo de Xavi. En 2023 se ganó la Liga y la Supercopa de España, sentando las bases para una nueva era de reconstrucción y esperanza. La identidad futbolística empieza a consolidarse nuevamente con una plantilla joven y competitiva tras la llegada del nuevo técnico Hansi Flick, entrenador por el cual apostó la directiva tras el despido de Xavi Hernández.`,
    imagen: "https://monesport.cat/app/uploads/sites/12/2024/08/guzi4rkw0aamc4p-scaled.jpg"
  }
};

const dataPorDecada = Object.entries(resumenesPorDecada).map(([decada, datos]) => ({
  decada,
  titulos: Math.floor(Math.random() * 10) + 5 
}));

const dataPorTipo = titulosTotales.map(t => ({
  titulo: t.nombre,
  cantidad: t.cantidad
}));

const Palmares = () => {
  const [decadaSeleccionada, setDecadaSeleccionada] = useState('2010s');
  const [modoGrafica, setModoGrafica] = useState('decada');
  const resumen = resumenesPorDecada[decadaSeleccionada];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#081C3A] to-[#15317E] p-8 text-white">
      <h1 className="text-4xl font-bold text-center text-yellow-300 mb-10">
        Palmarés del FC Barcelona
      </h1>

      {/* Títulos totales */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
        {titulosTotales.map((titulo, idx) => (
          <div
            key={idx}
            className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-5 flex flex-col items-center hover:scale-105 transition-all"
          >
            <img src={titulo.imagen} alt={titulo.nombre} className="w-12 h-12 object-contain mb-2" />
            <h3 className="font-bold text-yellow-300 text-center">{titulo.nombre}</h3>
            <p className="text-2xl font-bold text-white mt-1">{titulo.cantidad}</p>
          </div>
        ))}
      </div>

      {/* Sección informativa y gráfica */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Resumen histórico */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-yellow-300 mb-3">Historia por Década</h2>
          <select
            value={decadaSeleccionada}
            onChange={(e) => setDecadaSeleccionada(e.target.value)}
            className="mb-4 bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg text-sm"
          >
            {Object.keys(resumenesPorDecada).map((decada, idx) => (
              <option key={idx} value={decada}>{decada}</option>
            ))}
          </select>

          <div className="flex flex-col lg:flex-row gap-4 items-start">
            <div className="flex-1">
              <p className="text-sm mb-2"><strong className="text-yellow-300">Presidente:</strong> {resumen.presidente}</p>
              <p className="text-sm mb-2"><strong className="text-yellow-300">Entrenadores:</strong> {resumen.entrenadores.join(', ')}</p>
              <p className="text-sm text-gray-200 whitespace-pre-line">{resumen.resumen}</p>
            </div>
            <img
              src={resumen.imagen}
              alt={`Década ${decadaSeleccionada}`}
              className="w-full lg:w-[300px] rounded-lg shadow-md object-cover"
            />
          </div>
        </div>

        {/* Derecha: gráfica */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-md p-6">
          <div className="flex justify-center mb-4 gap-3">
            <button
              onClick={() => setModoGrafica('decada')}
              className={`px-4 py-2 rounded-full font-semibold text-sm shadow ${
                modoGrafica === 'decada' ? 'bg-[#15317E] text-white' : 'bg-white text-[#15317E] border border-[#15317E]'
              }`}
            >
              Títulos por década
            </button>
            <button
              onClick={() => setModoGrafica('tipo')}
              className={`px-4 py-2 rounded-full font-semibold text-sm shadow ${
                modoGrafica === 'tipo' ? 'bg-[#15317E] text-white' : 'bg-white text-[#15317E] border border-[#15317E]'
              }`}
            >
              Títulos por tipo
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={modoGrafica === 'decada' ? dataPorDecada : dataPorTipo}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={modoGrafica === 'decada' ? 'decada' : 'titulo'} stroke="#FFFFFF" />
              <YAxis stroke="#FFFFFF" />
              <Tooltip />
              <Bar
                dataKey={modoGrafica === 'decada' ? 'titulos' : 'cantidad'}
                fill="#A50044"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Palmares;