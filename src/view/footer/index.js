import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import '../css/footer.css';
const FooterUI = () => {
    return (
        <footer className="footer-wrap">
            <div className="footer">
                <div className="footer_text">
                    <p>
                        <span>版权所有：</span>
                        <span>深圳市宠物领养之家（本站所有数据均来自深圳领养之家网站）</span>
                    </p>
                    <p>
                        <span>地址：</span>
                        <span>深圳市南山区龙辉花园小区107商铺。(地铁7号线珠光站B出口)</span>
                    </p>
                    <p>
                        <span>工作时间：</span>
                        <span>周一至周日 早上9:00-12:00 下午1:30-6:00</span>
                    </p>
                    <p>
                        <span>联系电话：</span>
                        <span>尹先生：137 5113 9844 | 王先生：137 9449 7660</span>
                    </p>
                    <p>
                        <span>关于本站：</span>
                        <span>本站所有数据均采集自深圳领养之家网站，仅做展示示例所用，一切行为、信息均与深圳领养之家无关</span>
                    </p>
                </div>
                <NavLink to='/'>
                    <img src={logo} title="领养之家" className="footer_logo"/>
                </NavLink>
            </div>
        </footer>
    )
}
export default FooterUI;