// src/components/Heatmap.jsx
import React, { useEffect, useRef } from "react";

const Heatmap = ({ playerName }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const background = new Image();
    background.src = "/campo.png"; // Ruta dentro de /public

    background.onload = () => {
      fetch(`http://localhost:5000/api/heatmap?player=${encodeURIComponent(playerName)}`)
        .then((res) => res.json())
        .then((data) => {
          // Dibuja la imagen de fondo
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

          // Dibuja las zonas de calor
          data.coordinates.forEach((coord) => {
            const x = (coord.x / 100) * canvas.width;
            const y = (coord.y / 100) * canvas.height;

            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
            gradient.addColorStop(0, "#ffcc00aa");
            gradient.addColorStop(1, "#ffcc0000");

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fill();
          });
        })
        .catch((err) => console.error("Error al cargar heatmap:", err));
    };
  }, [playerName]);

  return (
    <div className="mt-10 flex flex-col items-center">
      <h2 className="text-xl font-bold text-yellow-300 mb-4">Mapa de calor</h2>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="rounded-xl shadow-lg border-2 border-white"
      />
    </div>
  );
};

export default Heatmap;
