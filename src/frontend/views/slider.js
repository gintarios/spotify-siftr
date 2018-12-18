import React, { Component } from "react";
import "./slider.css"

class Slider extends Component {

    render() {
       return (
            <div class="slidecontainer">
            <input 
                type="range" min="10" max="50" className= "slider" id="myRange" 
                value={this.props.limit}
                onChange={(e) => this.props.onChange(e.target.value)}></input>
            <div> Number of Tracks shown: {this.props.limit}</div>
            </div>
        );
    }
}
export default Slider;