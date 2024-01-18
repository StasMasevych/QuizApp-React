import React from "react";

function Questions({ questions }) {
  return (
    <ul>
      {questions.map((el) => (
        <li>{el.question}</li>
      ))}
    </ul>
  );
}

export default Questions;
