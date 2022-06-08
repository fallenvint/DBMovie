import React from 'react';
import MovieList from './MovieList';
import MovieFavorite from './MovieFavorite';

const MovieMain = ({favOpen}) => {
    return (
        <main>
            {favOpen ? <MovieFavorite/> : <MovieList/>}
        </main>
    )
}

export default MovieMain;
