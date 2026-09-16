import { useEffect, useState, useRef } from "react";
// import "../.css";
import { FaCheck } from "react-icons/fa"; // آیکون تیک از FontAwesome
import Modal from "../components/modal";
import questions from "../questions";
import convertToPersianDigits from "../utils/persianHelper";

export default function QuestionBox({ updatePosition, onFinish }) {
  const [showModal, setShowModal] = useState(false);
  const hasCheckedLocalStorage = useRef(false); // baraye inke vaziat check krdn ro hefz kone

  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem("myAnswers");
    if (!savedAnswers) return [];

    try {
      const parsed = JSON.parse(savedAnswers);
      if (!Array.isArray(parsed)) return [];

      return parsed.map((item) => {
        return typeof item === "number" && !isNaN(item) ? item : null;
      });
    } catch (error) {
      console.error(error, "یک ارورری درباره لوکال استوریج");
      return [];
    }
  });

  // baraye animation question ha
  const [phase, setPhase] = useState("idle"); // "idle" va "leaving"
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const getIsActive = (value) => {
    const currentAnswer = answers[currentQuestionIndex];
    const direction = questions[currentQuestionIndex]?.direction ?? 1;
    return currentAnswer === value * direction;
  };

  const isFinished = currentQuestionIndex === questions.length;
  // ------------
  // baraye neshoon dadan modal
  useEffect(() => {
    // age check shode ghablan, return she.
    if (hasCheckedLocalStorage.current) return;

    // check anjam shod , age nashode boode az ghabl
    hasCheckedLocalStorage.current = true;

    const savedAnswers = localStorage.getItem("myAnswers");
    if (savedAnswers && JSON.parse(savedAnswers).length > 0) {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    // جدا کردن جواب‌های econ و social
    // const econAswers = [];

    const econAnswers = answers.filter(
      (a, i) => questions[i]?.tag === "econ" && typeof a === "number",
    );
    const socialAnswers = answers.filter(
      (a, i) => questions[i]?.tag === "social" && typeof a === "number",
    );

    // dige lazem nis , balayi behtare ba method filter **
    // questions.forEach((question, index) => {
    //   if (index >= answers.length) return;
    //   if (question.tag === "econ") econAnswers.push(answers[index]);
    //   else if (question.tag === "social") socialAnswers.push(answers[index]);
    // });

    // میانگین هر محور (بین -1 و +1)
    const avgX =
      econAnswers.length > 0
        ? econAnswers.reduce((acc, curr) => acc + (Number(curr) || 0), 0) /
          econAnswers.length
        : 0;
    //
    const avgY =
      socialAnswers.length > 0
        ? socialAnswers.reduce((acc, curr) => acc + (Number(curr) || 0), 0) /
          socialAnswers.length
        : 0;

    // نرمالایز به بازه [-10, +10]
    const normalizedX = avgX * 30;
    const normalizedY = avgY * 30;
    console.log(normalizedX, normalizedY);

    updatePosition({ x: normalizedX, y: normalizedY });
  }, [answers, updatePosition]);
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((i) => i - 1);
    }
  };
  // ------------
  //age timer khasti
  useEffect(() => {
    if (isFinished) {
      onFinish(true);
      const timer = setTimeout(() => {}, 1000);
      return () => clearTimeout(timer);
    }
  }, [isFinished, onFinish]);

  const handleClick = (value) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    const direction = currentQuestion?.direction ?? 1;
    const score = value * direction;

    if (isNaN(score)) {
      console.error("خطا در محاسبه امتیاز:", { value, direction });
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = score;

    localStorage.setItem("myAnswers", JSON.stringify(newAnswers));

    setPhase("leaving"); //faal kardim animationn khorooj ro
    setTimeout(() => {
      setCurrentQuestionIndex((i) => i + 1);
      setPhase("entering");
      setAnswers(newAnswers);
      requestAnimationFrame(() => {
        setPhase("idle");
      });
    }, 230);
  };

  const handleFromStart = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    localStorage.removeItem("myAnswers");

    setShowModal(false);
  };

  const handleContinue = () => {
    const firstUnanswered = answers.findIndex(
      (a) => a === null || a === undefined,
    );
    setCurrentQuestionIndex(
      firstUnanswered === -1 ? answers.length : firstUnanswered,
    );
    setShowModal(false);
  };

  // javab nadad baraye localsotrage
  // useEffect(() => {

  //   localStorage.setItem(
  //     currentQuestionIndex,
  //     JSON.stringify(answers[currentQuestionIndex - 1] ??),
  //   );
  // }, [answers, currentQuestionIndex]);

  const progressPercent = (currentQuestionIndex / questions.length) * 100;
  // console.log(answers[currentQuestionIndex]);
  // console.log(isFinished);

  // vaghti faghat answers.length ro bedim , momkene dakhelesh meghdar null bashe va dorost amal nakone modal.
  const answeredCount = answers.filter((a) => typeof a === "number").length;
  //
  return (
    <>
      {showModal && (
        <Modal
          handleContinue={handleContinue}
          fromStart={handleFromStart}
          currentQuestion={answeredCount}
          questions={questions.length}
        />
      )}
      <div className="card">
        <div id="progress">
          <div id="progressBar">
            <div
              style={{
                width: `${progressPercent}%`,
                transition: "width 0.3s ease",
              }}
            ></div>
          </div>
          <span>
            {`${convertToPersianDigits(currentQuestionIndex + 1 <= 30 ? currentQuestionIndex + 1 : 30)} / ${convertToPersianDigits(questions.length)}`}
          </span>
        </div>

        <div id="mainWrap">
          <div id="question" className={phase === "leaving" ? "leaving" : ""}>
            <div id="questionText">
              {questions[currentQuestionIndex]?.question}
            </div>
            {isFinished ? (
              <button id="finishBtn" onClick={() => onFinish(true)}>
                اتمام
              </button>
            ) : (
              <div id="questionOptions">
                <button
                  className="options"
                  onClick={() => {
                    handleClick(1);
                  }}
                >
                  <span
                    className={`optionCheckBox ${getIsActive(1) ? "active" : ""} `}
                  >
                    {getIsActive(1) && <FaCheck className="checkmark-icon" />}
                  </span>
                  <span className="label">خیلی موافق</span>
                </button>
                {/* __________________ */}
                <button
                  className="options"
                  onClick={() => {
                    handleClick(0.5);
                  }}
                >
                  <span
                    className={`optionCheckBox ${getIsActive(0.5) ? "active" : ""} `}
                  >
                    {getIsActive(0.5) && <FaCheck className="checkmark-icon" />}
                  </span>

                  <span className="label"> موافق</span>
                </button>
                {/* _______________ */}
                <button
                  className="options"
                  onClick={() => {
                    handleClick(0);
                  }}
                >
                  <span
                    className={`optionCheckBox ${getIsActive(0) ? "active" : ""} `}
                  >
                    {getIsActive(0) && <FaCheck className="checkmark-icon" />}
                  </span>

                  <span className="label">نظری ندارم</span>
                </button>
                {/* _____________ */}
                <button
                  className="options"
                  onClick={() => {
                    handleClick(-0.5);
                  }}
                >
                  <span
                    className={`optionCheckBox ${getIsActive(-0.5) ? "active" : ""} `}
                  >
                    {getIsActive(-0.5) && (
                      <FaCheck className="checkmark-icon" />
                    )}
                  </span>
                  <span className="label">مخالف</span>
                </button>
                {/* _____________ */}
                <button
                  className="options"
                  onClick={() => {
                    handleClick(-1);
                  }}
                >
                  <span
                    className={`optionCheckBox ${getIsActive(-1) ? "active" : ""} `}
                  >
                    {getIsActive(-1) && <FaCheck className="checkmark-icon" />}
                  </span>
                  <span className="label">خیلی مخالف</span>
                </button>
              </div>
            )}

            {/* {isFinished ? (
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
            )} */}
          </div>
        </div>
        <div className="cardFooter">
          <button
            id="backBtn"
            onClick={handleBack}
            disabled={answers.length === 0} // ← توی سوال اول غیرفعال
          >
            ← بازگشت
          </button>

          <span id="answerCount">{`${convertToPersianDigits(answers.length < 31 ? answers.length : 30)} پاسخ ثبت شده`}</span>
        </div>
      </div>
    </>
  );
}
