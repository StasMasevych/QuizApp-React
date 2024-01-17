import React from "react";

function Question({ question, dispatch }) {
  console.log(question);
  function moveNextHandler() {
    dispatch({ type: "nextQuestion" });
  }
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((el) => {
          return <button className="btn btn-option">{el}</button>;
        })}
      </div>
      <button className="btn btn-ui" onClick={moveNextHandler}>
        Next
      </button>
    </div>
  );
}

export default Question;
