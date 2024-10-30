import { useEffect, useReducer } from "react";

export default function App() {
  return (
    <div className="app">
      <Header>{/* <Ready /> */}</Header>
      <Main>
        {/* <Loader /> */}
        {/* {/* <Error /> */}
        {/* <StartScreen /> */}
        <>
          <Progress />
          <Questions />
          <Footer />
        </>
        {/* <FinishScreen /> */}
      </Main>
    </div>
  );
}
function Header({ children }) {
  return (
    <header className="header">
      <h1>The React Quiz</h1>
      {children}
    </header>
  );
}

function Ready() {
  return (
    <div className="ready">
      <h3>welcome to the React Quiz </h3>
      <p>15 Questions to test your React</p>
    </div>
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

function StartScreen() {
  return (
    <div className="startscreen">
      <button>let's Start</button>
    </div>
  );
}
function Progress() {
  return (
    <div className="gauge">
      <progress value={1} max={15}></progress>
      <div className="paragraphs">
        <p className="paragraphOne">Questions 1/15</p>
        <p className="paragraphTwo">Questions 1/</p>
      </div>
    </div>
  );
}

function Questions() {
  return (
    <div className="questions">
      <p>what is React frameWork</p>
      <div className="buttons">
        <button className="option">angular</button>
        <button className="option">vue</button>
        <button className="option">React</button>
        <button className="option">bootstrap</button>
      </div>
    </div>
  );
}
function Footer() {
  return (
    <footer>
      <button>7:15</button>
      <button>Next</button>
    </footer>
  );
}

function FinishScreen() {
  return (
    <>
      <p className="finishScrenn">bhghjgjhghjgjhgjhgjhghjgjhg</p>;
      <p className="highestScore">Highest Score is 95%</p>
      <button className="restart">Restart</button>
    </>
  );
}
