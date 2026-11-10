
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

const paginas = {
  '/': {
    titulo: 'Bienvenid@',
    sub: 'El mundo necesita héroes. Y tú decides quiénes se salvan.',
  },
  '/reclutar': {
    titulo: 'Reclutar',
    sub: 'Acepta o rechaza reclutas deslizando la tarjeta hacia los lados.'
  },
  '/reclutas': {
    titulo: 'Reclutas',
    sub: 'Tu plantilla de héroes y villanos.'
  },
  '/equipos': {
    titulo: 'Equipos',
    sub: 'Organiza a tus reclutas en equipos.'
  },
  '/misiones': {
    titulo: 'Misiones',
    sub: 'Envía a un equipo y cruza los dedos.'
  },
  '/historial': {
    titulo: 'Historial',
    sub: 'Todo lo que han hecho tus equipos.'
  }
}

export default function Topbar() {
  const { pathname } = useLocation()
  const { usuario, cerrarSesion } = useAuth()

  const [tema, setTema] = useState(
    document.documentElement.dataset.tema ?? 'comic'
  )
  const [menuAbierto, setMenuAbierto] = useState(false)

  const base = '/' + pathname.split('/')[1]
  const pagina = paginas[base] ?? { titulo: '', sub: '' }

  function alternarTema() {
    const nuevo = tema === 'ciber' ? 'comic' : 'ciber'
    document.documentElement.dataset.tema = nuevo
    setTema(nuevo)
  }

  async function handleCerrarSesion() {
    setMenuAbierto(false)

    try {
      await cerrarSesion()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <header className="app-topbar">
      <div className="app-topbar-texto">
        <h1 className="app-topbar-titulo">
          {pagina.titulo}
          {usuario?.nombreUsuario ? `, ${usuario.nombreUsuario}` : ''}
        </h1>
        <p className="app-topbar-sub">{pagina.sub}</p>
      </div>

      <div className="app-topbar-acciones">
        <button
          className="app-topbar-pildora"
          onClick={alternarTema}
        >
          Estilo: {tema}
        </button>

        <div className="app-topbar-menu">
          <button
            className="app-topbar-pildora app-topbar-usuario"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-expanded={menuAbierto}
            aria-haspopup="true"
          >
            <span className="app-topbar-avatar">
              {usuario?.nombreUsuario?.charAt(0).toUpperCase()}
            </span>

            {usuario?.nombreUsuario ?? 'Usuario'}

            <span className="app-topbar-flecha">
              {menuAbierto ? '▲' : '▼'}
            </span>
          </button>

          {menuAbierto && (
            <div className="app-topbar-desplegable">
              <button
                className="app-topbar-opcion"
                disabled
                title="Disponible próximamente"
              >
                Mi perfil
              </button>

              <div className="app-topbar-separador" />

              <button
                className="app-topbar-opcion app-topbar-cerrar"
                onClick={handleCerrarSesion}
              >
                <span>↪</span>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
