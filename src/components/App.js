import React, { Component } from "react";
import Header from "./Header";
import Main from "./Main";
import "./styles/Header.css";
export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}
