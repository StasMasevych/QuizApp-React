import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();

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

function QuizProvider({ children }) {
  const [
    { questions, index, answer, points, highscore, secondsRemaining, status },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numberOfQuestions = questions.length;

  const maximumPoints = questions.reduce((acc, val) => acc + val.points, 0);

  return (
    <QuizContext.Provider
      value={{
        questions,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        status,
        dispatch,
        numberOfQuestions,
        maximumPoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuizze() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("context is outside CitiesProvider");
  return context;
}

export { QuizContext, QuizProvider, useQuizze };
