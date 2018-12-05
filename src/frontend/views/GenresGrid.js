import React from 'react';
import Genres from '../data/Genres'
import './genres-grid.css'

const GenresGrid = () => {
    return(
            <div className='genre-container'>
                    {Genres.map((genre) => {
                    return (
                        <div className='genre-item'>
                            <img src={require(`../data/images/${genre.id}.jpg`)} alt ='genre'  />
                        </div>
                    )    
                })}
            </div>
        )
    }

export default GenresGrid;