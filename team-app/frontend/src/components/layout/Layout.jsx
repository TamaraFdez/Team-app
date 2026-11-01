//el outlet es la pagina que pinta, mantiene el navbar para todas las paginas
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="app">
      <aside>
        <Navbar />
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  )
}