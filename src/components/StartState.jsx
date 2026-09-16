// import "index.css";
import questions from "../questions";
import convertToPersianDigits from "../utils/persianHelper";

export default function StartState({ onStart }) {
  return (
    <div className="card">
      <p className="beforeStart">قبل از شروع</p>
      <h1 className="cardTitle">آزمون دیدگاه سیاسی</h1>
      <p id="cardDescription">
        این تست کمکت می‌کنه بفهمی موضع تو نسبت به مسائل اقتصادی و اجتماعی، روی
        طیف سیاسی کجا قرار می‌گیره. برای هر گزاره، میزان موافقت یا مخالفتت رو
        انتخاب کن — پاسخ درست یا غلط وجود نداره، فقط دیدگاه خودت مهمه.
      </p>
      <div id="testInfo">
        <span>{convertToPersianDigits(questions.length)} سوال</span>
        <span className="dot"></span>
        <span>حدود {convertToPersianDigits(8)} دقیقه</span>
      </div>
      <button id="startBtn" onClick={onStart}>
        شروع تست
      </button>
    </div>
  );
}
