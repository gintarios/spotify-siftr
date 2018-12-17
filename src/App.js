import React, { Component } from "react";
import "reset-css/reset.css";
import "./App.css";
import queryString from "query-string";
// import genrePlaylists from "./genrePlaylists";
import Header from "./frontend/views/Header";
import FetchTracks from './frontend/data/FetchTracks'
import UserData from './frontend/data/getUserData'
import GenresGrid from "./frontend/views/GenresGrid";
import Buttons from "./frontend/views/Buttons";
import fetTracksUtil from "./frontend/data/fetchTracksUtil";

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ""
    };
  }

  componentDidMount() {
    this.getTracks();
  }

  getTracks() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    // let genre = genrePlaylists.find(obj => obj.genre === "rock").playlistId;
    if (!accessToken) return;
    fetTracksUtil(accessToken).then(randomNames => {
      this.setState({
        randomisedTracks: randomNames,
        accessToken
      })
    })
  }

  goToSpotify() {
    console.log("XX will redirect");
  }

  render() {
    if (this.state.accessToken) {
      return (
        // if user is logged in display the code between ? and : otherwise
        <div className="App">
          {/* <Header /> needs to be re thought*/}
          <GenresGrid />
          {<UserData acToken={this.state.accessToken} /> ? (
            <div>
              <FetchTracks tracks={this.state.randomisedTracks} />
            </div>
          ) : (
            <button
              onClick={() => this.goToSpotify()}
              style={{ padding: "20px", fontSize: "50px", marginTop: "20px" }}
            >
              Sign in with Spotify
            </button>
          )}
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
