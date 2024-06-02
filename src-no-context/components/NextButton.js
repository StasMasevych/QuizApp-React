import React from "react";

function NextButton({ answer, dispatch, index, numberOfQuestions }) {
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
