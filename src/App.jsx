import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Entradas from "./pages/Entradas";
import Saidas from "./pages/Saidas"; // se tiver esse componente

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/entradas" element={<Entradas />} />
      <Route path="/saidas" element={<Saidas />} /> {/* se existir */}
    </Routes>
  );
}

export default App;
