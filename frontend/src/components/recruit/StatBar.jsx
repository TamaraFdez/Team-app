export default function StatBar(statInfo) {
  let barSize = {
    "max-width": `${statInfo.value}%`
  };

  let proficiencyClass;

  switch (true) {
    case statInfo.value >= 75:
      proficiencyClass = "good";
      break;
    case statInfo.value >= 50:
      proficiencyClass = "mid";
      break;
    default:
      proficiencyClass = "bad";
      break;
  }

  return (
    <div className="recruit-stat-container">
      <div className="recruit-stat-name">{statInfo.name}</div>
      <div className="stat-bar-container">
        <div className={`stat-bar ${proficiencyClass}`} style={barSize}></div>
      </div>
      <p className="stat-value">{statInfo.value}</p>
    </div>
  )
}