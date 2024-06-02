import React from "react";

function FinishedScreen({ points, maximumPoints, highscore, dispatch }) {
  const percentage = (points / maximumPoints) * 100;
  console.log(percentage);

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage < 100 && percentage >= 80) emoji = "🎉";
  if (percentage < 80 && percentage >= 50) emoji = "🙃";
  if (percentage < 50 && percentage >= 1) emoji = "🤨";
  if (percentage === 0) emoji = "😥";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored {points} from {maximumPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore})</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Requiz
      </button>
    </>
  );
}

export default FinishedScreen;
