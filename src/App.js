import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Players from "./pages/Players";
import Jugador from "./pages/InformacionJugador";

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/players" element={<Players />} />
          <Route path="/jugador" element={<Jugador />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
