export default function DataPill(data) {
  return (
    <div className="data-pill" title={data.title}>
      <img src={data.icon} alt="" title={data.title} className="pill-icon" />
      <p className="alignment-text">{data.text}</p>
    </div>
  )
}