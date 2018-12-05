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

export default SearchBox;

