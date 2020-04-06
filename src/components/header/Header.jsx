import React from 'react';
import logo from "../../resources/logo.svg";
import s from "./Header.module.css";

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.header__img} >
                <img src={logo}/>
            </div>
            <div className={s.header__title} >
                <h2>TasksApp</h2>
            </div>
        </header>
    )
};

export default Header;