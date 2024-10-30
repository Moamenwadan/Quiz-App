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
export default Progress;
