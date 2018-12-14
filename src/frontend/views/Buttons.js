import React, { Component } from "react";
import "./Buttons.css";
import FetchTracks from "../data/FetchTracks";

class Buttons extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      clicked: true
    });
  }

  render() {
    return (
      <div className="button-container">
        <div className="button-box">
          <button onClick={this.handleClick}> Generate </button>
          {this.state.clicked ? <FetchTracks /> : null}
        </div>
        <div className="button-box">
          <button> Add to your playlist </button>
        </div>
      </div>
    );
  }
}

export default Buttons;
