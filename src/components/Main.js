import React, { Component } from "react";
import ScoreCard from "./ScoreCard";
import "./styles/Main.css";
export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      time: 0,
      targetText: "",
      inputText: "",
      quotes: []
    };
  }

  componentDidMount() {
    fetch("https://api.myjson.com/bins/18o5yk")
      .then(res => res.json())
      .then(data => {
        this.setState({
          quotes: data
        });
      });
  }

  startTimer = () => {
    this.timer = setInterval(
      () => this.setState(prevState => ({ time: prevState.time + 1 })),
      1000
    );
  };

  stopTimer = () => {
    clearInterval(this.timer);
  };

  onChange = feild => {
    this.setState({
      [feild.target.name]: feild.target.value
    });

    if (this.state.targetText === this.state.inputText) {
      this.stopTimer();
      this.setState({
        completed: 1
      });
    }
  };

  newGame = feild => {
    this.stopTimer();
    this.setState({
      time: 0
    });
    feild.preventDefault();
    const randNum = Math.floor(Math.random() * this.state.quotes.length);
    let randQuote = this.state.quotes[randNum].body;
    randQuote = randQuote.trim();
    this.setState({
      targetText: randQuote,
      inputText: "",
      completed: 0
    });
    this.startTimer();
  };

  render() {
    let strLength = this.state.targetText.split(" ").length;
    return (
      <div>
        <div className="div1">
          {this.state.targetText === "" ? (
            <p className="targetText">
              Click on start or press enter to begin!
            </p>
          ) : (
            <p className="targetText">{this.state.targetText}</p>
          )}
        </div>

        <div className="typeForm">
          <form>
            <input
              type="text"
              placeholder="Start typing here..."
              name="inputText"
              autoComplete="off"
              value={this.state.inputText}
              onChange={this.onChange}
              onKeyPress={e => {
                if (e.key === "Enter") e.preventDefault();
              }}
            />
            <br />
            <button onClick={this.newGame}>Start</button>
          </form>
        </div>

        <div>
          <p className="timer">Time : {this.state.time}</p>

          {this.state.completed ? (
            <ScoreCard length={strLength} time={this.state.time} />
          ) : (
            <ScoreCard Help={1} />
          )}
        </div>
      </div>
    );
  }
}
