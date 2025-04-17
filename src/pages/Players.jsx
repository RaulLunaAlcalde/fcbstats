import React from "react";
import { useNavigate } from "react-router-dom";

const players = [
    {
        id: 1,
        name: "Robert Lewandowski",
        position: "Delantero",
        number: 9,
        img: "https://cdn.sofifa.net/players/188/545/24_120.png",

    },
    {
        id: 2,
        name: "Pedri",
        position: "Centrocampista",
        number: 8,
        img: "https://cdn.sofifa.net/players/251/854/25_240.png",
    },
    {
        id: 3,
        name: "Marc-André ter Stegen",
        position: "Portero",
        number: 1,
        img: "https://cdn.sofifa.net/players/192/448/24_120.png",
    },
    {
        id: 4,
        name: "Ronald Araújo",
        position: "Defensa",
        number: 4,
        img: "https://cdn.sofifa.net/players/253/163/25_240.png",
    },
    {
        id: 5,
        name: "Gavi",
        position: "Centrocampista",
        number: 6,
        img: "https://cdn.sofifa.net/players/264/240/25_240.png",
    },
];

export default function Players() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#004D98] to-[#A50044] p-8">
            <h1 className="text-3xl font-bold mb-10 text-center text-[#FDB913] drop-shadow-lg">
                Jugadores del FC Barcelona
            </h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {players.map((player) => (
                    <div
                        key={player.id}
                        className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform"
                        onClick={() => navigate("/jugador", { state: player })}
                    >
                        <img
                            src={player.img}
                            alt={player.name}
                            className="w-28 h-28 object-contain mb-4 rounded-full border-4 border-[#004D98]"
                        />
                        <h2 className="text-xl font-bold text-[#004D98]">{player.name}</h2>
                        <p className="text-gray-700">{player.position}</p>
                        <span className="mt-3 px-4 py-1 bg-[#FDB913] text-[#004D98] rounded-full text-sm font-semibold">
              #{player.number}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
