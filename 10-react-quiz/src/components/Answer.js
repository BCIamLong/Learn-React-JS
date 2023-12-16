import { useQuiz } from "../context/QuizContext";

function Answer({ answer }) {
  const { isSelected, selectedId, dispatch } = useQuiz();
  return (
    <li
      onClick={() => dispatch({ type: "setSelectedId", payload: answer.id })}
      className={`answer ${isSelected ? "target" : ""} ${
        selectedId >= 0 && answer.id === answer.correct ? "correct" : ""
      }`}
    >
      {answer.answer}
    </li>
  );
}

export default Answer;
