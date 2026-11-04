import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="app-nav">
      <NavLink to="/">Principal</NavLink>
      <NavLink to="/reclutar">Reclutar</NavLink>
      <NavLink to="/reclutas">Reclutas</NavLink>
      <NavLink to="/equipos">Equipos</NavLink>
      <NavLink to="/misiones">Misiones</NavLink>
      <NavLink to="/historial">Historial</NavLink>
      
    </nav>
  )
}