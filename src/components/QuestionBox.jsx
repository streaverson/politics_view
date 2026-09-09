import { useEffect, useState } from "react";
import "../QuestionBox.css";
import questions from "../questions";

export default function QuestionBox({ updatePosition, onFinish }) {
  const [answeres, setAnswers] = useState([]);
  const currentQuestionIndex = answeres.length;
  const isFinished = currentQuestionIndex === questions.length;
  // ------------
  useEffect(() => {
    const xQuestions = answeres.slice(0, 7);
    const yQuestions = answeres.slice(7, 14);

    const sumX = xQuestions.reduce((acc, ans) => acc + ans, 0);
    const sumY = yQuestions.reduce((acc, ans) => acc + ans, 0);

    // console.log(sumX, sumY);
    updatePosition({ x: sumX, y: sumY });
  }, [answeres, updatePosition]);
  // ------------

  useEffect(() => {
    if (isFinished) {
      const timer = setTimeout(() => {
        onFinish(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isFinished, onFinish]);

  const handleClick = (score) => {
    if (answeres.length < questions.length) {
      setAnswers((prev) => [...prev, score]);
    }
  };

  const progressPercent = (currentQuestionIndex / questions.length) * 100;

  // console.log(isFinished);

  return (
    <>
      {isFinished ? (
        <div className="finishMessage">درحال آماده‌سازی نتیجه...</div>
      ) : (
        <div id="questionBox">
          <h2 id="title">تست دیدگاه سیاسی</h2>
          <div id="progress">
            <div id="progressBar">
              <div
                style={{
                  width: `${progressPercent}%`,
                  transition: "width 0.3s ease",
                }}
              ></div>
            </div>
            <div id="questionCount">
              {isFinished
                ? "تست تمام شد!"
                : `سوال ${currentQuestionIndex} از ${questions.length} سوال`}
            </div>
          </div>

          <div id="question">{questions[currentQuestionIndex]?.question}</div>
          <div id="optionsSection">
            <div onClick={() => handleClick(1)}>خیلی موافق</div>
            <div onClick={() => handleClick(0.5)}>موافق</div>
            <div onClick={() => handleClick(-0.5)}>مخالف</div>
            <div onClick={() => handleClick(-1)}>خیلی مخالف</div>
          </div>
        </div>
      )}
    </>
  );
}
