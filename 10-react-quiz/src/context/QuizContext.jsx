import { createContext, useContext, useEffect, useReducer } from "react";
import { SECS_PER_QUESTION } from "../config/appConfig";
import {
  getHighScore,
  getQuestions,
  postHighScore,
} from "../services/apiQuestions";

const QuizContext = createContext();

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

function QuizProvider({ children }) {
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
    <QuizContext.Provider
      value={{
        status,
        numQuestions,
        dispatch,
        questions,
        score,
        totalPoints,
        numQuestion,
        selectedId,
        question,
        answers,
        correct,
        timer,
        totalScores,
        highScore,
        message,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

const useQuiz = () => {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error("QuizContext was using outside the QuizProvider!");

  return context;
};

export { useQuiz, QuizProvider };
