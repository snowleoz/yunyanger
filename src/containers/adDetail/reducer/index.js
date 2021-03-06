import {GET_DETAIL_DATA,CHANGE_MODAL_VISIBLE,DELETE_DATA_SOURCE} from '../action/types';
const defaultState = {
    dataSource:{},
    modal_visible:false
}
export default (state=defaultState,action)=>{
    switch(action.type){
        case GET_DETAIL_DATA:{
            const newState = JSON.parse(JSON.stringify(state));
            newState.dataSource = action.data;
            return newState;
        }
        case CHANGE_MODAL_VISIBLE:{
            const newState = JSON.parse(JSON.stringify(state));
            newState.modal_visible = !state.modal_visible;
            return newState;
        }
        case DELETE_DATA_SOURCE:{
            const newState = JSON.parse(JSON.stringify(state));
            newState.dataSource = {};
            return newState;
        }
        default:{
            return state;
        }
    }
}