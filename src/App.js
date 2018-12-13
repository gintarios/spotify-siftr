import React, { Component } from "react";
import "reset-css/reset.css";
import "./App.css";
import queryString from "query-string";
// import genrePlaylists from "./genrePlaylists";
import Header from "./frontend/views/Header";
<<<<<<< HEAD
import FetchTracks from "./frontend/data/getPlaylistTracks";
import UserData from "./frontend/data/getUserData";
import GenresGrid from "./frontend/views/GenresGrid";
import Buttons from "./frontend/views/Buttons";
=======
import FetchTracks from './frontend/data/getPlaylistTracks'
import UserData from './frontend/data/getUserData'
import GenresGrid from "./frontend/views/GenresGrid";

>>>>>>> add genresGrid with OnClickEvent

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ""
    };
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    // let genre = genrePlaylists.find(obj => obj.genre === "rock").playlistId;
    this.setState({ accessToken: accessToken });
    if (!accessToken) return;
  }

  goToSpotify() {
    console.log("XX will redirect");
  }

  render() {
<<<<<<< HEAD
    // let playlistToRender =
    //   this.state.user && this.state.playlists
    //     ? this.state.playlists.filter(playlist => {
    //         let matchesPlaylist = playlist.name
    //           .toLowerCase()
    //           .includes(this.state.filterString.toLowerCase());
    //         let matchesSong = playlist.songs.find(song =>
    //           song.name
    //             .toLowerCase()
    //             .includes(this.state.filterString.toLowerCase())
    //         );
    //         return matchesPlaylist || matchesSong;
    //       })
    //     : [];
    if (this.state.accessToken) {
      return (
        // if user is logged in display the code between ? and : otherwise
        <div className="App">
          <Header />
          <GenresGrid />
          {<UserData acToken={this.state.accessToken} /> ? (
            <div>
              {/* <UserData acToken={this.state.accessToken} /> */}
              <FetchTracks acToken={this.state.accessToken} />
            </div>
          ) : (
            <button
              onClick={() => this.goToSpotify()}
              style={{ padding: "20px", fontSize: "50px", marginTop: "20px" }}
            >
              Sign in with Spotify
            </button>
          )}
          <Buttons />
        </div>
      );
    } else {
      return (
        <div>
          <Header />
        </div>
      );
    }
=======
    let playlistToRender =
      this.state.user && this.state.playlists
        ? this.state.playlists.filter(playlist => {
            let matchesPlaylist = playlist.name
              .toLowerCase()
              .includes(this.state.filterString.toLowerCase());
            let matchesSong = playlist.songs.find(song =>
              song.name
                .toLowerCase()
                .includes(this.state.filterString.toLowerCase())
            );
            return matchesPlaylist || matchesSong;
          })
        : [];
        if(this.state.accessToken){
    return (
      // if user is logged in display the code between ? and : otherwise
    <div className="App">
      <Header />
        {<UserData acToken = {this.state.accessToken}/>? (
          <div>
            <UserData acToken = {this.state.accessToken}/>
            <FetchTracks acToken = {this.state.accessToken} />
          </div>
        ) : (
          <button
            onClick={() => {
              window.location = window.location.href.includes("localhost")
                ? "http://localhost:8888/login"
                : "https://better-playlists-backend.herokuapp.com/login";
            }}
            style={{ padding: "20px", fontSize: "50px", marginTop: "20px" }}
          >
            Sign in with Spotify
          </button>
        )}
      <GenresGrid />
      </div>
    );
          }else{
            return <div><Header /></div>
          }
>>>>>>> add genresGrid with OnClickEvent
  }
}

export default App;
