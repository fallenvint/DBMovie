import React, {useState, useEffect, useCallback} from 'react';
import MovieHeader from './Movie/MovieHeader';
import MovieMain from './Movie/MovieMain';
import MovieModal from './Movie/MovieModal';
import Context from './context';

const requestMoviesURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c';
const postfix = '&page=';

const App = () => {
    let [data, setData] = useState({});
    let [page, setPage] = useState(1);
    let [modal, setModal] = useState({
        index: '',
        condition: false
    });
    let [favorites, setFavorites] = useState(localStorage.getItem('fav-movies') ? JSON.parse(localStorage.getItem('fav-movies')) : []);
    let [favOpen, setFavOpen] = useState(false);

    const handleSetPage = useCallback((number) => {
        setPage(number);
    }, []);

    const handleCreateModal = useCallback((id, status) => {
        setModal({
            index: id,
            condition: status
        });
    }, []);

    const handleAddFavorite = useCallback((item) => {
        setFavorites([item].concat(favorites));
    }, [favorites]);

    const handleRemoveFavorite = useCallback((id) => {
        setFavorites(favorites.filter(item => item.id !== id));
    }, [favorites]);

    const handleOpenFav = useCallback(() => {
        setModal({
            index: '',
            condition: false
        });
        setFavOpen(true);
    }, []);

    useEffect(() => {
        localStorage.setItem('fav-movies', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        fetch(requestMoviesURL + postfix + page)
            .then((response) => response.json())
            .then((json) => {
                setData(json)
            });
    }, [page, modal.condition]);

    return (
        <Context.Provider
            value={{data, favorites, handleCreateModal, handleSetPage, handleAddFavorite, handleRemoveFavorite}}>
            <MovieHeader onOpen={handleOpenFav}/>
            {!modal.condition && <MovieMain favOpen={favOpen}/>}
            {modal.condition &&
                <MovieModal data={data} modal={modal.index} favorites={favorites} onCreate={handleCreateModal}
                            onSetPage={handleSetPage}
                            onAdd={handleAddFavorite} onRemove={handleRemoveFavorite}/>}
        </Context.Provider>
    );
}

export default App;
