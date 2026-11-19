import alignmentIcon from '../../assets/icons/alignment_icon.svg';
import weightIcon from '../../assets/icons/weight_icon.svg';
import heightIcon from '../../assets/icons/height_icon.svg';
import StatBar from './StatBar';
import DataPill from './DataPill';

export default function RecruitCard(recruitInfo) {
  const intelligence = recruitInfo.stats["intelligence"];
  const strength = recruitInfo.stats["strength"];
  const speed = recruitInfo.stats["speed"];
  const durability = recruitInfo.stats["durability"];
  const power = recruitInfo.stats["power"];
  const combat = recruitInfo.stats["combat"];

  return (
    <div className="recruit-card">
      <img src={recruitInfo.imgSrc} alt={recruitInfo.name} title={recruitInfo.name} className="recruit-image" />
      <p className="new-text">Nuevo</p>
      <div className="recruit-info">
        <h3 className="recruit-name">{recruitInfo.name}</h3>
        <h4 className="recruit-aka">{recruitInfo.aka}</h4>
        <div className="recruit-data-pills">
          <DataPill title="Alineamiento" icon={alignmentIcon} text="Héroe" />
          <DataPill title="Altura" icon={heightIcon} text={recruitInfo.height} />
          <DataPill title="Peso" icon={weightIcon} text={recruitInfo.weight} />
        </div>
        <div className="recruit-stats-container">
          <StatBar name="Inteligencia" value={intelligence} />
          <StatBar name="Fuerza" value={strength} />
          <StatBar name="Velocidad" value={speed} />
          <StatBar name="Durabilidad" value={durability} />
          <StatBar name="Poder" value={power} />
          <StatBar name="Combate" value={combat} />
        </div>
      </div>
    </div>
  )
}