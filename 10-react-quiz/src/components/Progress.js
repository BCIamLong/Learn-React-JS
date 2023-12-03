export default function Progress({ score, questions, numQuestion }) {
  const totalPoints = questions?.reduce((acc, el) => acc + el.points, 0);
  const progress = ((numQuestion + 1) / questions.length) * 100;
  return (
    <div className="progress ">
      <input
        style={{
          background: `linear-gradient(to right, #1098ad ${progress}%, #fff ${progress}%)`,
        }}
        className="slider"
        type="range"
        max="15"
        min="0"
        defaultValue="1"
      />
      <div className="progress-info">
        <p className="num-questions">
          Question {numQuestion + 1}/{questions.length}
        </p>
        <p className="points">
          {score}/{totalPoints} points
        </p>
      </div>
    </div>
  );
}
