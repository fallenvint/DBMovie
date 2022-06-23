import React from "react";
import cn from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCirclePlay, faStar} from '@fortawesome/free-regular-svg-icons';
import {faStar as farStar} from '@fortawesome/free-solid-svg-icons';

const handleGoMainPage = () => {
    window.location.href = window.location.origin;
};

const MovieHelper = ({onOpen, favOpen}) => {
    return (
        <header>
            <div
                className="logo-block"
                onClick={() => handleGoMainPage()}
            >
                <i><FontAwesomeIcon icon={faCirclePlay}/></i>
                <span>Movies</span>
            </div>
            <div className="menu-block">
                <div
                    className={
                        cn('menu-item button', {
                            'active': favOpen
                        })
                    }
                    onClick={() => {
                        window.location.hash = '';
                        window.location.pathname = 'my_favorite';
                        onOpen();
                    }}
                >
                    <span>My favorite</span>
                    <i><FontAwesomeIcon icon={favOpen ? farStar : faStar}/></i>
                </div>
            </div>
        </header>
    )
}

export default MovieHelper;
