import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Cuenta() {
  const [alineaciones, setAlineaciones] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = auth.currentUser;
    if (!usuario) {
      alert("Debes iniciar sesión para ver tu cuenta.");
      navigate("/");
      return;
    }

    setUser(usuario);

    const obtenerAlineaciones = async () => {
      const ref = collection(db, "alineaciones", usuario.email, "misAlineaciones");
      const snapshot = await getDocs(ref);
      const datos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAlineaciones(datos);
    };

    obtenerAlineaciones();
  }, [navigate]);

  const cargarEnPizarra = (alineacion) => {
    navigate("/pizarra", { state: { alineacion: alineacion.jugadores } });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#081C3A] to-[#15317E] p-8 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg mb-4">
            <img
              src={user.photoURL || "/default-avatar.png"}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold">{user.displayName || "Usuario sin nombre"}</h1>
          <p className="text-yellow-300">{user.email}</p>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">Alineaciones guardadas</h2>

        {alineaciones.length === 0 ? (
          <p className="text-center text-gray-300">No tienes alineaciones guardadas todavía.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {alineaciones.map((alineacion) => (
              <div key={alineacion.id} className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-yellow-300 mb-2">{alineacion.nombre}</h3>
                  <p className="text-sm text-gray-200 mb-4">
                    {alineacion.fechaCreacion?.toDate().toLocaleString() ?? "Fecha desconocida"}
                  </p>
                </div>
                <button
                  onClick={() => cargarEnPizarra(alineacion)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-[#15317E] font-semibold px-4 py-2 rounded-lg transition mt-auto"
                >
                  Cargar en pizarra
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
