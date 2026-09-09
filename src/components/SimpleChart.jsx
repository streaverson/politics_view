import React from "react";

const PoliticalCompass = ({ userPosition = { x: 0, y: 0 } }) => {
  const VIEWBOX_SIZE = 500;
  const center = VIEWBOX_SIZE / 2;
  const scale = VIEWBOX_SIZE / 20;

  const getX = (value) => center + value * scale;
  const getY = (value) => center - value * scale;

  const gridValues = Array.from({ length: 20 }, (_, index) => index - 20);

  return (
    <>
      <div className="political-compass-wrapper">
        <svg
          className="political-compass"
          viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
          role="img"
          aria-label="نمودار سیاسی"
          style={{ overflow: "visible" }}
        >
          {/* خطوط شبکه */}
          {gridValues.map((value) => (
            <React.Fragment key={value}>
              <line
                x1="0"
                y1={getY(value) - 275}
                x2={VIEWBOX_SIZE}
                y2={getY(value) - 275}
                stroke="#ff3232"
                strokeWidth="1"
              />

              <line
                x1={getX(value) + 275}
                y1="0"
                x2={getX(value) + 275}
                y2={VIEWBOX_SIZE}
                stroke="#ff3232"
                strokeWidth="1"
              />
            </React.Fragment>
          ))}

          {/* محور افقی */}
          <line
            x1="0"
            y1={center}
            x2={VIEWBOX_SIZE}
            y2={center}
            stroke="#333"
            strokeWidth="2"
          />

          {/* محور عمودی */}
          <line
            x1={center}
            y1="0"
            x2={center}
            y2={VIEWBOX_SIZE}
            stroke="#333"
            strokeWidth="2"
          />

          {/* برچسب انتهای بالای محور عمودی */}
          <text
            x={center}
            y="-16"
            textAnchor="middle"
            dominantBaseline="middle"
            className="axis-label"
          >
            اقتدارگرا
          </text>

          {/* برچسب انتهای پایین محور عمودی */}
          <text
            x={center}
            y={VIEWBOX_SIZE + 16}
            textAnchor="middle"
            dominantBaseline="middle"
            className="axis-label"
          >
            آزادی‌خواه
          </text>

          {/* برچسب انتهای چپ محور افقی */}
          <text
            x="-25"
            y={center}
            textAnchor="middle"
            dominantBaseline="middle"
            className="axis-label"
          >
            چپ
          </text>

          {/* برچسب انتهای راست محور افقی */}
          <text
            x={VIEWBOX_SIZE + 32}
            y={center}
            textAnchor="middle"
            dominantBaseline="middle"
            className="axis-label"
          >
            راست
          </text>

          {/* نقطه کاربر */}
          <circle
            cx={getX(userPosition.x)}
            cy={getY(userPosition.y)}
            r="7"
            fill="#2e7d32"
            stroke="#1b5e20"
            strokeWidth="2"
          />
        </svg>
      </div>
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          backgroundColor: "#d7d7d7",
          padding: "10px 0",
          color: "#1a1a1a",
          width: "100%",
          textAlign: "center",
        }}
      >
        توسعه و طراحی شده توسط
        <a href="https://github.com/streaverson" style={{ color: "#000" }}>
          streaverson
        </a>
      </footer>
    </>
  );
};

export default PoliticalCompass;
