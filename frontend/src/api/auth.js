import { enviar } from "./cliente";

export const registro = (datos) =>
  enviar("auth/register", {
    nombreUsuario: datos.nombreUsuario,
    contrasena: datos.password,
    alineamiento: datos.alineamiento,
    avatar: datos.avatar || null,
  });

export const login = (datos) =>
  enviar("auth/login", {
    nombreUsuario: datos.nombreUsuario,
    contrasena: datos.password,
  });

export const obtenerSesion = () =>
  enviar("auth/me", null, "GET");

export const cerrarSesionAPI = () =>
  enviar("auth/logout");
