import { useQuiz } from "../context/QuizContext";

export default function Welcome({ children }) {
  const { numQuestions, dispatch, questions } = useQuiz();

  const questionsData = questions.map((q, i) => (i < numQuestions ? q : null));
  const hardQuestions = questionsData.filter((q) => q?.points === 30).length;
  const mediumQuestions = questionsData.filter((q) => q?.points === 20).length;
  const easyQuestions = questionsData.filter((q) => q?.points === 10).length;

  return (
    <div className="welcome">
      <h3 className="heading-tertiary">Welcome to The React Quiz!</h3>
      <input
        type="number"
        placeholder="Number of questions"
        max={numQuestions}
        onChange={(e) =>
          dispatch({ type: "setNumQuestions", payload: +e.target.value })
        }
      />
      {numQuestions > 0 && (
        <>
          <p className="filter">
            <span>{easyQuestions} easy questions </span>
            <span>{mediumQuestions} easy questions </span>
            <span>{hardQuestions} hard questions</span>
          </p>
          <p>{numQuestions} questions to test your React mastery</p>
        </>
      )}
      {children}
    </div>
  );
}
