import React from "react";
import { useQuizze } from "../context/QuizContext";

function StartScreen() {
  const { dispatch, numberOfQuestions } = useQuizze();

  function startHandler() {
    dispatch({ type: "start" });
  }
  return (
    <div className="start">
      <h2>Welcome to React Quiz!</h2>
      <h3> {numberOfQuestions} questions to test your React knowledge</h3>
      <button className="btn btn-ui" onClick={startHandler}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
