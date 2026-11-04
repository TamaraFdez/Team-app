//el outlet es la pagina que pinta, mantiene el navbar para todas las paginas
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import logo from "../../assets/LogoTexto.svg"
import "../../styles/layout.css"
import Topbar from './Topbar'

export default function Layout() {
  return (
    <div className="app">
      <aside className="app-aside">
        <img className="app-logo" src={logo} alt="Team App" />
        <Navbar />
      </aside>

      <div className="app-contenido">
        <Topbar />
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}