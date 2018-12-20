import React from 'react'

export default function createPlaylist(token, tracks) {
    let trackUris = tracks.map(track => track[5])
    return (
        <div className="button-box">
          <button onClick = {() => getUserId(token, trackUris) }> Add to your playlist </button>
        </div>
    )
}
function getUserId(token, trackUris){
    return fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + token }
    })
      .then(response => response.json())
      .then(data => createNewPlaylist(token, trackUris, data.id))
}

function createNewPlaylist(token, trackUris, user) {
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
        .then(newPlaylist => fillPlaylist(token , trackUris, newPlaylist.id))
}
   
function fillPlaylist(token, trackUris, playlistId) {
    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks,`,
    {
        headers: { Authorization: "Bearer " + token },
        method: "POST",
        body: {"uris": trackUris}
    })
}

