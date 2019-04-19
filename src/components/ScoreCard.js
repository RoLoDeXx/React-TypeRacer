import React from "react";
import "./styles/ScoreCard.css";
export default function ScoreCard(props) {
  return (
    <div className="score">
      {props.Help ? (
        <p>
          <h1>Instructions</h1>
          <br />
          Your task is to type each word in the given sentence as fast as you
          can.
        </p>
      ) : (
        <p>
          Time = {props.time} Seconds
          <br />
          Speed = {props.length / (props.time / 60)} Wpm
        </p>
      )}
    </div>
  );
}
