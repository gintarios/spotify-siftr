import React, { Component } from 'react';


function msConvert(time) {
  return `${Math.floor(time / 60000)} : ${Math.round(time % 60000 / 1000)}`
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
          song.track.duration_ms,
          song.track.popularity,
          song.track.href
        ]);
        let randomNames = [];
        let limit = 10;
        for (let i = 0; i < limit; i++) {
                var randomNumber = Math.floor(Math.random() * pnames.length - 1)
                randomNames.push(pnames[randomNumber]);
              }
        this.setState({rockTracks: randomNames});
      });
  }
  render() {
    if (this.state.rockTracks.length === 0) {
      return (
        <div>loading..</div>
      )
    } else {
      return (
        <div> {
          this.state.rockTracks.map(track => {
            return (
              <div className="trackDeets">
                <div className="trackName">
                  {track[0]}
                </div>
                <div className="trackName">
                  {msConvert(track[1])}
                </div>
                <div className="trackName">
                  {track[2]}
                </div>
                </div>
            )
          })
        }</div>
      );
    }
  }
}