import React from "react";
export default function ScoreCard(props) {
  return (
    <div className="score">
      {props.showInstructions ? (
        <div>
          <h1>Instructions</h1>
          <p>
            Your task is to type each word in the given sentence as fast as you
            can.
          </p>
        </div>
      ) : (
        <p>
          Time : {props.time} Seconds
          <br />
          Speed : {props.length / (props.time / 60)} Wpm
        </p>
      )}
    </div>
  );
}
