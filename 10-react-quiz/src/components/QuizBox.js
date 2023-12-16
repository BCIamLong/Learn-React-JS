import { useQuiz } from "../context/QuizContext";

export default function QuizBox({ children }) {
  const { selectedId } = useQuiz();
  return (
    <div className={`quiz-box ${selectedId >= 0 ? "click" : ""}`}>
      {children}
    </div>
  );
}
