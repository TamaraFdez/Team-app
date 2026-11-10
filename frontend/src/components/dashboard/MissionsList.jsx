import { NavLink } from "react-router-dom";
import MissionItem from "./MissionItem";

export default function MissionsList() {
  return (
    <div className="missions-container">
      <header className="missions-header section-header">
        <h2 className="missions-title section-title">Misiones disponibles</h2>
        <NavLink to="/misiones" className="missions-link link-button">Ver más</NavLink>
      </header>
      <ul className="missions-list">
        <MissionItem title="Bajar a un gato de un árbol" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat iusto, praesentium nesciunt harum, voluptas rerum non commodi porro voluptatem quisquam reiciendis modi amet eius. Maxime sapiente quaerat laudantium officia ut." id="1"/>
        <MissionItem title="Salvar al presidente" description="O no, Tu eliges ;P" id="2"/>
        <MissionItem title="Robar un banco" description="Organizar y ejecutar el atraco al banco nacional y llevarse muchos millones." id="3"/>
      </ul>
    </div>
  )
}