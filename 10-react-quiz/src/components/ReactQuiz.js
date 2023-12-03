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
import Loader from "./Loader";
import Message from "./Message";

const initialState = {
  status: "loading",
  // start: false,
  selectedId: undefined,
  questions: [],
  numQuestion: 0,
  score: 0,
  timer: 1,
  message: "",
};

const reducer = (state, action) => {
  const { score, numQuestion, timer } = state;
  const { type, payload } = action;

  switch (type) {
    case "start":
      return { ...state, timer: 5, status: "active" };
    case "setQuestions":
      return { ...state, questions: payload, status: "ready" };
    case "fetchDataFail":
      return { ...state, status: "error", message: payload };
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
    case "finish":
      return { ...state, status: "finished" };
    default:
      throw new Error("Unknown action");
  }
};

export default function ReactQuiz() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedId, questions, numQuestion, score, timer, status, message } =
    state;
  const questionObj = questions.at(numQuestion)
    ? questions.at(numQuestion)
    : {};
  const {
    question,
    options: answers,
    correctOption: correct,
    points,
  } = questionObj;

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
    // console.log(numQuestion, questions.length - 1);
    if (numQuestion === questions.length - 1) dispatch({ type: "finish" });
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
        dispatch({ type: "fetchDataFail", payload: err.message });
        // alert(err);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <main className="react-quiz">
      <QuizHeader />

      {status === "loading" && <Loader />}
      {status === "ready" && (
        <Welcome>
          <Button onBtnClick={handleClickStart}>Let's start!</Button>
        </Welcome>
      )}
      {status === "active" && (
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
              <Timer timer={timer} dispatch={dispatch} />
              <Button onBtnClick={handleClickNext} type="next">
                {numQuestion === 14 ? "End" : "Next"}
              </Button>
            </Control>
          </QuizBox>
        </Quiz>
      )}
      {status === "finished" && <Result score={score} />}
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
