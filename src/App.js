import { useEffect, useState } from "react";
import "./App.css";

const getNums = () => {
  const list = [];
  for (let i = 1; i <= 8; i++) {
    list.push(i);
    list.push(i);
  }
  return list;
};

function App() {
  const [nums, setNums] = useState(getNums());
  const [stage, setStage] = useState("init");
  const [opened, setOpened] = useState([]);
  const [solved, setSolved] = useState([]);

  const randomNums = () => {
    const copyNums = [...nums];
    return copyNums.sort(() => Math.random() - 0.5);
  };
  const handleStart = () => {
    setStage("start");
    setNums(randomNums());
    setSolved([]);
  };
  const handleClick = (num, index) => {
    if (opened.length === 2) {
      return;
    }
    setOpened((prev) => [...prev, index]);
  };

  useEffect(() => {
    if (opened.length === 2) {
      setTimeout(() => {
        const id1 = opened[0];
        const id2 = opened[1];
        if(id1 === id2){
          setOpened([id1]);
          return;
        }
        if (nums[id1] === nums[id2]) {
          // Remove the card
          setSolved((prev) => [...prev, nums[id1]]);
        }
        setOpened([]);
      }, 1000);
    }
  }, [opened]);

  useEffect(() => {
    if (solved.length === 8) {
      setStage("win");
    }
  }, [solved]);

  const getClassName = (num, index) => {
    if (solved.includes(num)) {
      return "remove";
    } else if (opened.includes(index)) {
      return "show";
    } else {
      return "";
    }
  };
  return (
    <div className="App">
      <h1>Memory Game</h1>
      {stage === "init" && <button onClick={handleStart}>Play Game</button>}
      {stage === "start" && (
        <div className="game">
          <div className="cards">
            {nums.map((num, i) => {
              return (
                <div
                  key={i}
                  className={`card ${getClassName(num, i)}`}
                  onClick={() => handleClick(num, i)}
                >
                  {num}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {stage === "win" && (
        <div>
          <h2>You Won the Game !!</h2>
          <button onClick={handleStart}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;
