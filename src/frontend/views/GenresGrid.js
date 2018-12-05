import React from 'react';
import Genres from '../data/Genres'



const GenresGrid = () => {
    return(
        <div>
            <div className='genre-container'>
                {Genres.map((genre) => {
                    return (
                        <img src={require(`../data/images/rock.jpg`)} alt ='genre'  />
                    )    
                })}
            </div>
        </div>
        )
    }

export default GenresGrid;