import {GET_LIST_DATA,DELETE_STATE_DATA,SET_OLD_PATH} from '../action/types';
const defaultState = {
    dataSource:[],
    old_url_path:'',
    hasNext:false
}
export default (state=defaultState,action) => {
    switch(action.type){
        case GET_LIST_DATA:{
            const newState = JSON.parse(JSON.stringify(state));
            newState.dataSource = newState.dataSource.concat(action.data.data);
            newState.hasNext = action.data.hasNext;
            return newState;
        }
        case DELETE_STATE_DATA:{
            const newState = JSON.parse(JSON.stringify(state));
            newState.dataSource = [];
            return newState;
        }
        case SET_OLD_PATH:{
            const newState = JSON.parse(JSON.stringify(state));
            newState.old_url_path = action.data;
            return newState;
        }
        default:
            return state;
    }
} 