// App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
// import Misiones from "./pages/Misiones";
// import Equipos from "./pages/Equipos";
// import EquipoDetalle from "./pages/EquipoDetalle";
// import Reclutas from "./pages/Reclutas";
// import Reclutar from "./pages/Reclutar";
// import Historial from "./pages/Historial";
// import NoEncontrado from "./pages/NoEncontrado";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
       <Route index element={<Dashboard />} />
        {/* <Route path="misiones" element={<Misiones />} /> 
        <Route path="equipos" element={<Equipos />} />
        <Route path="equipos/:id" element={<EquipoDetalle />} />
        <Route path="reclutas" element={<Reclutas />} />
        <Route path="reclutar" element={<Reclutar />} />
        <Route path="historial" element={<Historial />} />
        <Route path="*" element={<NoEncontrado />} /> */}
      </Route>
    </Routes>
  );
}
