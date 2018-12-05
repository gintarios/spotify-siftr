import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import GetTracks from './data/GetTracks'
import NowPlaying from './data/NowPlaying'
import SearchBox from './views/SearchBox'
import GenresGrid from './views/GenresGrid';

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying() {
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

  getTracks() {
    let searchStr = 'eric clapton'
    spotifyApi.searchTracks(searchStr)
      .then((response) => {
        console.log(`Search for ${searchStr}`, response);
      })
  }

  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888' > Login to Siftr </a>
        <SearchBox />
        <div>
          <NowPlaying />
          <GetTracks />
          <GenresGrid />
        </div>
      </div>
    );
  }
}

export default App;
