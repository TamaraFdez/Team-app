import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function ProtectedRoute() {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return <p>Comprobando sesión...</p>;
  }

  return usuario
    ? <Outlet />
    : <Navigate to="/sesion" replace />;
}