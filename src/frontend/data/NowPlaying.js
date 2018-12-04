import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class NowPlaying extends Component {
    constructor(){
        super();
        this.state = {
          nowPlaying: { name: 'Not Checked', albumArt: '' }
        }
    }

getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url
            }
        });
      })
}

  render() {
    return(
        <div>
        Now Playing: { this.state.nowPlaying.name }
          <img src={this.state.nowPlaying.albumArt} alt = '' style={{ height: 150 }}/>
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        </div>
    )
  }
  //something wrong at the moment

}
export default NowPlaying;
