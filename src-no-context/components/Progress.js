import React from "react";

function Progress({ index, numberOfQuestions, points, maximumPoints, answer }) {
  return (
    <section className="progress">
      <progress
        max={numberOfQuestions}
        value={index + Number(answer !== null)}
      />
      <p>
        Question <strong>{index + 1}</strong> / {numberOfQuestions}
      </p>
      <p>
        Points <strong>{points}</strong> / {maximumPoints}
      </p>
    </section>
  );
}

export default Progress;
