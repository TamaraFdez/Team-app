import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Cargando from "../components/ui/Cargando";

export default function ProtectedRoute() {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return <Cargando texto="Comprobando sesión..." />;
  }

  return usuario
    ? <Outlet />
    : <Navigate to="/sesion" replace />;
}