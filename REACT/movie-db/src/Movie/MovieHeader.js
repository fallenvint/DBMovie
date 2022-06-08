import React, {useState} from "react";
import cn from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCirclePlay, faStar} from '@fortawesome/free-regular-svg-icons';
import {faStar as farStar} from '@fortawesome/free-solid-svg-icons';

const handleGoMainPage = () => {
    window.location.href = window.location.href.split('#')[0];
};

const MovieHelper = ({onOpen}) => {
    let [focus, setFocus] = useState(true);

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
                            'active': !focus
                        })
                    }
                    onClick={() => {
                        onOpen();
                        setFocus(false);
                    }}
                >
                    <span>My favorite</span>
                    <i><FontAwesomeIcon icon={focus ? faStar : farStar}/></i>
                </div>
            </div>
        </header>
    )
}

export default MovieHelper;
