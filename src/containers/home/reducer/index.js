import {GET_HOME_DATA} from '../action/types';
const defaultState = {
    dataSource:{},
}
export default (state = defaultState,action)=>{
    switch(action.type){
        case GET_HOME_DATA:{
            const newState = JSON.parse(JSON.stringify(state));
            newState.dataSource = action.data;
            return newState;
        }
        default:{
            return state;
        }
    }
}