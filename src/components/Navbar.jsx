import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 shadow-md rounded-full px-6 py-2 flex gap-6 z-50">
            <Link className="text-blue-900 font-semibold hover:underline" to="/">
                Inicio
            </Link>
            <Link className="text-blue-900 font-semibold hover:underline" to="/home">
                Estadísticas
            </Link>
            <Link className="text-blue-900 font-semibold hover:underline" to="/players">
                Jugadores
            </Link>

        </nav>
    );
};

export default Navbar;
