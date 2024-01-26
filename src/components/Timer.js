import React, { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  useEffect(() => {
    setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
  }, []);
  return <div className="timer">{secondsRemaining}</div>;
}

export default Timer;
