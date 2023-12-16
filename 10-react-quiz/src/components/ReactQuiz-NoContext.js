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
import {
  getHighScore,
  getQuestions,
  postHighScore,
} from "../services/apiQuestions";
import Timer from "./Timer";
import Result from "./Result";
import Loader from "./Loader";
import Message from "./Message";

const SECS_PER_QUESTION = 30;

const initialState = {
  status: "loading",
  // start: false,
  selectedId: -1,
  questions: [],
  numQuestion: 0,
  score: 0,
  timer: 1,
  message: "",
  highScore: 0,
  numQuestions: null,
  answers: [],
};
// postHighScore({ id: 1, highScore: 10 });

const reducer = (state, action) => {
  const {
    score,
    numQuestion,
    timer,
    questions,
    status,
    highScore,
    numQuestions,
    answers,
    selectedId,
  } = state;
  const { type, payload } = action;
  const currentQuestion = questions[numQuestion];

  switch (type) {
    case "start":
      return {
        ...state,
        timer: numQuestions * SECS_PER_QUESTION,
        // timer: questions.length * SECS_PER_QUESTION,
        status: "active",
      };
    case "setQuestions":
      return { ...state, questions: payload, status: "ready" };
    case "fetchDataFail":
      return { ...state, status: "error", message: payload };
    case "setSelectedId":
      return {
        ...state,
        selectedId: payload,
        score:
          payload === currentQuestion.correctOption
            ? score + currentQuestion.points
            : score,
      };
    case "setScore":
      return { ...state, score: score + payload };
    case "setNumQuestion":
      return { ...state, numQuestion: numQuestion + 1 };
    case "next":
      // if (numQuestion === questions.length - 1 && score > highScore)
      //   localStorage.setItem("highScore", score);
      // console.log(highScore, score);
      // console.log(numQuestion === numQuestions - 1 && score > highScore);
      if (numQuestion === numQuestions - 1 && score > highScore)
        postHighScore({ id: Date.now(), highScore: score });
      return {
        ...state,
        // selectedId: undefined,
        selectedId: answers[numQuestion + 1]
          ? answers[numQuestion + 1].select
          : -1,
        numQuestion: numQuestion + 1,
        status: numQuestion === numQuestions - 1 ? "finished" : status,
        answers: !answers[numQuestion]
          ? [
              ...answers,
              {
                select: selectedId,
                points:
                  selectedId === currentQuestion.correctOption
                    ? currentQuestion.points
                    : 0,
              },
            ]
          : answers?.map((a) =>
              selectedId === currentQuestion.correctOption
                ? { ...a, select: selectedId, points: currentQuestion.points }
                : { ...a, select: selectedId, points: 0 }
            ),
        highScore:
          numQuestion === numQuestions - 1 && score > highScore
            ? score
            : highScore,

        // status: numQuestion === questions.length - 1 ? "finished" : status,
        // highScore:
        //   numQuestion === questions.length - 1 && score > highScore
        //     ? score
        //     : highScore,
      };
    case "setTimer":
      // console.log(timer);
      return {
        ...state,
        timer: timer - 1,
        status: timer === 0 ? "finished" : status,
      };
    case "finish":
      return { ...state, status: "finished" };
    case "reset":
      return { ...initialState, highScore: highScore };
    case "setNumQuestions":
      return {
        ...state,
        numQuestions:
          questions.length === numQuestions ? numQuestions : payload,
      };
    case "setHighScore":
      return { ...state, highScore: payload };
    case "back":
      return {
        ...state,
        numQuestion: numQuestion - 1,
        selectedId: answers[numQuestion - 1].select,
      };
    default:
      throw new Error("Unknown action");
  }
};

export default function ReactQuiz() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    selectedId,
    questions,
    numQuestion,
    score,
    timer,
    status,
    message,
    highScore,
    numQuestions,
    answers: answersArr,
  } = state;
  // const numQuestions = questions.length;
  const userQuestions = questions?.slice(0, numQuestions);

  const totalPoints = userQuestions?.reduce((acc, el) => acc + el.points, 0);
  // console.log(totalPoints);
  const totalScores = answersArr.reduce((acc, el) => acc + el.points, 0);

  const questionObj = userQuestions?.at(numQuestion)
    ? userQuestions?.at(numQuestion)
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
    if (status !== "loading") return;
    const fetchQuestions = async () => {
      try {
        const questionsData = await getQuestions();
        const highScoreData = await getHighScore();
        dispatch({ type: "setQuestions", payload: questionsData });
        dispatch({
          type: "setHighScore",
          payload: highScoreData[highScoreData.length - 1].highScore,
        });
      } catch (err) {
        dispatch({ type: "fetchDataFail", payload: err.message });
        // alert(err);
      }
    };

    fetchQuestions();
  }, [status]);

  return (
    <main className="react-quiz">
      <QuizHeader />

      {status === "loading" && <Loader />}
      {status === "ready" && (
        <Welcome
          numQuestions={numQuestions}
          dispatch={dispatch}
          questions={questions}
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
            score={score}
            totalPoints={totalPoints}
            numQuestions={numQuestions}
            numQuestion={numQuestion}
            selectedId={selectedId}
          />
          <QuizBox selectedId={selectedId}>
            <Question>{question}</Question>
            <Answers>
              {answers?.map((a, i) => (
                <Answer
                  key={i}
                  dispatch={dispatch}
                  answer={{ answer: a, id: i, correct }}
                  isSelected={i === selectedId}
                  selectedId={selectedId}
                />
              ))}
            </Answers>
            <Control>
              <Timer timer={timer} dispatch={dispatch} />
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
          score={totalScores}
          totalPoints={totalPoints}
          highScore={highScore}
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
