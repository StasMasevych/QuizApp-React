import React from "react";
import { useQuizze } from "../context/QuizContext";

function Progress() {
  const { index, numberOfQuestions, points, maximumPoints, answer } =
    useQuizze();

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
