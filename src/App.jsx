import { useCallback, useState } from "react";

import PoliticalCompass from "./components/PoliticalCompass";
import QuestionBox from "./components/QuestionBox";
function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isAnswered, setIsAnswered] = useState(false);

  const updatePosition = useCallback((newPosition) => {
    setPosition(newPosition);
  }, []);

  const onFinish = (Finished) => {
    if (Finished) {
      setIsAnswered(true);
    }
  };

  console.log("position در App:", JSON.stringify(position));

  return (
    <div className="App">
      {isAnswered ? (
        <div>
          <h1 className="title">نمودار جایگاه سیاسی شما</h1>
          <PoliticalCompass userPosition={position} />
        </div>
      ) : (
        <QuestionBox updatePosition={updatePosition} onFinish={onFinish} />
      )}
    </div>
  );
}

export default App;
