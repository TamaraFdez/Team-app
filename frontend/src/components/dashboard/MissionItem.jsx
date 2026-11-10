import { NavLink } from "react-router-dom";
import MissionClock from "./MissionClock";

export default function MissionItem(missionInfo) {
  return (
    <li className="mission-list-item">
      <MissionClock />
      <div className="mission-info">
        <p className="mission-title">{missionInfo.title}</p>
        <p className="mission-description">{missionInfo.description}</p>
      </div>
      <NavLink to={`misiones/${missionInfo.id}`} className="mission-link link-button">Enviar</NavLink>
    </li>
  )
}