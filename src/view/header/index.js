import React from 'react';
import {NavLink} from 'react-router-dom';
import MenuUI from '../menu';
import logo from '../../assets/images/logo.png';
import '../css/header.css';
const HeaderUI = (props) => {
    return (
        <header>
            <div className="header_wrap">
                <div className="logo">
                    <h1>领养之家</h1>
                    <NavLink to="/"><img src={logo}/></NavLink>
                </div>
                <div className="menu">
                    <MenuUI mode="horizontal" className="nav_menu"/>
                </div>
            </div>
        </header>
    )
}
export default HeaderUI;