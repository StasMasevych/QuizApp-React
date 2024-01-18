import React from "react";
import Options from "./Options";
import NextButton from "./NextButton";

function Question({ question, dispatch, answer }) {
  /* console.log(question); */

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
      <NextButton answer={answer} dispatch={dispatch} />
    </div>
  );
}

export default Question;
