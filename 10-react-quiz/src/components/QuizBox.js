export default function QuizBox({ selectedId, children }) {
  return (
    <div className={`quiz-box ${selectedId >= 0 ? "click" : ""}`}>
      {children}
    </div>
  );
}
