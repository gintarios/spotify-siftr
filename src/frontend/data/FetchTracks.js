import React, { Component } from 'react';
import './getPlaylistTracks.css'
import starPop from './StarPop'


function msConvert(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export default class FetchTracks extends Component {
  constructor() {
    super();
    this.state = {
      rockTracks: []
    };
  }
  componentDidMount() {
    fetch(
      "https://api.spotify.com/v1/playlists/2ihY1sy2Eask1kLJME0UhG/tracks",
      {
        headers: { Authorization: "Bearer " + this.props.acToken }
      }
    )
      .then(response => response.json())
      .then(ptracks => {
        let pnames = ptracks.items.map(song =>
          [
            song.track.name,
            song.track.artists[0].name,
            song.track.album.name,
            song.track.duration_ms,
            song.track.popularity
          ]);
        let randomNames = [];
        let limit = 20;
        for (let i = 0; i < limit; i++) {
          var randomNumber = Math.floor(Math.random() * pnames.length - 1)
          randomNames.push(pnames[randomNumber]);
        }
        this.setState({ rockTracks: randomNames });
      });
  }
  render() {
    if (this.state.rockTracks.length === 0) {
      return (
        <div>loading..</div>
      )
    } else {
      return (
        <div className="grandad">
        <div className="bigBoy">
        <div className="parent"> 
        <div className="title">Track name</div>
        <div className="title">Artist</div>
        <div className="title">Album</div>
        <div className="title">Track Length</div>
        <div className="title">Popularity</div>
        </div>
        {
  this.state.rockTracks.map(track => {
    return (
      <div className="trackDeets">
        <div className="trackName">
        {track[0]}
        </div>
        <div className="trackName">
          {(track[1])}
        </div>
        <div className="trackName">
          {track[2]}
        </div>
        <div className="trackName">
          {msConvert(track[3])}
        </div>
        <div className="star1">
          {starPop(track[4])}
        </div>
      </div>
    )
  })
}</div>
</div> 
          

      );
    }
  }
}
