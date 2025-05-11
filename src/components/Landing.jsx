import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate("/inicio");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/inicio");
    } catch (error) {
      alert("Error con Google: " + error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-[#081C3A] to-[#15317E] text-white p-6">
      {/* Izquierda - Descripción */}
      <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-yellow-300">Stats Barça</h1>
        <p className="text-lg text-white/90">
          Explora estadísticas en tiempo real de los jugadores del FC Barcelona.
          Visualiza rendimiento, goles, asistencias, minutos jugados y mucho más.
        </p>
      </div>

      {/* Derecha - Login/Register */}
      <div className="w-full md:w-1/2 bg-white/10 backdrop-blur-md border border-white/20 text-white p-6 rounded-2xl shadow-xl max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-300 text-center">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-xl focus:outline-none text-black"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-xl focus:outline-none text-black"
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 text-[#15317E] py-2 rounded-xl hover:bg-yellow-500 font-bold transition"
          >
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          <p>
            {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
            <button className="text-yellow-300 underline" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Regístrate" : "Inicia Sesión"}
            </button>
          </p>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition"
          >
            Iniciar sesión con Google
          </button>
        </div>
      </div>
    </div>
  );
}
