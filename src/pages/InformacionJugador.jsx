import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function InformacionJugador() {
  const location = useLocation();
  const jugador = location.state?.jugador;

  if (!jugador) {
    return (
      <div className="text-white p-8 min-h-screen bg-black">
        No se encontró información del jugador. Por favor, vuelve a la lista de jugadores.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#081C3A] to-[#15317E] text-white py-12 px-4 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-8 text-center">
        {jugador.player_name}
      </h1>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-7xl justify-center items-start">
        
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <iframe
            title="SofaScore Player Widget"
            src={`https://widgets.sofascore.com/en/embed/player/${jugador.id}?widgetTheme=dark`}
            style={{
              height: "830px",
              maxWidth: "100%",
              width: "100%",
              border: "none",
              overflow: "hidden",
              borderRadius: "1rem",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
            }}
            scrolling="no"
            allowtransparency="true"
          ></iframe>
        </motion.div>


        <motion.div
          className="w-full md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Partidos jugados", value: jugador.games_played },
              { label: "Minutos jugados", value: jugador.minutes_played },
              { label: "Goles", value: jugador.goals },
              { label: "Asistencias", value: jugador.assists }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-center shadow-md border border-white/10"
              >
                <h2 className="text-sm font-medium text-yellow-300 mb-1">{stat.label}</h2>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>

          {jugador.heatmap && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-xl font-bold text-yellow-300 text-center mb-4">Mapa de Calor</h2>
              <img
                src={jugador.heatmap}
                alt={`Mapa de calor de ${jugador.player_name}`}
                className="rounded-xl shadow-lg w-full max-w-xl mx-auto border-2 border-white"
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
