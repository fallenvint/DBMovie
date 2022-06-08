import React, {useEffect, useState} from 'react';
import cn from 'classnames';

const MoviePagination = ({page, totalPage, onSetPage}) => {
    let [pageObj, setPageObj] = useState({
        a: page,
        b: page + 1,
        c: page + 2,
        d: page + 3,
        e: page + 4
    });

    useEffect(() => {
        if (page >= 4 && page <= totalPage - 3) {
            setPageObj({
                a: page - 2,
                b: page - 1,
                c: page,
                d: page + 1,
                e: page + 2
            });
        } else if (page > totalPage - 4) {
            setPageObj({
                a: totalPage - 4,
                b: totalPage - 3,
                c: totalPage - 2,
                d: totalPage - 1,
                e: totalPage
            });
        } else {
            setPageObj({
                a: 1,
                b: 2,
                c: 3,
                d: 4,
                e: 5
            });
        }
    }, [page, totalPage]);

    return (
        <div className="page-pagination">
            <button className={cn('page', {'hide': page === 1})} onClick={() => onSetPage(1)}>
                first
            </button>
            <button className={cn('page separator', {'hide': page === 1})} onClick={() => onSetPage(page - 1)}>
                prev
            </button>
            <span className={cn('separator', {'hide': page < 4})}>...</span>
            {
                Object.keys(pageObj).map((key, index) => {
                    return (
                        <button
                            className={
                                cn('page', {
                                    'current': pageObj[key] === page
                                })
                            }
                            onClick={() => onSetPage(pageObj[key])}
                            key={index}
                        >
                            {pageObj[key]}
                        </button>
                    )
                })
            }
            <span className={cn('separator', {'hide': page > totalPage - 3})}>...</span>
            <button className={cn('page separator', {'hide': page === totalPage})} onClick={() => onSetPage(page + 1)}>
                next
            </button>
            <button className={cn('page', {'hide': page === totalPage})} onClick={() => onSetPage(totalPage)}>
                last
            </button>
        </div>
    )
}

export default MoviePagination;
