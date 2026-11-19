const TIEMPO_MAXIMO = 8000;
const RUTAS_SIN_SESION = ["auth/login", "auth/register"];

export async function enviar(ruta, datos = null, metodo = "POST") {
  const opciones = {
    method: metodo,
    credentials: "include",
    signal: AbortSignal.timeout(TIEMPO_MAXIMO),
  };

  if (datos !== null) {
    opciones.headers = {
      "Content-Type": "application/json",
    };
    opciones.body = JSON.stringify(datos);
  }

  let res;
  try {
    res = await fetch(`/api/${ruta}`, opciones);
  } catch (error) {
    if (error.name === "TimeoutError") {
      throw new Error("El servidor tarda demasiado en responder. Inténtalo más tarde.", { cause: error });
    }
    throw new Error("No se ha podido conectar con el servidor.", { cause: error });
  }

  const json = await res.json().catch(() => ({}));

  if (res.status === 401 && !RUTAS_SIN_SESION.includes(ruta)) {
    window.dispatchEvent(new Event("sesion-caducada"));
  }

  if (!res.ok) {
    throw new Error(json.mensaje || `Error ${res.status}: el servidor no responde`);
  }

  return json;
}
