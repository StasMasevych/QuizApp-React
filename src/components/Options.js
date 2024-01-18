import React from "react";

function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((el, index) => {
        return (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswered
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            } `}
            key={index}
            onClick={() => dispatch({ type: "answer", payload: index })}
            disabled={hasAnswered}
          >
            {el}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
