import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Players() {
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jugadores")
      .then((res) => res.json())
      .then((data) => setJugadores(data))
      .catch((err) => console.error("Error al obtener jugadores:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#081C3A] to-[#15317E] p-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-yellow-300 drop-shadow-md">
        Plantilla del FC Barcelona
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {jugadores.map((jugador, index) => (
          <Link
            key={index}
            to="/informacion-jugador"
            state={{ jugador }}
            className="relative rounded-2xl p-[2px] hover:scale-105 transition-transform"
          >
            <div className="group bg-[#081C3A] hover:bg-gradient-to-tr hover:from-[#A50044] hover:to-[#15317E] backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-5 flex flex-col items-center hover:scale-105 transition-all duration-300">
              <img
                src={jugador.photo}
                alt={jugador.player_name}
                className="w-24 h-24 object-cover rounded-full mb-4 border-2 border-white shadow-md"
              />
              <h2 className="text-lg font-semibold text-center mb-1 text-white">
                {jugador.player_name}
              </h2>
            </div>


          
            <div className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-transparent bg-gradient-to-br from-yellow-300 to-yellow-500 blur-[2px] z-[-1]"></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
