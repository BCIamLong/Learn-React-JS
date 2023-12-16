import Quiz from "./Quiz";
import QuizHeader from "./QuizHeader";
import Welcome from "./Welcome";
import Progress from "./Progress";
import QuizBox from "./QuizBox";
import Answers from "./Answers";
import Control from "./Controls";
import Button from "./Button";
// import { useEffect, useReducer } from "react";
import Answer from "./Answer";
import Question from "./Question";
// import {
//   getHighScore,
//   getQuestions,
//   postHighScore,
// } from "../services/apiQuestions";
import Timer from "./Timer";
import Result from "./Result";
import Loader from "./Loader";
import Message from "./Message";
import { useQuiz } from "../context/QuizContext";

export default function ReactQuiz() {
  const {
    status,
    numQuestions,
    dispatch,
    // score,
    // totalPoints,
    numQuestion,
    // selectedId,
    question,
    answers,
    correct,
    // timer,
    // totalScores,
    // highScore,
    message,
  } = useQuiz();

  return (
    <main className="react-quiz">
      <QuizHeader />

      {status === "loading" && <Loader />}
      {status === "ready" && (
        <Welcome
        // numQuestions={numQuestions}
        // dispatch={dispatch}
        // questions={questions}
        >
          {/* <Button onBtnClick={handleClickStart}>Let's start!</Button> */}
          <Button onBtnClick={() => dispatch({ type: "start" })}>
            Let's start!
          </Button>
        </Welcome>
      )}
      {status === "active" && (
        <Quiz>
          <Progress
          // score={score}
          // totalPoints={totalPoints}
          // numQuestions={numQuestions}
          // numQuestion={numQuestion}
          // selectedId={selectedId}
          />
          <QuizBox
          // selectedId={selectedId}
          >
            <Question>{question}</Question>
            <Answers>
              {answers?.map((a, i) => (
                <Answer
                  key={i}
                  // dispatch={dispatch}
                  answer={{ answer: a, id: i, correct }}
                  // isSelected={i === selectedId}
                  // selectedId={selectedId}
                />
              ))}
            </Answers>
            <Control>
              <Timer
              // timer={timer} dispatch={dispatch}
              />
              {numQuestion > 0 && (
                <Button
                  type="back"
                  onBtnClick={() => dispatch({ type: "back" })}
                >
                  Back
                </Button>
              )}
              <Button onBtnClick={() => dispatch({ type: "next" })} type="next">
                {numQuestion === numQuestions ? "End" : "Next"}
              </Button>
            </Control>
          </QuizBox>
        </Quiz>
      )}
      {status === "finished" && (
        <Result
        // score={totalScores}
        // totalPoints={totalPoints}
        // highScore={highScore}
        >
          <Button onBtnClick={() => dispatch({ type: "reset" })}>
            Restart quiz
          </Button>
        </Result>
      )}
      {status === "error" && <Message type="error" message={message} />}
      {/* {(timer === 0 || numQuestion > questions.length - 1) && (
        <Result score={score} />
      )} */}

      {/* {!start ? (
        <Welcome>
          <Button onBtnClick={handleClickStart}>Let's start!</Button>
        </Welcome>
      ) : timer === 0 || numQuestion > questions.length - 1 ? (
        <Result score={score} />
      ) : (
        <Quiz>
          <Progress
            score={score}
            questions={questions}
            numQuestion={numQuestion}
          />
          <QuizBox selectedId={selectedId}>
            <Question>{question}</Question>
            <Answers>
              {answers?.map((a, i) => (
                <Answer
                  key={i}
                  onAnswerClick={handleSelectedId}
                  answer={{ answer: a, id: i, correct }}
                  isSelected={i === selectedId}
                  selectedId={selectedId}
                />
              ))}
            </Answers>
            <Control>
              <Timer minutes={minuteFormat} seconds={secondsFormat} />
              <Button onBtnClick={handleClickNext} type="next">
                {numQuestion === 14 ? "End" : "Next"}
              </Button>
            </Control>
          </QuizBox>
        </Quiz>
      )} */}
    </main>
  );
}
