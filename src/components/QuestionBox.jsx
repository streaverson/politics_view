import { useEffect, useState } from "react";
import "../QuestionBox.css";
import questions from "../questions";

export default function QuestionBox({ updatePosition, onFinish }) {
  const [answers, setAnswers] = useState([]);
  const currentQuestionIndex = answers.length;
  const isFinished = currentQuestionIndex === questions.length;
  // ------------
  useEffect(() => {
    const econStartIndex = questions.findIndex(
      (question) => question.tag === "econ",
    );
    const socialStartIndex = questions.findIndex(
      (question) => question.tag === "social",
    );
    const xQuestions = answers.slice(econStartIndex, socialStartIndex);
    const yQuestions = answers.slice(socialStartIndex, questions.length - 1);

    const sumX = xQuestions.reduce((acc, ans) => acc + ans, 0);
    const sumY = yQuestions.reduce((acc, ans) => acc + ans, 0);

    console.log(sumX, sumY);
    // console.log(sumX, sumY);
    updatePosition({ x: sumX, y: sumY });
  }, [answers, updatePosition]);

  const handleBack = () => {
    if (answers.length > 0) {
      setAnswers((prev) => prev.slice(0, -1));
    }
  };
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
    if (answers.length < questions.length) {
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
            <button onClick={() => handleClick(1)}>خیلی موافق</button>
            <button onClick={() => handleClick(0.5)}>موافق</button>
            <button onClick={() => handleClick(0)}>نظری ندارم</button>
            <button onClick={() => handleClick(-0.5)}>مخالف</button>
            <button onClick={() => handleClick(-1)}>خیلی مخالف</button>
          </div>
          <button
            id="backButton"
            onClick={handleBack}
            disabled={answers.length === 0} // ← توی سوال اول غیرفعال
          >
            ← بازگشت
          </button>
        </div>
      )}
    </>
  );
}
