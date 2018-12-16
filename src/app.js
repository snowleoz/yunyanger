import React from 'react';
import RouterIndex from './router';
import HeaderUI from './view/header';
import FooterUI from './view/footer';
import './view/css/app.css';
const App = () => {
    return (
        <div className="app_wrap">
            <div className="app">
                <HeaderUI/>
                <RouterIndex/>
            </div>
            <FooterUI/>
        </div>
    )
}
export default App;