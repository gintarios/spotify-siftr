// import React, { Component } from 'react';
// import SpotifyWebApi from 'spotify-web-api-js';
// const spotifyApi = new SpotifyWebApi();

// class GetTracks extends Component {

//     getPlaylists(){
//         let searchStr = 'jazz'
//         spotifyApi.searchTracks(searchStr)
//             .then((response) => {
//                 console.log(`Search for ${searchStr}`, response);
//             })
//     }

//     getTracks(){
//         // let playlistId = 2KSM2x2rFmY4GKWwRm9qRg;
//         fetch('https://api.spotify.com/v1/playlists/2KSM2x2rFmY4GKWwRm9qRg/tracks', {
//             headers: {'Authorization': 'Bearer ' + accessToken}
//           }).then(response => response.json())
//             .then(ptracks => {
//               let pnames = ptracks.items.map((song => song.track.name))
//               let randomNames = []
//               let limit = 3;
//               for(let i = 0; i < limit; i++){
//                 randomNames.push(pnames[Math.floor(Math.random()*pnames.length)]);
//               }
//                 console.log(randomNames);
//             })
    
//     render() {
//         return(
//         <div>
//             <button onClick={() => this.getPlaylists()}>
//                 Get Playlist Data
//             </button>
//             <button onClick={() => this.getTracks()}>
//                 Get Track Data
//             </button>
//         </div>
//         // Add rendering of component
//         )
//     }
// }
// export default GetTracks;
