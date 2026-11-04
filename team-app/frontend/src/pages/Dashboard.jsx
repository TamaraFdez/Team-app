import '../styles/dashboard.css'
export default function Dashboard() {
    return <div>
        <h1>Dashboard</h1>
        <h2>test</h2>
        <div className="stats-container">
            <div className="stat">
                <p className="stat-number">12</p>
                <p className="stat-text">Reclutas totales</p>
            </div>
            <div className="stat">
                <p className="stat-number">3</p>
                <p className="stat-text">Equipos activos</p>
            </div>
            <div className="stat">
                <p className="stat-number">8</p>
                <p className="stat-text">Misiones en curso</p>
            </div>
            <div className="stat">
                <p className="stat-number">30</p>
                <p className="stat-text">Misiones completadas</p>
            </div>
        </div>
        <a href="#" className="recruit-link">
            <div className="recruit-container">
                <h2 className="recruit-title">Reclutar</h2>
                <h3 className="recruit-subtitle">Recluta nuevos miembros para tus equipos</h3>
                <img src="" alt="" className="recruit-image" />
            </div>
        </a>
        <div className="teams-container">
            <header className="teams-header">
                <h2 className="teams-title">Equipos</h2>
                <a href="" className="teams-link">Ver más</a>
            </header>
            <ul className="teams-list">
                <li className="teams-list-item">
                    <img src="" alt="" className="team-logo" />
                    <div className="team-info">
                        <p className="team-name">Avengers</p>
                        <p className="team-members">Ironman, Capitán america, spider-man, Lobezno</p>
                    </div>
                    <p className="team-capacity">3/6</p>
                </li>
                <li className="teams-list-item">
                    <img src="" alt="" className="team-logo" />
                    <div className="team-info">
                        <p className="team-name">Avengers</p>
                        <p className="team-members">Ironman, Capitán america, spider-man, Lobezno</p>
                    </div>
                    <p className="team-capacity">3/6</p>
                </li>
                <li className="teams-list-item">
                    <img src="" alt="" className="team-logo" />
                    <div className="team-info">
                        <p className="team-name">Avengers</p>
                        <p className="team-members">Ironman, Capitán america, spider-man, Lobezno</p>
                    </div>
                    <p className="team-capacity">3/6</p>
                </li>
            </ul>
        </div>
        <div className="missions-container">
            <header className="missions-header">
                <h2 className="missions-title">Misiones disponibles</h2>
                <a href="" className="mission-link">Ver más</a>
            </header>
            <ul className="missions-list">
                <li className="mission-list-item">
                    //Sacado de Codepen https://codepen.io/sergiopedercini/pen/jmKdbj
                    <div class="flex-wrapper">
                        <div class="single-chart">
                            <svg viewBox="0 0 36 36" class="circular-chart orange">
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
                                <text x="18" y="20.35" class="percentage">80%</text>
                            </svg>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>;
}
