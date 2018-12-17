import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../store';
import Loadable from 'react-loadable';
const dynamicComps = {
    Home:Loadable({
        loader:()=>import('../containers/home'),
        loading:()=>null
    }),
    AdList:Loadable({
        loader:()=>import('../containers/adList'),
        loading:()=>null
    }),
    AdSinglePage:Loadable({
        loader:()=>import('../containers/adSinglePage'),
        loading:()=>null
    }),
    AdNews:Loadable({
        loader:()=>import('../containers/adNews'),
        loading:()=>null
    }),
    Addetail:Loadable({
        loader:()=>import('../containers/adDetail'),
        loading:()=>null
    }),
}
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
                <Route path="/" exact component={dynamicComps.Home}/>
                <Route path="/ad_news" exact component={dynamicComps.AdNews}/>
                {Routes(singlePageArticle,dynamicComps.AdSinglePage)}
                {Routes(adList, dynamicComps.AdList)}
                {Routes(addetail, dynamicComps.Addetail)}
            </Switch>
        </Provider>
    )
}
export default RouterIndex;