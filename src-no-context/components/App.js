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

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,

  //"loading", "error", "ready", "active", "finished"
  status: "loading",
};

function reducer(state, action) {
  if (action.type === "dataReceived") {
    return {
      ...state,
      questions: action.payload,
      status: "ready",
    };
  }

  if (action.type === "dataFailed") {
    return {
      ...state,
      status: "error",
    };
  }

  if (action.type === "start") {
    return {
      ...state,
      status: "active",
      secondsRemaining: state.questions.length * SECS_PER_QUESTION,
    };
  }

  if (action.type === "nextQuestion") {
    return {
      ...state,
      index: state.index + 1,
      /* secondsRemaining: SECS_PER_QUESTION, */
      answer: null,
    };
  }

  if (action.type === "finish") {
    return {
      ...state,
      highscore:
        state.points > state.highscore ? state.points : state.highscore,
      status: "finished",
    };
  }

  if (action.type === "restart") {
    return {
      ...state, //fetched questions
      index: 0,
      answer: null,
      points: 0,
      status: "ready",
    };
  }

  if (action.type === "answer") {
    //find current question
    const question = state.questions[state.index];
    console.log("question", question);
    return {
      ...state,
      answer: action.payload,
      //check if current question is correct
      //check whether clicked question by index match with correct property
      points:
        action.payload === question.correctOption
          ? state.points + question.points
          : state.points,
    };
  }

  if (action.type === "tick") {
    /* const noMoreQuestions = state.index + 1 >= state.questions.length; */

    return {
      ...state,
      secondsRemaining:
        state.secondsRemaining !== 0
          ? state.secondsRemaining - 1
          : SECS_PER_QUESTION,
      index: state.secondsRemaining === 0 ? state.index + 1 : state.index, // start timer from 0 at each question

      status: state.secondsRemaining === 0 ? "finished" : state.status,
      /* status: state.secondsRemaining === 0 ? "finished" : state.status, */
    };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;

  const numberOfQuestions = questions.length;

  const maximumPoints = questions.reduce((acc, val) => acc + val.points, 0);

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
        {status === "ready" && (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}
        {status === "error" && <Error />}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numberOfQuestions={numberOfQuestions}
              points={points}
              maximumPoints={maximumPoints}
              answer={answer}
            />
            <Question
              question={questions[index]} //show next question after changing a state (+1)
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                answer={answer}
                dispatch={dispatch}
                index={index}
                numberOfQuestions={numberOfQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maximumPoints={maximumPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
