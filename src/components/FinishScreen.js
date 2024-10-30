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

export default FinishScreen;
