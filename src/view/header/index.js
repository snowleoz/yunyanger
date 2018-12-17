import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Icon} from 'antd';
import MenuUI from '../menu';
import logo from '../../assets/images/logo.png';
import '../css/header.css';
class HeaderUI extends Component{
    constructor(props){
        super(props);
        this.menuSwap = this.menuSwap.bind(this);
        this.menu_swap = false;
    }
    menuSwap(){
        if(this.menu_swap){
            document.documentElement.style.position = 'static';
            document.body.style.position = 'static';
            document.documentElement.style.overflow = 'visible';
            document.body.style.overflow = 'visible';
            this.m_menu.className = 'm_menu';
            this.m_mask.className = 'mask';
        }else{
            document.documentElement.style.position = 'fixed';
            document.body.style.position = 'fixed';
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            this.m_menu.className = 'm_menu show_m_menu';
            this.m_mask.className = 'mask show_mask';
        }
        this.menu_swap = !this.menu_swap;
    }
    render(){
        return (
            <header>
                <div className="header_wrap">
                    <div className="logo">
                        <h1>领养之家</h1>
                        <NavLink to="/"><img src={logo}/></NavLink>
                        <Icon type="bars" className="m_menu_icon" width="50px" onClick={this.menuSwap}/>
                    </div>
                    <div className="menu">
                        <MenuUI mode="horizontal" className="nav_menu"/>
                    </div>
                    <div className="m_menu" ref={(m_menu)=>{this.m_menu = m_menu}}>
                        <MenuUI mode="vertical" className="m_nav_menu" onClick={this.menuSwap}/>
                    </div>
                    <div className="mask" ref={(m_mask)=>{this.m_mask = m_mask}} onClick={this.menuSwap}></div>
                </div>
            </header>
        )
    }
}
export default HeaderUI;