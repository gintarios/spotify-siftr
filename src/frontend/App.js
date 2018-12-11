import React, { Component } from "react";
import "./App.css";
import 'reset-css/reset.css';
import queryString from 'query-string';
import genrePlaylists from './genrePlaylists';
import SpotifyWebApi from "spotify-web-api-js";
import Header from "./views/Header";
// import GetTracks from "./data/GetTracks";
import NowPlaying from "./data/NowPlaying";
import GenresGrid from "./views/GenresGrid";

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

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    let genre = genrePlaylists.find(obj => obj.genre === "rock").playlistId;
    if (!accessToken)
      return;
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name,
        bday: data.birthdate,
        location: data.country,
        email: data.email,
        ext: data.external_urls,
        followers: data.followers,
        href: data.href,
        id: data.id,
        images: data.images,
        subscriptions: data.product,
        type:data.type,
        uri: data.uri,
      }
    }))

    // fetch('https://open.spotify.com/user/grahamhewett/playlist/2KSM2x2rFmY4GKWwRm9qRg?si=vbhRnIhfSriNejYfxd1gFQ', {
    //   headers: {'Authorization': 'Bearer ' + accessToken}
    // }).then(response => response.json())
    fetch('https://api.spotify.com/v1/playlists/2ihY1sy2Eask1kLJME0UhG/tracks', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
      .then(ptracks => {
        let pnames = ptracks.items.map((song => song.track.name))
        var randomNames = []
        let limit = 10;
        for(let i = 0; i < limit; i++){
          randomNames.push(pnames[Math.floor(Math.random()*pnames.length)]);
        }
        this.setState({rocktracks: randomNames})
      })
      
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(playlistData => {
      let playlists = playlistData.items
      let trackDataPromises = playlists.map(playlist => {
        let responsePromise = fetch(playlist.tracks.href, {
          headers: {'Authorization': 'Bearer ' + accessToken}
        })
        let trackDataPromise = responsePromise
          .then(response => response.json())
        return trackDataPromise
      })
      let allTracksDataPromises = 
        Promise.all(trackDataPromises)
      let playlistsPromise = allTracksDataPromises.then(trackDatas => {
        trackDatas.forEach((trackData, i) => {
          playlists[i].trackDatas = trackData.items
            .map(item => item.track)
            .map(trackData => ({
              name: trackData.name,
              duration: trackData.duration_ms / 1000
            }))
        })
        return playlists
      })
      return playlistsPromise
    })
    .then(playlists => this.setState({
      playlists: playlists.map(item => {
        return {
          name: item.name,
          //imageUrl: item.images.url, 
          songs: item.trackDatas.slice(0,3)
        }
    })
    }))
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
        <a href="http://localhost:8888"> Login to Spotify </a>
        <NowPlaying />
        {/* <GetTracks /> */}
        <GenresGrid />
        {this.state.user ?
          <div>
            <br/>{this.state.rocktracks}
            <br/>{this.state.user.name}
            <br/>{this.state.user.display_name}
            <br/>{this.state.user.birthdate}
            <br/>{this.state.user.country}
            <br/>{this.state.user.email}
            {/* <br/>{this.state.user.external_urls}
            <br/>{this.state.user.followers} */}
            <br/>{this.state.user.href}
            <br/>{this.state.user.id}
            {/* <br/>{this.state.user.images} */}
            <br/>{this.state.user.product}
            <br/>{this.state.user.type}
            <br/>{this.state.user.uri}
            <h1>{this.state.user.name}'s Playlists
          </h1>
          {/* <PlaylistCounter playlists={playlistToRender}/>
          <HoursCounter playlists={playlistToRender}/>
          <Filter onTextChange={text => {
              this.setState({filterString: text})
            }}/> */}
          {playlistToRender.map((playlist, i) => 
            <Playlist playlist={playlist} index={i} />
          )}
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