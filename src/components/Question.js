import React from "react";
import Options from "./Options";
import { useQuizze } from "../context/QuizContext";

function Question() {
  const { questions, index } = useQuizze();

  const question = questions[index];

  console.log("Data in Question component", question);

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Question;
