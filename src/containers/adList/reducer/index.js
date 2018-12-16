import {GET_LIST_DATA,DELETE_STATE_DATA} from '../action/types';
const defaultState = {
    dataSource:[]
}
export default (state=defaultState,action) => {
    switch(action.type){
        case GET_LIST_DATA:{
            const newState = JSON.parse(JSON.stringify(state));
            newState.dataSource = newState.dataSource.concat(action.data);
            return newState;
        }
        case DELETE_STATE_DATA:{
            const newState = JSON.parse(JSON.stringify(state));
            newState.dataSource = [];
            return newState;
        }
        default:
            return state;
    }
} 