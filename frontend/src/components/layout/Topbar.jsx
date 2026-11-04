import { useState } from 'react'
import { useLocation } from 'react-router-dom'

// Hasta que haya login, el usuario es una variable
const USUARIO = { nombre: 'Patriota', corto: 'John Gillman' }

const paginas = {
  '/': {
    titulo: `Bienvenido, ${USUARIO.nombre}`,
    sub: 'El mundo necesita héroes. Y tú decides quiénes se salvan.',
  },
  '/reclutar':  { titulo: 'Reclutar',  sub: 'Acepta o rechaza reclutas deslizando la tarjeta hacia los lados.' },
  '/reclutas':  { titulo: 'Reclutas',  sub: 'Tu plantilla de héroes y villanos.' },
  '/equipos':   { titulo: 'Equipos',   sub: 'Organiza a tus reclutas en equipos.' },
  '/misiones':  { titulo: 'Misiones',  sub: 'Envía a un equipo y cruza los dedos.' },
  '/historial': { titulo: 'Historial', sub: 'Todo lo que han hecho tus equipos.' },
}

export default function Topbar() {
  const { pathname } = useLocation()
  console.log(pathname)
  const [tema, setTema] = useState(document.documentElement.dataset.tema ?? 'comic')

  // lo corto y me quedo con la palabra que quiero para cuando tegamos direcciones mas largas
  const base = '/' + pathname.split('/')[1]
  const pagina = paginas[base] ?? { titulo: '', sub: '' }

  function alternarTema() {
    const nuevo = tema === 'ciber' ? 'comic' : 'ciber'
    document.documentElement.dataset.tema = nuevo
    setTema(nuevo)
  }

  return (
    <header className="app-topbar">
      <div className="app-topbar-texto">
        <h1 className="app-topbar-titulo">{pagina.titulo}</h1>
        <p className="app-topbar-sub">{pagina.sub}</p>
      </div>

      <div className="app-topbar-acciones">
        <button className="app-topbar-pildora" onClick={alternarTema}>
          Estilo: {tema}
        </button>

        <div className="app-topbar-pildora app-topbar-usuario">
          <span className="app-topbar-avatar"></span>
          {USUARIO.corto}
        </div>
      </div>
    </header>
  )
}