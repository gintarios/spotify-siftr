import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class GetTempo extends Component {

    getTempo(){
        let searchStr = 'eric clapton'
        spotifyApi.getAudioAnalysisForTrack(trackid, fn)
            .then((response) => {
                console.log(`Search for ${searchStr}`, response);
            })
    }
    
    render() {
        return(
        <div>
            <button onClick={() => this.getTempo()}>
                Get Tempo Data
            </button>
        </div>
        // Add rendering of component
        )
    }
}
export default GetTracks;
