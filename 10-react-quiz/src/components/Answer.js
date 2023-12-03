function Answer({ isSelected, answer, selectedId, onAnswerClick }) {
  return (
    <li
      onClick={() => onAnswerClick(answer.id)}
      className={`answer ${isSelected ? "target" : ""} ${
        answer.id === answer.correct ? "correct" : ""
      }`}
    >
      {answer.answer}
    </li>
  );
}

export default Answer;
