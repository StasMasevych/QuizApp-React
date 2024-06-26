import React, { useEffect } from "react";
import { useQuizze } from "../context/QuizContext";

function Timer() {
  const { dispatch, secondsRemaining } = useQuizze();

  const mins = Math.floor(secondsRemaining / 60);
  const secs = Math.floor(secondsRemaining % 60);

  /*  console.log(mins); */

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    /* console.log(id); */

    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default Timer;
