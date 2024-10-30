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
export default Questions;
