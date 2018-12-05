import React, { Component } from "react";
import "./App.css";
import SpotifyWebApi from "spotify-web-api-js";
import GetTracks from "./data/GetTracks";
import NowPlaying from "./data/NowPlaying";
import GenresGrid from "./views/GenresGrid";
import Header from "./views/Header";

const spotifyApi = new SpotifyWebApi();

function isEven(number) {
  return number % 2
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return (
   <div className = 'playlist'>
        <h2>{playlist.name}</h2>
        <img src={playlist.imageUrl} alt = ''/>
        <ul>
          {playlist.songs.map(song => 
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      serverData: {},
      filterString: '',
      loggedIn: token ? true : false,
      nowPlaying: { name: "Not Checked", albumArt: "" }
    };
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url
        }
      });
    });
  }

  getTracks() {
    let searchStr = "eric clapton";
    spotifyApi.searchTracks(searchStr).then(response => {
      console.log(`Search for ${searchStr}`, response);
    });
  }

  render() {
    let playlistToRender = 
    this.state.user && 
    this.state.playlists 
      ? this.state.playlists.filter(playlist => {
        let matchesPlaylist = playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase()) 
        let matchesSong = playlist.songs.find(song => song.name.toLowerCase()
          .includes(this.state.filterString.toLowerCase()))
        return matchesPlaylist || matchesSong
      }) : []
    return (
      <div className="App">
        <Header />
        <a href="http://localhost:8888"> Login to Siftr </a>
        <div>
          <NowPlaying />
          <GetTracks />
          <GenresGrid />
        </div>
           : 
          <button onClick={() => {
            window.location = window.location.href.includes('localhost') 
              ? 'http://localhost:8888/login' 
              : 'https://better-playlists-backend.herokuapp.com/login' }
          }
          >Sign in with Spotify</button>
        }
      </div>
    );
  }
}

export default App;