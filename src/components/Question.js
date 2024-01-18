import React from "react";
import Options from "./Options";

function Question({ question, dispatch }) {
  console.log(question);
  function moveNextHandler() {
    dispatch({ type: "nextQuestion" });
  }
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
      <button className="btn btn-ui" onClick={moveNextHandler}>
        Next
      </button>
    </div>
  );
}

export default Question;