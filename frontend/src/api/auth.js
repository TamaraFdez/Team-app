async function enviar(ruta, datos) {
  const res = await fetch(`/api/${ruta}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Error')
  return json
}

export const registro = (datos) => enviar('registro', datos)
export const login = (datos) => enviar('login', datos)