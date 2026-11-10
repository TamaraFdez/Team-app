import { NavLink } from 'react-router-dom';
import recruitCardImg from '../../assets/recruit_card.svg';
export default function RecruitLink() {
  return (
    <NavLink to="/reclutar" className="recruit-link">
        <div className="recruit-container">
          <h2 className="recruit-title section-title">Reclutar</h2>
          <h3 className="recruit-subtitle">Recluta nuevos miembros para tus equipos</h3>
          <div className="recruit-img-container">
            <img src={recruitCardImg} alt="" className="recruit-image" />
          </div>
        </div>
      </NavLink>
  )
}
