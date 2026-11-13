// Sacado de Codepen https://codepen.io/sergiopedercini/pen/jmKdbj
export default function MissionClock() {
  return (
    <div className="flex-wrapper mission-time-left">
      <div className="single-chart">
        <svg viewBox="0 0 36 36" className="circular-chart danger">
          <path className="circle-bg"
            d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path className="circle"
            strokeDasharray="30, 100"
            d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" className="percentage">30m</text>
        </svg>
      </div>
    </div>
  )
}
