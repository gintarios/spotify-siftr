import React, { Component } from "react";
import "reset-css/reset.css";
import "./App.css";
import queryString from "query-string";
import Header from "./frontend/views/Header";
import FetchTracks from './frontend/data/FetchTracks'
import UserData from './frontend/data/getUserData'
import GenresGrid from "./frontend/views/GenresGrid";
import Buttons from "./frontend/views/Buttons";
import fetchTracksUtil from "./frontend/data/fetchTracksUtil";
import LoggedInHeader from './frontend/views/loggedInHeader'
import Slider from './frontend/views/slider'
import CreatePLaylist from './frontend/features/CreatePlaylist.js'


class App extends Component {

  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: "",
      limit: 20
    };
  }

  componentDidMount() {
    this.getTracks();
  }

  getTracks() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken) return;
    fetchTracksUtil(accessToken, this.state.limit).then(randomNames => {
        this.setState({
        randomisedTracks: randomNames,
        accessToken
      })
    })
  }

  goToSpotify() {
    console.log('XX will redirect');
  }

  CreatePlaylist(token, tracks) {
    let trackUris = tracks.map(track => track[5])
    this.getUserId(token, trackUris)
}
  getUserId(token, trackUris){
    return fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + token }
    })
      .then(response => response.json())
      .then(data => this.createNewPlaylist(token, trackUris, data.id))
}

createNewPlaylist(token, trackUris, user) {
    return fetch(`https://api.spotify.com/v1/users/${user}/playlists`,
    {
        headers: { Authorization: "Bearer " + token },
        method: "POST",
        body: {
            "name": "Siftr Playlist",
            "description": "New Siftr Playlist",
            "public": false
          }
    })
        .then(response => response.json())
        .then(newPlaylist => this.fillPlaylist(token , trackUris, newPlaylist.id))
}
   
fillPlaylist(token, trackUris, playlistId) {
    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks,`,
    {
        headers: { Authorization: "Bearer " + token },
        method: "POST",
        body: {"uris": trackUris}
    })
}

  render() {
    if (this.state.accessToken) {
      return (
        // if user is logged in display the code between ? and : otherwise
        <div className="App">
          <LoggedInHeader />
          <GenresGrid />
          <Slider 
            limit={this.state.limit} 
            onChange={(newLimit => this.setState({ limit: newLimit }))} />
          {<UserData acToken={this.state.accessToken} /> ? (
            <div>
              <FetchTracks tracks={this.state.randomisedTracks} />
            </div>
          ) : (
              <div>
                <button
                onClick={() => this.goToSpotify()}
                style={{ padding: "20px", fontSize: "50px", marginTop: "20px" }}
                >
                  Sign in with Spotify
                </button>

                </div>   

            )}
                <button onClick = {() => this.CreatePlaylist(this.state.accessToken, this.state.randomisedTracks)}> 
                  Add to your playlist </button>
          <Buttons onGenerate={() => this.getTracks()} />
        </div>
      );  
    } else {
      return (
        <div>
          <Header />
        </div>
      );
    }
  }
}

export default App;
