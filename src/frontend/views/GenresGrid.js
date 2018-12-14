import React from "react";
import Genres from "./Genres";
import "./genres-grid.css";

function setGenreSearch(genre) {
  return console.log(`q=genre:%22${genre}%22&type=tracks&limit=100&offset=20`);
}

const GenresGrid = () => {
  return (
    <div className = "section-genresGrid">
      <h1> Looking for music ? </h1>
      <div className="genre-container">
        {Genres.map(genre => {
          return (
            <div
              className="genre-item"
              onClick={() => setGenreSearch(genre.genre.toLowerCase())}
            >
              <img src={require(`./${genre.id}.jpg`)} alt="genre" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GenresGrid;
