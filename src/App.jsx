import { useCallback, useState } from "react";
import StartState from "./components/StartState";
import PoliticalCompass from "./components/PoliticalCompass";
import QuestionBox from "./components/QuestionBox";
function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isAnswered, setIsAnswered] = useState(false);
  const [isStarted, setIsStarted] = useState(true);
  const updatePosition = useCallback((newPosition) => {
    setPosition(newPosition);
  }, []);

  const onFinish = useCallback(() => {
    setIsAnswered(true);
  }, []);
  const onStart = () => {
    setIsStarted((prev) => !prev);
  };
  console.log("app started : ", !isStarted);

  return (
    <div className="app">
      <div id="container" dir="rtl">
        {/* {isStarted && <StartState />} */}
        {isStarted ? (
          <StartState onStart={onStart} />
        ) : isAnswered ? (
          <div>
            <PoliticalCompass userPosition={position} />
          </div>
        ) : (
          <QuestionBox updatePosition={updatePosition} onFinish={onFinish} />
        )}
      </div>
    </div>
  );
}
export default App;

/*


*/
