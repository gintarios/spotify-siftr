import React, { Component } from "react";
import "./Buttons.css";
class Buttons extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false
    };
  }

  render() {
    return (
      <div className="button-container">
        <div className="button-box">
          <button onClick={() => this.props.onGenerate()}>
            Generate
          </button>
        </div>
        <div className="button-box">
          <button> Add to your playlist </button>
        </div>
      </div>     
    );
  }
}

export default Buttons;
