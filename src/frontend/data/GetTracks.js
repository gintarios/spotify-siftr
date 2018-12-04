import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class GetTracks extends Component {

    getTracks(){
        let searchStr = 'eric clapton'
        spotifyApi.searchTracks(searchStr)
            .then((response) => {
                console.log(`Search for ${searchStr}`, response);
            })
    }
    
    render() {
        return(
        <div>
            <button onClick={() => this.getTracks()}>
                Get Track Data
            </button>
        </div>
        // Add rendering of component
        )
    }
}
export default GetTracks;
