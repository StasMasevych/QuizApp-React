import React from "react";

function NextButton({ answer, dispatch }) {
  function moveNextHandler() {
    dispatch({ type: "nextQuestion" });
  }
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

export default NextButton;
