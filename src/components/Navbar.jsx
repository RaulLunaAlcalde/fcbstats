import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUsuario(user);
    });
    return () => unsubscribe();
  }, []);

  const cerrarSesion = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (err) {
      alert("Error al cerrar sesión");
    }
  };

  return (
    <header className="bg-[#081C3A] text-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-6">
          <img src="https://resources.fcbarcelona.pulselive.com/badges/club/88/BCN@x2.png" alt="Escudo FC Barcelona" className="h-8 w-auto" />

          <nav className="flex gap-6">
            <Link className="hover:text-yellow-400 font-semibold transition" to="/inicio">Inicio</Link>
            <Link className="hover:text-yellow-400 font-semibold transition" to="/jugadores">Jugadores</Link>
            <Link className="hover:text-yellow-400 font-semibold transition" to="/pizarra">Pizarra</Link>
            <Link className="hover:text-yellow-400 font-semibold transition" to="/calendario">Calendario</Link>
            <Link className="hover:text-yellow-400 font-semibold transition" to="/cuenta">Cuenta</Link>
          </nav>
        </div>

        
        {usuario ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-yellow-300">
              {usuario.displayName || usuario.email}
            </span>
            <button
              onClick={cerrarSesion}
              className="border border-white px-3 py-1 rounded-md hover:bg-white/10 transition text-sm"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <Link
            to="/"
            className="flex items-center gap-2 border border-white px-3 py-1 rounded-md hover:bg-white/10 transition"
          >
            <FaUserCircle className="text-xl" />
            <span className="text-sm">Iniciar sesión</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
