import React from 'react';
import RouterIndex from './router';
import HeaderUI from './view/header';
import FooterUI from './view/footer';
import './css.js';
const App = () => {
    let isIE = document.all && !window.atob;
    return (
        <div className="app_wrap">
            {
                isIE?
                    <p className="no_support">很抱歉，本站不支持IE9及以下浏览器<br/>请更新您的浏览器或更换其它现代浏览器访问</p>
                    :
                    <div className="app">
                        <HeaderUI/>
                        <RouterIndex/>
                        <FooterUI/>
                    </div>
            }
        </div>
    )
}
export default App;