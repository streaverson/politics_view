import { useEffect, useState } from "react";
import "../QuestionBox.css";
import questions from "../questions";

export default function QuestionBox({ updatePosition, onFinish }) {
  const [answers, setAnswers] = useState([]);
  const currentQuestionIndex = answers.length;
  const isFinished = currentQuestionIndex === questions.length;
  // ------------

  useEffect(() => {
    // جدا کردن جواب‌های econ و social
    const econAnswers = [];
    const socialAnswers = [];

    questions.forEach((question, index) => {
      if (index >= answers.length) return;
      if (question.tag === "econ") econAnswers.push(answers[index]);
      else if (question.tag === "social") socialAnswers.push(answers[index]);
    });

    // میانگین هر محور (بین -1 و +1)
    const avgX =
      econAnswers.length > 0
        ? econAnswers.reduce((a, b) => a + b, 0) / econAnswers.length
        : 0;
    const avgY =
      socialAnswers.length > 0
        ? socialAnswers.reduce((a, b) => a + b, 0) / socialAnswers.length
        : 0;

    // نرمالایز به بازه [-10, +10]
    const normalizedX = avgX * 10;
    const normalizedY = avgY * 10;

    updatePosition({ x: normalizedX, y: normalizedY });
  }, [answers, updatePosition]);
  const handleBack = () => {
    if (answers.length > 0) {
      setAnswers((prev) => prev.slice(0, -1));
    }
  };
  // ------------

  // useEffect(() => {
  //   if (isFinished) {
  //     onFinish(true);
  //     // const timer = setTimeout(() => {
  //     // }, 1200);
  //     // return () => clearTimeout(timer);
  //   }
  // }, [isFinished, onFinish]);

  const handleClick = (score) => {
    if (answers.length < questions.length) {
      const direction = questions[currentQuestionIndex].direction;
      setAnswers((prev) => [...prev, score * direction]);
    }
  };

  const progressPercent = (currentQuestionIndex / questions.length) * 100;

  // console.log(isFinished);

  return (
    <>
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
        {isFinished ? (
          <button id="finishBtn" onClick={() => onFinish(true)}>
            اتمام
          </button>
        ) : (
          <div id="optionsSection">
            <button onClick={() => handleClick(1)}>خیلی موافق</button>
            <button onClick={() => handleClick(0.5)}>موافق</button>
            <button onClick={() => handleClick(0)}>نظری ندارم</button>
            <button onClick={() => handleClick(-0.5)}>مخالف</button>
            <button onClick={() => handleClick(-1)}>خیلی مخالف</button>
          </div>
        )}
        <button
          id="backBtn"
          onClick={handleBack}
          disabled={answers.length === 0} // ← توی سوال اول غیرفعال
        >
          ← بازگشت
        </button>
      </div>
    </>
  );
}
