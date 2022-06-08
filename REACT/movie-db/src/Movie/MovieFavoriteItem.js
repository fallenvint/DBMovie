import React, {useCallback} from "react";
import noposter from '../img/no-image.png'

const MovieFavoriteItem = ({movie, onRemove}) => {
    const posterUrl = 'https://image.tmdb.org/t/p/w342';
    const handleUnfavorite = useCallback(() => onRemove(movie.id), [movie, onRemove])

    return (
        <div className="favorite" key={movie.id}>
            <div className="favorite-movie">
                <div className="favorite-movie_poster">
                    <img
                        src={!movie.poster_path ? noposter : posterUrl + movie.poster_path}
                        alt={movie.title} title={movie.title}
                    />
                </div>
                <div className="favorite-movie_info">
                    <div className="favorite-movie_button">
                        <button className="button" onClick={handleUnfavorite}>Unfavorite</button>
                    </div>
                    <div className="favorite-movie_title">{movie.title}</div>
                    <div className="favorite-movie_overview">{movie.overview}</div>
                </div>
            </div>
        </div>
    )
}

export default MovieFavoriteItem;
