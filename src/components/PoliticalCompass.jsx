import React from "react";

// TEST GIT TEST TEST
const PoliticalCompass = ({ userPosition = { x: 0, y: 0 } }) => {
  const VIEWBOX_SIZE = 500;
  const center = VIEWBOX_SIZE / 2;
  const scale = VIEWBOX_SIZE / 20;

  const getX = (value) => center + value * scale;
  const getY = (value) => center - value * scale;

  const maxGridValue = 10;
  const gridValues = Array.from(
    { length: maxGridValue * 2 + 1 },
    (_, index) => index - maxGridValue,
  );

  const getValidCx = (x) => {
    const calculatedX = getX(x);
    if (calculatedX < 0) return 0;
    if (calculatedX > VIEWBOX_SIZE) return VIEWBOX_SIZE;
    return calculatedX;
  };

  const getValidCy = (y) => {
    const calculatedY = getY(y);
    if (calculatedY < 0) return 0;
    if (calculatedY > VIEWBOX_SIZE) return VIEWBOX_SIZE;
    return calculatedY;
  };

  const safeNumber = (n, fallback = 0) =>
    typeof n === "number" && Number.isFinite(n) ? n : fallback;

  const safeUserPosition = {
    x: safeNumber(userPosition?.x),
    y: safeNumber(userPosition?.y),
  };

  console.log("=== PoliticalCompass ===");
  console.log("userPosition:", JSON.stringify(userPosition));
  console.log("safeUserPosition:", JSON.stringify(safeUserPosition));
  console.log("cx:", getValidCx(safeUserPosition.x));
  console.log("cy:", getValidCy(safeUserPosition.y));
  return (
    <>
      <div className="political-compass-wrapper">
        <svg
          className="political-compass"
          viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
          preserveAspectRatio="xMidYMid meet" // ← اضافه کن
          role="img"
          aria-label="نمودار سیاسی"
          style={{ overflow: "visible" }}
        >
          {/* خطوط شبکه */}
          {gridValues.map((value) => (
            <React.Fragment key={value}>
              <line
                x1="0"
                y1={getY(value)}
                x2={VIEWBOX_SIZE}
                y2={getY(value)}
                stroke="#ff8080"
                strokeWidth="1"
              />
              <line
                x1={getX(value)}
                y1="0"
                x2={getX(value)}
                y2={VIEWBOX_SIZE}
                stroke="#ff8080"
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

          {/* برچسب بالا */}
          <text
            x={center}
            y="-16"
            textAnchor="middle"
            dominantBaseline="middle"
            className="axis-label"
          >
            اقتدارگرا
          </text>

          {/* برچسب پایین */}
          <text
            x={center}
            y={VIEWBOX_SIZE + 16}
            textAnchor="middle"
            dominantBaseline="middle"
            className="axis-label"
          >
            آزادی‌خواه
          </text>

          {/* برچسب چپ */}
          <text
            x="-25"
            y={center}
            textAnchor="middle"
            dominantBaseline="middle"
            className="axis-label"
          >
            چپ
          </text>

          {/* برچسب راست */}
          <text
            x={VIEWBOX_SIZE + 32}
            y={center}
            textAnchor="middle"
            dominantBaseline="middle"
            className="axis-label"
          >
            راست
          </text>

          {/* نقطه کاربر — ✅ بدون + 250 */}
          <circle
            cx={getValidCx(safeUserPosition.x)}
            cy={getValidCy(safeUserPosition.y)}
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
          backgroundColor: "#e8e8e8",
          padding: "10px 0",
          color: "#1a1a1a",
          width: "100%",
          textAlign: "center",
        }}
      >
        توسعه و طراحی شده توسط{" "}
        <a href="https://github.com/streaverson" style={{ color: "#000" }}>
          streaverson
        </a>
      </footer>
    </>
  );
};

export default PoliticalCompass;
