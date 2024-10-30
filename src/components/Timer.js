import { useEffect } from "react";
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
export default Timer;
