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

export default StartScreen;
