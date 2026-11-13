//el outlet es la pagina que pinta, mantiene el navbar para todas las paginas
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import logo from "../../assets/LogoTexto.svg"
import "../../styles/layout.css"
import Topbar from './Topbar'

export default function Layout() {
  const [menuLateralAbierto, setMenuLateralAbierto] = useState(false)

  function cerrarMenuLateral() {
    setMenuLateralAbierto(false)
  }

  useEffect(() => {
    if (!menuLateralAbierto) return

    function alPulsarTecla(e) {
      if (e.key === 'Escape') setMenuLateralAbierto(false)
    }

    window.addEventListener('keydown', alPulsarTecla)
    return () => window.removeEventListener('keydown', alPulsarTecla)
  }, [menuLateralAbierto])

  return (
    <div className="app">
      <aside
        id="menu-lateral"
        className={`app-aside ${menuLateralAbierto ? 'abierto' : ''}`}
      >
        <button
          className="app-aside-cerrar"
          onClick={cerrarMenuLateral}
          aria-label="Cerrar menú"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
        <img className="app-logo" src={logo} alt="Team App" />
        <Navbar onNavegar={cerrarMenuLateral} />
      </aside>

      {menuLateralAbierto && (
        <div
          className="app-fondo-menu"
          onClick={cerrarMenuLateral}
          aria-hidden="true"
        />
      )}

      <div className="app-contenido">
        <Topbar
          menuLateralAbierto={menuLateralAbierto}
          onAlternarMenuLateral={() => setMenuLateralAbierto(!menuLateralAbierto)}
        />
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
