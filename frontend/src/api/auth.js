async function enviar(ruta, datos = null, metodo = "POST") {
  const opciones = {
    method: metodo,
    credentials: "include",
  };

  if (datos !== null) {
    opciones.headers = {
      "Content-Type": "application/json",
    };
    opciones.body = JSON.stringify(datos);
  }

  const res = await fetch(`/api/auth/${ruta}`, opciones);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.mensaje || json.error || "Error");
  }

  return json;
}

export const registro = (datos) =>
  enviar("register", {
    nombreUsuario: datos.nombreUsuario,
    contrasena: datos.password,
    alineamiento: datos.alineamiento,
  });

export const login = (datos) =>
  enviar("login", {
    nombreUsuario: datos.nombreUsuario,
    contrasena: datos.password,
  });

export const obtenerSesion = () =>
  enviar("me", null, "GET");

export const cerrarSesionAPI = () =>
  enviar("logout");