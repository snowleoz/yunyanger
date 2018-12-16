import {combineReducers} from 'redux';
import homeReducer from '../containers/home/reducer';
import singlePageReducer from '../containers/adSinglePage/reducer';
import newsListReducer from '../containers/adNews/reducer';
import detailReducer from '../containers/adDetail/reducer';
import listReducer from '../containers/adList/reducer';
export default combineReducers({
    home:homeReducer,
    singlePage:singlePageReducer,
    newsList:newsListReducer,
    detail:detailReducer,
    list:listReducer
})