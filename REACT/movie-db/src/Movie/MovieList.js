import React, {useContext} from 'react';
import MovieListPoster from "./MovieListPoster";
import MoviePagination from "./MoviePagination";
import Context from "../context";

const MovieList = () => {
    let {data, handleCreateModal, handleSetPage} = useContext(Context);

    if (!!data.results) {
        return (
            <div>
                <div className="page-title">Latest Releases</div>
                <div className="page-content posters">
                    {
                        data.results.map((movie, index) => {
                            return (
                                <MovieListPoster
                                    key={movie.id}
                                    movie={movie}
                                    index={index}
                                    onCreateModal={handleCreateModal}
                                />
                            );
                        })
                    }
                </div>
                <MoviePagination page={data.page} totalPage={data.total_pages} onSetPage={handleSetPage}/>
            </div>
        )
    }
}

export default MovieList;
