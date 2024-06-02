import React from "react";
import { useQuizze } from "../context/QuizContext";

function Options() {
  const { question, dispatch, answer } = useQuizze();

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
