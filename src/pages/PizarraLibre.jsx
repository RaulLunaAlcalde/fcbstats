import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { db, auth } from '../firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';

const ItemTypes = { JUGADOR: 'jugador' };

const JugadorDraggable = ({ jugador }) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.JUGADOR,
    item: jugador,
  }));

  return (
    <div
      ref={drag}
      className="w-24 flex flex-col items-center cursor-pointer relative hover:scale-105 transition-transform duration-200"
    >
      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
        <img
          src={jugador.imagen}
          alt={jugador.nombre}
          className="w-full h-full object-cover scale-105"
        />
      </div>
      <p className="text-xs text-center mt-2 text-white font-semibold drop-shadow-sm leading-tight">
        {jugador.nombre}
      </p>
    </div>
  );
};

const JugadorEnCampo = ({ jugador, left, top, onClick }) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.JUGADOR,
    item: { ...jugador, left, top },
  }));

  return (
    <div
      ref={drag}
      className="absolute"
      style={{ left, top, cursor: 'pointer' }}
      onClick={() => onClick(jugador)}
    >
      <JugadorDraggable jugador={jugador} />
    </div>
  );
};

const Campo = ({ alineacion, onDrop, onRemove }) => {
  const [dimensiones, setDimensiones] = useState({ width: 1280, height: 800 });

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setDimensiones({ width: img.width, height: img.height });
    };
    img.src = "/pizarra.png";
  }, []);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.JUGADOR,
    drop(item, monitor) {
      const delta = monitor.getClientOffset();
      const field = document.getElementById('campo');
      const fieldRect = field.getBoundingClientRect();

      const x = delta.x - fieldRect.left - 40;
      const y = delta.y - fieldRect.top - 40;

      onDrop(item, x, y);
    },
  }));

  return (
    <div
      id="campo"
      ref={drop}
      className="relative bg-no-repeat bg-center bg-contain rounded-xl shadow-lg border-4 border-[#15317E] mx-auto"
      style={{
        backgroundImage: "url('/pizarra.png')",
        aspectRatio: `${dimensiones.width} / ${dimensiones.height}`,
        width: '100%',
        maxWidth: '900px',
        height: 'auto',
      }}
    >
      {alineacion.map((jugador) => (
        <JugadorEnCampo
          key={jugador.id}
          jugador={jugador}
          left={jugador.left}
          top={jugador.top}
          onClick={onRemove}
        />
      ))}
    </div>
  );
};

const PizarraLibre = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [alineacion, setAlineacion] = useState([]);
  const [jugadoresDisponibles, setJugadoresDisponibles] = useState([]);
  const [usuarioValido, setUsuarioValido] = useState(false);

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        alert("Debes iniciar sesión para acceder a esta sección.");
        navigate("/");
      } else {
        setUsuarioValido(true);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  
  useEffect(() => {
    if (location.state?.alineacion && location.state.alineacion.length > 0) {
      setAlineacion(location.state.alineacion);
    }
  }, [location.state]);

  
  useEffect(() => {
    fetch('http://localhost:5000/api/jugadores')
      .then(res => res.json())
      .then(data => {
        const transformados = data.map(j => ({
          id: j.id,
          nombre: j.player_name,
          dorsal: j.number,
          imagen: j.photo
        }));

        const disponiblesFiltrados = transformados.filter(j =>
          !alineacion.find(a => a.id === j.id)
        );

        setJugadoresDisponibles(disponiblesFiltrados);
      });
  }, [alineacion]);

  const handleDrop = (jugador, x, y) => {
    setJugadoresDisponibles(prev => prev.filter(j => j.id !== jugador.id));
    setAlineacion(prev => [...prev, { ...jugador, left: x, top: y }]);
  };

  const handleRemoveFromCampo = (jugador) => {
    setAlineacion(prev => prev.filter(j => j.id !== jugador.id));
    setJugadoresDisponibles(prev => [...prev, { ...jugador }]);
  };

  const guardarAlineacion = async () => {
    if (!alineacion || alineacion.length === 0) {
      alert("No has colocado ningún jugador en el campo.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("Debes estar logueado para guardar tu alineación.");
      return;
    }

    const nombre = prompt("¿Cómo quieres llamar a esta alineación?");
    if (!nombre) return;

    const docRef = doc(db, "alineaciones", user.email, "misAlineaciones", nombre);

    const datos = {
      nombre,
      email: user.email,
      jugadores: alineacion,
      fechaCreacion: serverTimestamp()
    };

    try {
      await setDoc(docRef, datos);
      alert("✅ Alineación guardada correctamente en Firebase");
    } catch (err) {
      console.error("❌ Error al guardar en Firebase:", err);
      alert("Hubo un error al guardar la alineación.");
    }
  };

  if (!usuarioValido) return null;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-[#081C3A] to-[#15317E] p-8">
        <h1 className="text-3xl font-bold text-yellow-300 text-center mb-8 drop-shadow-lg">
          Tu Alineación Ideal - FC Barcelona
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
          {/* Jugadores disponibles */}
          <div className="w-full lg:w-[400px] bg-gradient-to-t from-[#9B0041] to-[#15317E] p-5 rounded-2xl shadow-lg border border-yellow-400">
            <h2 className="text-white text-lg font-bold mb-4 text-center">Jugadores disponibles</h2>
            <div className="grid grid-cols-4 gap-4 justify-items-center">
              {jugadoresDisponibles.map((jugador) => (
                <JugadorDraggable key={jugador.id} jugador={jugador} />
              ))}
            </div>
          </div>

          {/* Campo */}
          <div className="flex-1">
            <Campo
              alineacion={alineacion}
              onDrop={handleDrop}
              onRemove={handleRemoveFromCampo}
            />

            <div className="flex justify-center mt-6">
              <button
                onClick={guardarAlineacion}
                className="bg-yellow-400 hover:bg-yellow-500 text-[#15317E] font-semibold px-6 py-2 rounded-lg shadow-md transition"
              >
                Guardar alineación
              </button>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default PizarraLibre;
