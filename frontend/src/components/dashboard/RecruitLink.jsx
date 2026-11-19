import { NavLink } from 'react-router-dom';
import recruitCardImg from '../../assets/recruit_card.svg';
export default function RecruitLink() {
  return (
    <NavLink to="/reclutar" className="recruitment-link">
        <div className="recruitment-container">
          <h2 className="recruitment-title section-title">Reclutar</h2>
          <h3 className="recruitment-subtitle">Recluta nuevos miembros para tus equipos</h3>
          <div className="recruitment-img-container">
            <img src={recruitCardImg} alt="" className="recruitment-image" />
          </div>
        </div>
      </NavLink>
  )
}
