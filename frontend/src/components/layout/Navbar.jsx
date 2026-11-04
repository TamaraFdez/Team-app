import { NavLink } from 'react-router-dom'

const enlaces = [
  { to: '/',          texto: 'Panel de Mando',     icono: 'fa-house', end: true },
  { to: '/reclutar',  texto: 'Reclutar',  icono: 'fa-user-plus' },
  { to: '/reclutas',  texto: 'Reclutas',  icono: 'fa-users' },
  { to: '/equipos',   texto: 'Equipos',   icono: 'fa-shield-halved' },
  { to: '/misiones',  texto: 'Misiones',  icono: 'fa-bolt' },
  { to: '/historial', texto: 'Historial', icono: 'fa-clock-rotate-left' },
]


 export default function Navbar() {
  return (
    <nav className="app-nav">
      {enlaces.map(({ to, texto, icono, end }) => (
        <NavLink key={to} to={to} end={end}>
          <i className={`fa-solid ${icono} fa-fw`}></i>
          <span> {texto}</span>
        </NavLink>
      ))}
    </nav>
  )
}
