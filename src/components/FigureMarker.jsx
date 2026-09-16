export default function FigureMarker({ cx, cy, label, isUser }) {
  const boxWidth = 76;
  const boxHeight = 26;
  const arrowSpace = 7;

  const boxX = cx - boxWidth / 2;
  const boxY = cy - boxHeight - 14 - arrowSpace;

  return (
    <g className={`figureMarker${isUser ? " figureMarker--user" : ""}`}>
      {isUser && <circle className="userGlow" cx={cx} cy={cy} r="13" />}
      <circle
        className={isUser ? "mainCircle circle" : "circle characters"}
        cx={cx}
        cy={cy}
        r={isUser ? "9" : "7"}
        strokeWidth={isUser ? "3" : "2"}
      />
      <foreignObject
        x={boxX}
        y={boxY}
        width={boxWidth}
        height={boxHeight + arrowSpace}
      >
        <div className="infoBoxWrap">
          <div className="infoBox" dir="rtl">
            {label}
          </div>
        </div>
      </foreignObject>
    </g>
  );
}
