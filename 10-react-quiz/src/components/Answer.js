function Answer({ isSelected, answer, selectedId, dispatch }) {
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
