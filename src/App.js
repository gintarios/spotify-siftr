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
    return this.state.randomisedTracks ? CreatePLaylist(accessToken, this.state.randomisedTracks) :
    <div>Loading .....</div>
  }

  goToSpotify() {
    console.log("XX will redirect");
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
