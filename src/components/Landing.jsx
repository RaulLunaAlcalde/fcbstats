// src/components/Landing.jsx
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
            navigate("/home");
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate("/home");
        } catch (error) {
            alert("Error con Google: " + error.message);
        }
    };

    return (
        <div className="h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-900 to-purple-800 text-white p-6">
            {/* Izquierda - Descripción */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Stats Barça</h1>
                <p className="text-lg">
                    Explora estadísticas en tiempo real de los jugadores del FC Barcelona.
                    Visualiza rendimiento, goles, asistencias, minutos jugados y mucho más.
                </p>
            </div>

            {/* Derecha - Login/Register */}
            <div className="w-full md:w-1/2 bg-white text-black p-6 rounded-2xl shadow-xl max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">{isLogin ? "Iniciar Sesión" : "Registrarse"}</h2>
                <form onSubmit={handleAuth} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded-xl focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded-xl focus:outline-none"
                    />
                    <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded-xl hover:bg-blue-800">
                        {isLogin ? "Iniciar Sesión" : "Registrarse"}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p>
                        {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
                        <button className="text-blue-800 underline" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? "Regístrate" : "Inicia Sesión"}
                        </button>
                    </p>
                </div>

                <div className="text-center mt-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full bg-red-600 text-white py-2 rounded-xl hover:bg-red-700"
                    >
                        Iniciar sesión con Google
                    </button>
                </div>
            </div>
        </div>
    );
}
