import React, { useState, useEffect } from "react";
import Pie from "./Pie";
import ScoreData from "./ScoreData";
import "./Quiz.css";
function Quiz() {
  const questions = [
    {
      questionText: "What is national animal of India",
      anwserOptions: [
        { answerText: "Tiger", isCorrect: true },
        { answerText: "Lion", isCorrect: false },
        { answerText: "Dear", isCorrect: false },
        { answerText: "Bear", isCorrect: false },
      ],
    },
    {
      questionText: "Who is PM of India",
      anwserOptions: [
        { answerText: "Sonia Gandhi", isCorrect: false },
        { answerText: "Rahul Gandhi", isCorrect: false },
        { answerText: "Arvind Kejriwal", isCorrect: false },
        { answerText: "Narendra Modi", isCorrect: true },
      ],
    },
    {
      questionText: "The Battle of Plassey was fought in",
      anwserOptions: [
        { answerText: "1757", isCorrect: true },
        { answerText: "1782", isCorrect: false },
        { answerText: "1748", isCorrect: false },
        { answerText: "1764", isCorrect: false },
      ],
    },
    {
      questionText: "The ratio of width of our National flag to its length is",
      anwserOptions: [
        { answerText: "3:5", isCorrect: false },
        { answerText: "2:3", isCorrect: true },
        { answerText: "2:4", isCorrect: false },
        { answerText: "3:4", isCorrect: false },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isShowScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showData, setShowDataFlag] = useState(false);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    if (timeLeft === 0) {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        handleOption({}, false);
      } else {
        setShowScore(true);
        return;
      }
    }
    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleOption = (evt, isCorrect) => {
    const answer = evt?.target?.value ? evt.target.value : "";
    setTimeLeft(15);
    if (isCorrect) {
      setScore(score + 1);
    }
    arr.push(answer);
    setArr([...arr]);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const data = [
    {
      date: 0,
      value: (score / questions.length) * 100,
    },
    {
      date: 1,
      value: 100 - (score / questions.length) * 100,
    },
  ];

  const handleOnclick = (val) => {
    setShowDataFlag(true);
    setTimeLeft(0);
  };

  return (
    <div>
      {showData ? (
        <ScoreData arrData={arr} />
      ) : (
        <>
          {isShowScore ? (
            <div>
              <Pie
                data={data}
                width={500}
                height={500}
                innerRadius={100}
                outerRadius={200}
                handleOnclick={handleOnclick}
              />
            </div>
          ) : (
            <>
              <div>
                <div className={"timer"}>Time Left : {timeLeft} seconds</div>
                <div className="container">
                  <div className="questionText">
                    {questions[currentQuestion].questionText}
                  </div>
                  {questions[currentQuestion].anwserOptions.map(
                    (anwserOptions, key) => (
                      <button
                        onClick={(evt) =>
                          handleOption(evt, anwserOptions.isCorrect)
                        }
                        value={anwserOptions.answerText}
                        key={key}
                      >
                        {anwserOptions.answerText}
                      </button>
                    )
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
export default Quiz;
