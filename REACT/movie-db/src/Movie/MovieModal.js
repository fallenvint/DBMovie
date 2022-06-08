import React, {useCallback, useState, useEffect} from 'react';
import noposter from '../img/no-image.png'
import cn from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';

const posterUrl = 'https://image.tmdb.org/t/p/w342';

const MovieModal = ({data, modal, favorites, onCreate, onSetPage, onAdd, onRemove}) => {
    let date = new Date(data.results[modal].release_date);
    let [favItem, setFavItem] = useState({});

    const handleGoMain = useCallback(() => onCreate('', false), [onCreate]);
    const handleGoNext = useCallback(() => {
        if (modal < 19) {
            setFavItem({
                id: data.results[modal + 1].id,
                title: data.results[modal + 1].original_title,
                overview: data.results[modal + 1].overview,
                poster_path: data.results[modal + 1].poster_path
            });
            onCreate(modal + 1, true);
        } else {
            onSetPage(data.page + 1);
            onCreate(0, true);
        }
    }, [onSetPage, onCreate, data, modal]);
    const handleAddFav = useCallback(() => onAdd(favItem), [onAdd, favItem]);
    const handleRemoveFav = useCallback(() => onRemove(favItem.id), [onRemove, favItem.id]);
    const compare = useCallback((element) => element.id === favItem.id, [favItem.id]);

    useEffect(() => {
        document.title = data.results[modal].title;
        window.location.hash = data.results[modal].title.toLowerCase().replace(/\s/g, '_').replace(':', '');
        setFavItem({
            id: data.results[modal].id,
            title: data.results[modal].title,
            overview: data.results[modal].overview,
            poster_path: data.results[modal].poster_path
        });
    }, [data, modal]);

    return (
        <div className="modal" style={{backgroundImage: `url(${posterUrl + data.results[modal].backdrop_path})`}}>
            <div className="modal-container">
                <div className="modal-nav">
                    <button onClick={() => {
                        handleGoMain();
                        document.title = 'MovieDB';
                        window.location.hash = '';
                    }}>
                        <i><FontAwesomeIcon icon={faChevronLeft}/></i>
                        <span>Back to list</span>
                    </button>
                    <button className={
                        cn({
                            'hide': data.results.length === modal + 1 && data.total_pages === data.page
                        })
                    } onClick={handleGoNext}>
                        <span>Next movie</span>
                        <i><FontAwesomeIcon icon={faChevronRight}/></i>
                    </button>
                </div>
                <div className="modal-movie">
                    <div className="modal-movie_poster">
                        <img
                            src={!data.results[modal].poster_path ? noposter : posterUrl + data.results[modal].poster_path}
                            alt={data.results[modal].title}
                        />
                    </div>
                    <div className="modal-movie_info">
                        <div className="modal-movie_favorite">
                            <button
                                className="button"
                                onClick={favorites.some(compare) ? handleRemoveFav : handleAddFav}>
                                {favorites.some(compare) ? 'Unfavorite' : 'Add to favorite'}
                            </button>
                        </div>
                        <div className="modal-movie_title">
                            {data.results[modal].title}
                            <span>({date.toLocaleDateString('en-Us', {year: 'numeric'})})</span>
                        </div>
                        <div className="modal-movie_rate">
                            <div className="rate_score">Score:<span>{data.results[modal].vote_average}</span></div>
                            <div className="rate_date">Release Date:
                                <span>
                                        {date.toLocaleDateString('en-Us', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                </span>
                            </div>
                        </div>
                        <div className="modal-movie_overview">{data.results[modal].overview}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieModal;
