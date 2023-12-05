function Result({ score, totalPoints, highScore, children }) {
  const percent = Math.round((score / totalPoints) * 100);

  const getEmoji = (scorePercent) => {
    if (scorePercent < 20) return "👎";
    if (scorePercent >= 20 && scorePercent < 40) return "🏅";
    if (scorePercent >= 40 && scorePercent < 60) return "🥉";
    if (scorePercent >= 60 && scorePercent < 80) return "🥈";
    if (scorePercent >= 80 && scorePercent < 100) return "🥇";
    return "🏆";
  };
  const emoji = getEmoji(percent);

  // const highScore = localStorage.getItem("highScore")
  //   ? localStorage.getItem("highScore")
  //   : 0;
  return (
    <div className="result">
      <h3 className="heading-tertiary">
        <span>{emoji}</span> Your scored <strong>{score}</strong> out of{" "}
        {totalPoints} ({percent}%) <span>{emoji}</span>
      </h3>
      <p className="high-score">(High score: {highScore})</p>
      {children}
    </div>
  );
}

export default Result;
