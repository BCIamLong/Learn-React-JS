import Quiz from "./Quiz";
import QuizHeader from "./QuizHeader";
import Welcome from "./Welcome";
import Progress from "./Progress";
import QuizBox from "./QuizBox";
import Answers from "./Answers";
import Control from "./Controls";
import Button from "./Button";
import { useEffect, useReducer } from "react";
import Answer from "./Answer";
import Question from "./Question";
import { getQuestions } from "../services/apiQuestions";
import Timer from "./Timer";
import Result from "./Result";

const initialState = {
  start: false,
  selectedId: undefined,
  questions: [],
  numQuestion: 0,
  score: 0,
  timer: 0,
};

const reducer = (state, action) => {
  const { start, selectedId, score, numQuestion, timer } = state;
  const { type, payload } = action;

  switch (type) {
    case "start":
      return { ...state, start: true, timer: 540 };
    case "setQuestions":
      return { ...state, questions: payload };
    case "setSelectedId":
      return { ...state, selectedId: payload };
    case "setScore":
      return { ...state, score: score + payload };
    case "setNumQuestion":
      return { ...state, numQuestion: numQuestion + 1 };
    case "next":
      return {
        ...state,
        selectedId: undefined,
        numQuestion: numQuestion + 1,
      };
    case "setTimer":
      return { ...state, timer: timer - 1 };
    default:
      throw new Error("Unknown action");
  }
};

export default function ReactQuiz() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { start, selectedId, questions, numQuestion, score, timer } = state;
  const questionObj = questions.at(numQuestion)
    ? questions.at(numQuestion)
    : {};
  const {
    question,
    options: answers,
    correctOption: correct,
    points,
  } = questionObj;

  const minute = Math.floor(timer / 60);
  const minuteFormat = minute.toString().length === 1 ? `0${minute}` : minute;

  const seconds = timer % 60 === 0 ? 0 : timer - minute * 60;
  const secondsFormat =
    seconds.toString().length === 1 ? `0${seconds}` : seconds;

  const handleClickStart = () => {
    dispatch({ type: "start" });
  };

  const handleSelectedId = (id) => {
    dispatch({ type: "setSelectedId", payload: id });
    if (id === correct) dispatch({ type: "setScore", payload: points });
  };

  const handleClickNext = () => {
    // dispatch({ type: "setNumQuestion" });
    dispatch({ type: "next" });
  };

  // const handleCalcScore = (s) => {
  //   dispatch({ type: "setScore", payload: s });
  // };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsData = await getQuestions();
        dispatch({ type: "setQuestions", payload: questionsData });
      } catch (err) {
        alert(err);
      }
    };

    fetchQuestions();

    const intervalId = setInterval(() => {
      if (timer === 0) return clearInterval(intervalId);
      dispatch({ type: "setTimer" });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  return (
    <main className="react-quiz">
      <QuizHeader />
      {!start ? (
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
      )}
    </main>
  );
}
