import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Questions from "./Questions";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

function App() {
  const initialState = {
    questions: [],

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
      };
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status } = state;
  const numberOfQuestions = questions.length;
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
        {status === "active" && <Question />}
      </Main>
    </div>
  );
}

export default App;
