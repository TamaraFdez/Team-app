import { Routes, Route} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from './pages/Login'
import Registro from './pages/Registro'
import ProtectedRoute from "./routes/ProtectedRoute";
import Misiones from "./pages/Misiones";
import Equipos from "./pages/Equipos";
import Reclutas from "./pages/Reclutas";
import Reclutar from "./pages/Reclutar";
import Historial from "./pages/Historial";
import NoEncontrado from "./pages/NoEncontrado";
import Dashboard from "./pages/Dashboard";
import DevAuth from './components/devAuth'


export default function App() {
  return (<>
   {/* Token falso solo DEV */}
    {import.meta.env.DEV && <DevAuth />}
 <Routes>
  {/* Páginas públicas */}
  <Route path="/sesion" element={<Login />} />
  <Route path="/registro" element={<Registro />} />

  {/* Páginas privadas */}
  <Route element={<ProtectedRoute />}>
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="misiones" element={<Misiones />} />
      <Route path="equipos" element={<Equipos />} />
      <Route path="reclutas" element={<Reclutas />} />
      <Route path="reclutar" element={<Reclutar />} />
      <Route path="historial" element={<Historial />} />
      <Route path="*" element={<NoEncontrado />} />
    </Route>
  </Route>
</Routes>
</>
  );
}
