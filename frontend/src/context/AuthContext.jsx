import { useEffect, useState } from "react";
import { AuthContext } from "./authContextValue";
import { obtenerSesion, cerrarSesionAPI } from "../api/auth";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  async function comprobarSesion() {
    setCargando(true);

    try {
      const data = await obtenerSesion();
      setUsuario(data.usuario);
      return data.usuario;
    } catch {
      setUsuario(null);
      return null;
    } finally {
      setCargando(false);
    }
  }

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

  return (
    <AuthContext.Provider
      value={{ usuario, cargando, comprobarSesion, cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
}