import { useQuiz } from "../context/QuizContext";

export default function Progress() {
  const { selectedId, score, totalPoints, numQuestions, numQuestion } =
    useQuiz();
  // const totalPoints = questions?.reduce((acc, el) => acc + el.points, 0);
  // const numQuestionFormat = selectedId >= 0 ? numQuestion + 1 : numQuestion;
  // const progress = ((numQuestion + +(selectedId >= 0)) / questions.length) * 100;
  // const progress =
  //   ((numQuestion + Number(selectedId >= 0)) / questions.length) * 100;
  const progress =
    ((numQuestion + Number(selectedId >= 0)) / numQuestions) * 100;

  return (
    <div className="progress">
      {/* <progress value={numQuestionFormat} max={questions.length} /> */}
      {/* <progress value={numQuestion + Number(selectedId >= 0)} max={questions.length} /> */}
      <input
        style={{
          background: `linear-gradient(to right, #1098ad ${progress}%, #fff ${progress}%)`,
        }}
        className="slider"
        type="range"
        max="15"
        min="0"
        defaultValue={numQuestion}
      />
      <div className="progress-info">
        <p className="num-questions">
          {/* Question <strong>{numQuestion + 1}</strong> / {questions.length} */}
          Question <strong>{numQuestion + 1}</strong> / {numQuestions}
        </p>
        <p className="points">
          {/* <strong>{score}</strong> / {totalPoints} points */}
          Total points: {totalPoints} points
        </p>
      </div>
    </div>
  );
}
