import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class GetTracks extends Component {

    getPlaylists(){
        let searchStr = 'jazz'
        spotifyApi.searchTracks(searchStr)
            .then((response) => {
                console.log(`Search for ${searchStr}`, response);
            })
    }

    getTracks(){
        let playlistId = '2KSM2x2rFmY4GKWwRm9qRg'
        spotifyApi.getPlaylist(playlistId).then((response) => {
                console.log(`Search for ${playlistId}`, response);
            })
    }
    
    render() {
        return(
        <div>
            <button onClick={() => this.getPlaylists()}>
                Get Playlist Data
            </button>
            <button onClick={() => this.getTracks()}>
                Get Track Data
            </button>
        </div>
        // Add rendering of component
        )
    }
}
export default GetTracks;
