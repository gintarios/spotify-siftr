export default function fetTracksUtil(token) {
    return fetch(
      "https://api.spotify.com/v1/playlists/2ihY1sy2Eask1kLJME0UhG/tracks",
      {
        headers: { Authorization: "Bearer " + token }
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
        return randomNames;
      });
  }