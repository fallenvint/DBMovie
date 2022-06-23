import React, {useContext, useEffect} from 'react';
import MovieFavoriteItem from "./MovieFavoriteItem";
import Context from "../context";

const MovieFavorite = () => {
    let {favorites, handleRemoveFavorite} = useContext(Context);

    useEffect(() => {
        document.title = 'My favorites';
    });

    if (!!favorites.length) {
        return (
            <div>
                <div className="page-title">My favorite</div>
                <div className="page-content favorites">
                    {
                        favorites.map((movie, index) => {
                            return (
                                <MovieFavoriteItem
                                    key={movie.id}
                                    movie={movie}
                                    onRemove={handleRemoveFavorite}
                                    index={index}
                                />
                            );
                        })
                    }
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className="page-title">My favorite</div>
                <div className="empty">Favorite movies list is empty!</div>
            </div>
        )
    }

}

export default MovieFavorite;
