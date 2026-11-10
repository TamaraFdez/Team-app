export default function DevAuth() {
  function activarToken() {
    localStorage.setItem('token', 'token-falso-desarrollo')
    window.location.href = '/'
  }

  function quitarToken() {
    localStorage.removeItem('token')
    window.location.href = '/sesion'
  }

  return (
    <div style={{ position: 'fixed', bottom: 15, right: 15, zIndex: 9999, color: "black" }}>
      <button onClick={activarToken}>Activar sesión falsa</button>
      <button onClick={quitarToken}>Cerrar sesión falsa</button>
    </div>
  )
}