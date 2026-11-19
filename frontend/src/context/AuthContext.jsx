import { useEffect, useState } from "react";
import { AuthContext } from "./authContextValue";
import { obtenerSesion, cerrarSesionAPI } from "../api/auth";

// guarda estado, llama a /me al arrancar, crea cerrar sesion 
// y usa provider de react para pasar todo
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  async function cerrarSesion() {
    try {
      await cerrarSesionAPI();
    } finally {
      setUsuario(null);
    }
  }

  useEffect(() => {
    let activo = true;

    async function inicializarSesion() {
      try {
        const data = await obtenerSesion();

        if (activo) setUsuario(data.usuario);
      } catch {
        if (activo) setUsuario(null);
      } finally {
        if (activo) setCargando(false);
      }
    }

    inicializarSesion();

    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    function alCaducar() {
      setUsuario(null);
    }
    window.addEventListener("sesion-caducada", alCaducar);
    return () => window.removeEventListener("sesion-caducada", alCaducar);
  }, []);

  return (
    // solo pasa lo que le pongas en value
    <AuthContext.Provider
      value={{ usuario, cargando, guardarUsuario: setUsuario, cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
}