// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Players from "./pages/Players";
import InformacionJugador from "./pages/InformacionJugador";
import Calendario from "./pages/Calendario";
import Palmares from "./pages/Palmares";
import PizarraLibre from "./pages/PizarraLibre";
import Cuenta from "./pages/Cuenta";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/jugadores" element={<Players />} />
        <Route path="/informacion-jugador" element={<InformacionJugador />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/inicio" element={<Palmares />} />
        <Route path="/pizarra" element={<PizarraLibre />} />
        <Route path="/cuenta" element={<Cuenta />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
