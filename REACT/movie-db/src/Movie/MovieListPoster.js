import React, {useCallback} from 'react';
import noposter from '../img/no-image.png'

const posterUrl = 'https://image.tmdb.org/t/p/w342';

const MovieListPoster = ({movie, index, onCreateModal}) => {
    let handleSetId = useCallback(() => {
        onCreateModal(index, true);
    }, [onCreateModal, index]);

    return (
        <div className="poster" key={movie.id}>
            <div onClick={handleSetId}>
                <img src={!movie.poster_path? noposter : posterUrl + movie.poster_path}
                     alt={movie.title} title={movie.title}/>
            </div>
        </div>
    )
}

export default MovieListPoster;
