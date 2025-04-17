/*
// src/api/apiFootball.js
import axios from "axios";

const API_KEY = "8b35511be477e594d55528c0900f3c84"; // 👈 reemplaza con tu key de API-Football
const BASE_URL = "https://api-football-v1.p.rapidapi.com/v3";

const headers = {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
};

export const getPlayersFromBarcelona = async () => {
    try {
        const teamId = 529; // ID del FC Barcelona en la API
        const season = 2024;

        const response = await axios.get(`${BASE_URL}/players`, {
            headers,
            params: {
                team: teamId,
                season,
            },
        });

        return response.data.response;
    } catch (error) {
        console.error("Error al obtener jugadores:", error);
        return [];
    }
};
*/
