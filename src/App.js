import React, { Component } from "react";
import "reset-css/reset.css";
import "./App.css";
import queryString from "query-string";
import genrePlaylists from "./genrePlaylists";
import Header from "./frontend/views/Header";
import FetchTracks from './frontend/data/getPlaylistTracks'
import UserData from './frontend/data/getUserData'


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
    let genre = genrePlaylists.find(obj => obj.genre === "rock").playlistId;
    this.setState({accessToken: accessToken});
    if (!accessToken) return;


    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: "Bearer " + accessToken }
    })
      .then(response => response.json())
      .then(playlistData => {
        let playlists = playlistData.items;
        let trackDataPromises = playlists.map(playlist => {
          let responsePromise = fetch(playlist.tracks.href, {
            headers: { Authorization: "Bearer " + accessToken }
          });
          let trackDataPromise = responsePromise.then(response =>
            response.json()
          );
          return trackDataPromise;
        });
        let allTracksDataPromises = Promise.all(trackDataPromises);
        let playlistsPromise = allTracksDataPromises.then(trackDatas => {
          trackDatas.forEach((trackData, i) => {
            playlists[i].trackDatas = trackData.items
              .map(item => item.track)
              .map(trackData => ({
                name: trackData.name,
                duration: trackData.duration_ms / 1000
              }));
          });
          return playlists;
        });
        return playlistsPromise;
      })
      .then(playlists =>
        this.setState({
          playlists: playlists.map(item => {
            return {
              name: item.name,
              //imageUrl: item.images.url,
              songs: item.trackDatas.slice(0, 3)
            };
          })
        })
      );
  }
  render() {
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
      </div>
    );
          }else{
            return <div><Header /></div>
          }
  }
}

export default App;
