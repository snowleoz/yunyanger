import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from '../containers/home';
import AdList from '../containers/adList';
import AdSinglePage from '../containers/adSinglePage';
import AdNews from '../containers/adNews';
import Addetail from '../containers/adDetail';
import {Provider} from 'react-redux';
import store from '../store';
function Routes(paths, comps) {
    return (paths.map(item => {
        return (<Route path={item} exact component={comps} key={item}/>)
    }))
}
const RouterIndex = () => {
    const adList = ['/wait_cat', '/wait_dog', '/luck_cat', '/luck_dog'];
    const addetail = ['/wait_cat/:id', '/wait_dog/:id', '/luck_cat/:id', '/luck_dog/:id'];
    const singlePageArticle = ['/ad_notice','/ad_summary','/contact','/ad_news/:id'];
    return (
        <Provider store={store}>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/ad_news" exact component={AdNews}/>
                {Routes(singlePageArticle,AdSinglePage)}
                {Routes(adList, AdList)}
                {Routes(addetail, Addetail)}
            </Switch>
        </Provider>
    )
}
export default RouterIndex;