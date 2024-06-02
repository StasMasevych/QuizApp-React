import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Questions from "./Questions";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import NextButton from "./NextButton";
import FinishedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";

import { useQuizze } from "../context/QuizContext";

function App() {
  const {
    questions,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    status,
    dispatch,
  } = useQuizze();

  /* console.log(maximumPoints); */
  /* console.log(questions); */
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((data) => data.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && <StartScreen />}
        {status === "error" && <Error />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishedScreen />}
      </Main>
    </div>
  );
}

export default App;
