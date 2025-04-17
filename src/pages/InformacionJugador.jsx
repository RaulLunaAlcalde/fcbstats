// src/pages/InformacionJugador.jsx
import { useLocation, useNavigate } from "react-router-dom";

export default function InformacionJugador() {
    const { state: player } = useLocation();
    const navigate = useNavigate();

    if (!player) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <p>No se ha seleccionado ningún jugador.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#004D98] to-[#A50044] text-white p-8">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 text-yellow-300 underline hover:text-yellow-200"
            >
                ← Volver
            </button>

            <div className="max-w-4xl mx-auto bg-white text-[#004D98] rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <img
                        src={player.img}
                        alt={player.name}
                        className="w-32 h-32 object-contain rounded-full border-4 border-[#004D98]"
                    />
                    <div>
                        <h2 className="text-3xl font-bold mb-2">{player.name}</h2>
                        <p className="text-lg">Posición: {player.position}</p>
                        <p className="text-lg">Dorsal: #{player.number}</p>
                        {/* Aquí puedes añadir más info manual o de una API */}
                    </div>
                </div>

                <hr className="my-6 border-gray-300" />

                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Mapa de Calor</h3>
                    <img
                        src="https://i.ibb.co/6ZkkDGB/heatmap-example.png"
                        alt="Mapa de calor"
                        className="w-full max-w-md mx-auto rounded-lg"
                    />
                </div>

                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-[#FDB913] text-[#004D98] p-4 rounded-xl font-bold">Goles: 12</div>
                    <div className="bg-[#FDB913] text-[#004D98] p-4 rounded-xl font-bold">Asistencias: 9</div>
                    <div className="bg-[#FDB913] text-[#004D98] p-4 rounded-xl font-bold">Partidos: 28</div>
                    <div className="bg-[#FDB913] text-[#004D98] p-4 rounded-xl font-bold">Minutos: 2310</div>
                </div>
            </div>
        </div>
    );
}
