import { NavLink } from "react-router-dom"

export default function StatBox(statInfo) {
  return (
    <NavLink to={`${statInfo.link}`} className="stat">
      <p className="stat-number">{statInfo.number}</p>
      <p className="stat-text">{statInfo.text}</p>
    </NavLink>
  )
}