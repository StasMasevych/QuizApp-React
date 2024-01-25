import React from "react";

function FinishedScreen({ points, maximumPoints }) {
  const percentage = (points / maximumPoints) * 100;
  return (
    <p className="result">
      You scored {points} from maximum possible {maximumPoints} (
      {Math.ceil(percentage)}%)
    </p>
  );
}

export default FinishedScreen;
