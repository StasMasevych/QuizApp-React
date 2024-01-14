import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

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
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((data) => data.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <>
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </>
  );
}

export default App;
