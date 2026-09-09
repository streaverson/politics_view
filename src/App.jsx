import { useCallback, useState } from "react";

import SimpleChart from "./components/SimpleChart";
import QuestionBox from "./components/QuestionBox";
function App() {
  const [position, setPosition] = useState({ x: 2, y: 1 });
  const [isAnswered, setIsAnswered] = useState(false);

  const updatePosition = useCallback((newPosition) => {
    setPosition(newPosition);
  }, []);

  const onFinish = (Finished) => {
    if (Finished) {
      setIsAnswered(true);
    }
  };
  return (
    <div className="App">
      {isAnswered ? (
        <div>
          <h1 className="title">نمودار جایگاه سیاسی شما</h1>
          <SimpleChart userPosition={position} />
        </div>
      ) : (
        <QuestionBox updatePosition={updatePosition} onFinish={onFinish} />
      )}
    </div>
  );
}

export default App;
