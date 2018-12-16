import React from 'react';
import {Menu} from 'antd';
import {NavLink,withRouter} from 'react-router-dom';
import '../css/menu.css';
const {Item, SubMenu, ItemGroup} = Menu;
const MenuUI = (props) => {
    let {mode,className,location} = props;
    return (
        <Menu mode={mode} className={className} selectedKeys={[location.pathname]}>
            <Item key="/">
                <NavLink to="/">首页</NavLink>
            </Item>
            <SubMenu title={< span > 领养宠物 </span>}>
                <ItemGroup title='待领养'>
                    <Item key="/wait_cat">
                        <NavLink to="/wait_cat">待领养猫咪</NavLink>
                    </Item>
                    <Item key="/wait_dog">
                        <NavLink to="/wait_dog">待领养狗狗</NavLink>
                    </Item>
                </ItemGroup>
                <ItemGroup title='已领养'>
                    <Item key="/luck_cat">
                        <NavLink to="/luck_cat">已领养猫咪</NavLink>
                    </Item>
                    <Item key="/luck_dog">
                        <NavLink to="/luck_dog">已领养狗狗</NavLink>
                    </Item>
                </ItemGroup>
            </SubMenu>
            <Item key="/ad_notice">
                <NavLink to="/ad_notice">领养须知</NavLink>
            </Item>
            <SubMenu title={< span > 关于我们 </span>}>
                <Item key="/ad_summary">
                    <NavLink to="/ad_summary">简介</NavLink>
                </Item>
                <Item key="/ad_news">
                    <NavLink to="/ad_news">最新动态</NavLink>
                </Item>
            </SubMenu>
            <Item key="/contact">
                <NavLink to="/contact">联系我们</NavLink>
            </Item>
        </Menu>
    )
}
export default withRouter((props)=>{
    let {mode,className,location} = props;
    return <MenuUI mode={mode} className={className} location={location}/>
});