import React, { Component } from 'react';
import './searchBox.css';

class SearchBox extends Component {

    setSearchStr(){
        let searchStr = 'input text'
    }
render() {
return(
<div>
    <form className="example" action="action_page.php">
    <input type="text" placeholder="Search.." name="search"/>
    <button type="submit">Submit</button>
    </form>
</div>
)}
}

// class Filter extends Component {
//   render() {
//     return (
//       <div style={defaultStyle}>
//         <input type="text" onKeyUp={event => 
//           this.props.onTextChange(event.target.value)}
//           style={{...defaultStyle, 
//             color: 'black', 
//             'font-size': '20px', 
//             padding: '10px'}}/>
//       </div>
//     );
//   }
// }

export default SearchBox;

