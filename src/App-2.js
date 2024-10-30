import { useEffect, useReducer } from "react";
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondRemaining: 30,
};
// ...state,
// status: "ready",
// index: 0,
// answer: null,
// points: 0,
// highScore: 0,
// console.log(initialState.questions);
// const sumOfPoints = initialState.questions;
// const array = [
//   { point: 1 },
//   { point: 2 },
//   { point: 3 },
//   { point: 4 },
//   { point: 5 },
// ];
// const re = array.map((element) => {
//   return element.point;
// });
// console.log(re);
// const resum = re.reduce((acc, cur) => {
//   return acc + cur;
// }, 0);
// console.log(resum);
// let seconds = 5;

// let countDown = setInterval(function () {
//   secondPass();
// }, 1000);
// let secondPass = function () {
//   let mintues = Math.floor(seconds / 60);
//   let remSec = seconds % 60;
//   if (seconds < 0) {
//     clearInterval(countDown());
//   }
//   if (seconds < 10) {
//     remSec = "0" + remSec;
//   }
//   if (seconds > 0) {
//     seconds = seconds - 1;
//   }
//   console.log(`${mintues} : ${remSec}`);
// };

function reducer(state, action) {
  // console.log(state.questions);
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * 30,
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
function Header({ numOfQuestions }) {
  return (
    <header className="header">
      <h1>The React Quiz</h1>
    </header>
  );
}

function Main({ children }) {
  return <main>{children}</main>;
}

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Loading questions...</p>
    </div>
  );
}
function Error() {
  return (
    <p className="error">
      <span>💥</span> There was an error fecthing questions.
    </p>
  );
}

function StartScreen({ numOfQuestions, dispatch }) {
  return (
    <>
      <div className="ready">
        <h3>welcome to the React Quiz </h3>
        <p>{numOfQuestions} Questions to test your React</p>
      </div>
      <div className="startscreen">
        <button onClick={() => dispatch({ type: "start" })}>let's Start</button>
      </div>
    </>
  );
}
function Progress({
  currentQuestion,
  points,
  sumOfPoints,
  numOfQuestions,
  answer,
}) {
  return (
    <div className="gauge">
      <progress
        value={currentQuestion + Number(answer !== null)}
        max={numOfQuestions}
      ></progress>
      <div className="paragraphs">
        <p className="paragraphOne">
          Questions {currentQuestion + 1}/{numOfQuestions}
        </p>
        <p className="paragraphTwo">
          {points}/{sumOfPoints} points
        </p>
      </div>
    </div>
  );
}

function Questions({ question, dispatch, answer }) {
  const hasAnswer = answer !== null;

  return (
    <div className="questions">
      <p>{question?.question}</p>
      <div className="buttons">
        {question?.options.map((option, index) => (
          <button
            key={option}
            className={`option ${
              hasAnswer
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            } ${index === answer ? "move-element" : ""}`}
            disabled={hasAnswer}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
function Footer({
  index,
  questions,
  dispatch,
  answer,
  secondRemaining,
  children,
}) {
  const hasAnswer = answer !== null;
  // console.log(questions.length);
  // console.log(index + 1 === questions.length);
  // console.log(hasAnswer);
  return (
    <footer>
      {children}
      {hasAnswer ? (
        index + 1 === questions.length ? (
          <button onClick={() => dispatch({ type: "finish" })}>Finish</button>
        ) : (
          <button onClick={() => dispatch({ type: "nextQuestion" })}>
            Next
          </button>
        )
      ) : (
        ""
      )}
    </footer>
  );
}
function Timer({ dispatch, secondRemaining }) {
  let min = Math.floor(secondRemaining / 60);
  let sec = Math.floor(secondRemaining % 60);
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <button>
      {min < 10 && "0"}
      {min}:{sec < 10 && "0"}
      {sec}
    </button>
  );
}
function FinishScreen({ points, sumOfPoints, highScore, dispatch }) {
  const precentage = Math.round((points / sumOfPoints) * 100);
  let emoji;
  if (precentage === 100) emoji = "🥇";
  if (precentage >= 80 && precentage < 100) emoji = "🥳";
  if (precentage >= 50 && precentage < 80) emoji = "🤗";
  if (precentage >= 0 && precentage < 50) emoji = "😑";
  if (precentage === 0) emoji = "🤦‍♂️";
  return (
    <>
      <h3 className="finishScrenn">
        {emoji} you scored {points} out of{sumOfPoints}{" "}
      </h3>
      ;<p className="highestScore">Highest Score is {precentage} %</p>
      <button className="restart" onClick={() => dispatch({ type: "rest" })}>
        Restart
      </button>
    </>
  );
}
