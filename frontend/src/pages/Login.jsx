
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/auth'
import '../styles/auth.css'
import logo from "../../public/Logo/Logo.svg"

export default function Login() {
  const [nombreUsuario, setNombreUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const navigate = useNavigate()

  async function enviar(e) {
    e.preventDefault()
    setError('')
    setCargando(true)

    try {
      const { token } = await login({ nombreUsuario, password })

      localStorage.setItem('token', token)
      navigate('/')
    } catch (err) {
      setError(err.message || 'No se ha podido iniciar sesión.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <main className="auth-escena">
      <section className="auth-contenedor">
        <header className="auth-marca">
         <img className="auth-logo" src={logo} alt="Team App" />
          <h1>TEAM APP</h1>
          <p>Tu próxima aventura comienza aquí</p>
        </header>

        <div className="auth-tarjeta">
          <span className="auth-etiqueta">ACCESO DE COMANDANTE</span>
          <h2>Bienvenido de nuevo</h2>
          <p className="auth-descripcion">
            Introduce tus credenciales para continuar.
          </p>

          <form className="auth-formulario" onSubmit={enviar}>
            <label htmlFor="login-usuario">Nombre de Comandante</label>
            <input
              id="login-usuario"
              type="text"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              placeholder="Tu nombre de usuario"
              autoComplete="username"
              required
            />

            <label htmlFor="login-password">Contraseña</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
              autoComplete="current-password"
              required
            />

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" disabled={cargando}>
              {cargando ? 'Accediendo...' : 'Iniciar sesión'}
            </button>
          </form>

          <p className="auth-enlace">
            ¿Todavía no tienes cuenta? <Link to="/registro">Regístrate</Link>
          </p>
        </div>
      </section>
    </main>
  )
}
