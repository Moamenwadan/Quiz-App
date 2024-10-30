import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Progress from "./Progress";
import Questions from "./Questions";
import Footer from "./Footer";
import Timer from "./Timer";
import FinishScreen from "./FinishScreen";
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondRemaining: 30,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * 1,
      };
    case "newAnswer":
      const currentQuestions = state.questions[state.index];
      // console.log(currentQuestions);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestions.correctOption
            ? state.points + currentQuestions.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "rest":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
      };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw Error("Error Occured");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highScore, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  useEffect(function () {
    async function fecthQuestions() {
      const res = await fetch("http://localhost:8000/questions");
      const data = await res.json();
      //   console.log(data);
      dispatch({ type: "dataReceived", payload: data });
    }
    fecthQuestions();
  }, []);
  const numOfQuestions = questions?.length;
  const everyPoints = questions?.map((element) => {
    return element.points;
  });

  const sumOfPoints = everyPoints?.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  // console.log(sumOfPoints);
  return (
    <div className="app">
      <Header numOfQuestions={numOfQuestions}></Header>
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numOfQuestions={numOfQuestions} />
        )}
        {status === "active" && (
          <>
            <Progress
              numOfQuestions={numOfQuestions}
              currentQuestion={index}
              sumOfPoints={sumOfPoints}
              points={points}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer
              dispatch={dispatch}
              answer={answer}
              questions={questions}
              index={index}
              secondRemaining={secondRemaining}
            >
              {" "}
              <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            sumOfPoints={sumOfPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
        {/* <FinishScreen /> */}
      </Main>
    </div>
  );
}
