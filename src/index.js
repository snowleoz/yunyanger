import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './app.js';
const supportsHistory = 'pushState' in window.history;
ReactDom.render(
    <BrowserRouter forceRefresh={!supportsHistory}>
        <App/>
    </BrowserRouter>,document.getElementById('root')
);