import { NavLink } from "react-router-dom";
import TeamItem from "./TeamItem";
export default function TeamsList() {
  return (
    <div className="teams-container">
      <header className="teams-header section-header">
        <h2 className="teams-title section-title">Equipos</h2>
        <NavLink to="/equipos" className="teams-link link-button">Ver más</NavLink>
      </header>
      <ul className="teams-list">
        <TeamItem name="Avengers" members="Ironman, Capitán america, spider-man, Lobezno" color="team-color-1" membersNumber="4" maxMembers="6"/>
        <TeamItem name="Justice League" members="Batman, Superman, Wonder Woman, Flash, Martian Man-hunter" color="team-color-2" membersNumber="6" maxMembers="6"/>
        <TeamItem name="X-Men" members="Cyclops, Wondergirl, Iceman, Angel, Beast, Rogue, Nightcrawler, Gambit" color="team-color-3" membersNumber="8" maxMembers="10"/>
      </ul>
    </div>
  )
}