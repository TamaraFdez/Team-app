//el outlet es la pagina que pinta, mantiene el navbar para todas las paginas
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import logo from "../../assets/LogoTexto.svg"
import "../../styles/layout.css"

export default function Layout() {
  return (
    <div className="app">
      <aside className="app-aside">
        <img className="app-logo" src={logo} alt="Team App" />
        <Navbar />
      </aside>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}