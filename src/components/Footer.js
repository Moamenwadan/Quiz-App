// import Timer from "./Timer";
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
export default Footer;
