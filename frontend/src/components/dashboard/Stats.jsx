import StatBox from "./StatBox";

export default function Stats() {
  return (
    <div className="stats-container">
      <StatBox number="12" text="Reclutas totales" link="reclutas"/>
      <StatBox number="3" text="Equipos activos" link="equipos"/>
      <StatBox number="8" text="Misiones en curso" link="misiones"/>
      <StatBox number="30" text="Misiones completadas" link="historial"/>
    </div>
  )
}