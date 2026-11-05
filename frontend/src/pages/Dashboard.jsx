import '../styles/dashboard.css'
import recruitCardImg from '../assets/recruit_card.svg';
import { NavLink } from 'react-router-dom';
export default function Dashboard() {
  return <div>
    <div className="dashboard-grid">
      <div className="stats-container">
        <NavLink to="reclutas" className="stat">
          <p className="stat-number">12</p>
          <p className="stat-text">Reclutas totales</p>
        </NavLink>
        <NavLink to="equipos" className="stat">
          <p className="stat-number">3</p>
          <p className="stat-text">Equipos activos</p>
        </NavLink>
        <NavLink to="misiones" className="stat">
          <p className="stat-number">8</p>
          <p className="stat-text">Misiones en curso</p>
        </NavLink>
        <NavLink to="historial" className="stat">
          <p className="stat-number">30</p>
          <p className="stat-text">Misiones completadas</p>
        </NavLink>
      </div>
      <NavLink to="/reclutar" className="recruit-link">
        <div className="recruit-container">
          <h2 className="recruit-title section-title">Reclutar</h2>
          <h3 className="recruit-subtitle">Recluta nuevos miembros para tus equipos</h3>
          <div className="recruit-img-container">
            <img src={recruitCardImg} alt="" className="recruit-image" />
          </div>
        </div>
      </NavLink>
      <div className="teams-container">
        <header className="teams-header section-header">
          <h2 className="teams-title section-title">Equipos</h2>
          <NavLink to="/equipos" className="teams-link link-button">Ver más</NavLink>
        </header>
        <ul className="teams-list">
          <li className="teams-list-item team-color-1">
            <svg className="team-logo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M93 16.207V60.4873L50.5 97L8 60.4873V16.207L50.5 3L93 16.207ZM41.5615 21.4453L35 48.4287L52.332 43.6992L42.6875 86C42.6875 86 67.5515 31.9173 67.6162 31.7754L69 28.6914C63.6416 30.2349 51.6737 33.1725 51.6191 33.2959C52.8718 29.7821 58.2604 14.0106 58.4961 14H43.1211L41.5615 21.4453Z" fill-rule="evenodd" clip-rule="evenodd" fill="#D9D9D9" />
            </svg>
            <div className="team-info">
              <p className="team-name">Avengers</p>
              <p className="team-members">Ironman, Capitán america, spider-man, Lobezno</p>
            </div>
            <p className="team-capacity">4/6</p>
          </li>
          <li className="teams-list-item team-color-2">
            <svg className="team-logo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M93 16.207V60.4873L50.5 97L8 60.4873V16.207L50.5 3L93 16.207ZM41.5615 21.4453L35 48.4287L52.332 43.6992L42.6875 86C42.6875 86 67.5515 31.9173 67.6162 31.7754L69 28.6914C63.6416 30.2349 51.6737 33.1725 51.6191 33.2959C52.8718 29.7821 58.2604 14.0106 58.4961 14H43.1211L41.5615 21.4453Z" fill-rule="evenodd" clip-rule="evenodd" fill="#D9D9D9" />
            </svg>
            <div className="team-info">
              <p className="team-name">Justice League</p>
              <p className="team-members">Batman, Superman, Wonder Woman, Flash, Martian Man-hunter</p>
            </div>
            <p className="team-capacity">5/6</p>
          </li>
          <li className="teams-list-item team-color-3">
            <svg className="team-logo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M93 16.207V60.4873L50.5 97L8 60.4873V16.207L50.5 3L93 16.207ZM41.5615 21.4453L35 48.4287L52.332 43.6992L42.6875 86C42.6875 86 67.5515 31.9173 67.6162 31.7754L69 28.6914C63.6416 30.2349 51.6737 33.1725 51.6191 33.2959C52.8718 29.7821 58.2604 14.0106 58.4961 14H43.1211L41.5615 21.4453Z" fill-rule="evenodd" clip-rule="evenodd" fill="#D9D9D9" />
            </svg>
            <div className="team-info">
              <p className="team-name">X-Men</p>
              <p className="team-members">Cyclops, Wondergirl, Iceman, Angel, Beast, Rogue, Nightcrawler, Gambit Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, qui repudiandae quod voluptatibus officiis pariatur est nisi dicta cumque sequi vero incidunt modi quo! Consequuntur autem sit necessitatibus porro deserunt!</p>
            </div>
            <p className="team-capacity">8/10</p>
          </li>
        </ul>
      </div>
      <div className="missions-container">
        <header className="missions-header section-header">
          <h2 className="missions-title section-title">Misiones disponibles</h2>
          <NavLink to="/misiones" className="missions-link link-button">Ver más</NavLink>
        </header>
        <ul className="missions-list">
          <li className="mission-list-item">
            {/* Sacado de Codepen https://codepen.io/sergiopedercini/pen/jmKdbj */}
            <div class="flex-wrapper mission-time-left">
              <div class="single-chart">
                <svg viewBox="0 0 36 36" class="circular-chart danger">
                  <path class="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path class="circle"
                    stroke-dasharray="30, 100"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" class="percentage">30m</text>
                </svg>
              </div>
            </div>
            <div className="mission-info">
              <p className="mission-title">Bajar a un gato de un árbol</p>
              <p className="mission-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat iusto, praesentium nesciunt harum, voluptas rerum non commodi porro voluptatem quisquam reiciendis modi amet eius. Maxime sapiente quaerat laudantium officia ut.</p>
            </div>
            <NavLink to="" className="mission-link link-button">Enviar</NavLink>
          </li>
          <li className="mission-list-item">
            {/* Sacado de Codepen https://codepen.io/sergiopedercini/pen/jmKdbj */}
            <div class="flex-wrapper mission-time-left">
              <div class="single-chart">
                <svg viewBox="0 0 36 36" class="circular-chart good">
                  <path class="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path class="circle"
                    stroke-dasharray="67, 100"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" class="percentage">4h</text>
                </svg>
              </div>
            </div>
            <div className="mission-info">
              <p className="mission-title">Salvar al presidente</p>
              <p className="mission-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat iusto, praesentium nesciunt harum, voluptas rerum non commodi porro voluptatem quisquam reiciendis modi amet eius. Maxime sapiente quaerat laudantium officia ut.</p>
            </div>
            <NavLink to="" className="mission-link link-button">Enviar</NavLink>
          </li>
          <li className="mission-list-item">
            {/* Sacado de Codepen https://codepen.io/sergiopedercini/pen/jmKdbj */}
            <div class="flex-wrapper mission-time-left">
              <div class="single-chart">
                <svg viewBox="0 0 36 36" class="circular-chart warning">
                  <path class="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path class="circle"
                    stroke-dasharray="42, 100"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" class="percentage">2h</text>
                </svg>
              </div>
            </div>
            <div className="mission-info">
              <p className="mission-title">Robar un banco</p>
              <p className="mission-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat iusto, praesentium nesciunt harum, voluptas rerum non commodi porro voluptatem quisquam reiciendis modi amet eius. Maxime sapiente quaerat laudantium officia ut.</p>
            </div>
            <NavLink to="" className="mission-link link-button">Enviar</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </div>;
}
