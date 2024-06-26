import React from "react";
import { useQuizze } from "../context/QuizContext";

function NextButton() {
  const { answer, dispatch, index, numberOfQuestions } = useQuizze();

  function moveNextHandler() {
    dispatch({ type: "nextQuestion" });
  }

  if (index < numberOfQuestions - 1) {
    return (
      <>
        {answer !== null ? (
          <button className="btn btn-ui" onClick={moveNextHandler}>
            Next
          </button>
        ) : null}
      </>
    );
  }

  if (index === numberOfQuestions - 1) {
    return (
      <>
        {answer !== null ? (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "finish" })}
          >
            Finish
          </button>
        ) : null}
      </>
    );
  }
}

export default NextButton;
