import {GET_LIST_DATA,DELETE_STATE_DATA,SET_OLD_PATH} from './types';
import axios from 'axios';
import {request_url} from '../../../config/config';
const _getListAction = (data)=>{
    return {
        type:GET_LIST_DATA,
        data
    }
}
const getDeleteStateAction = ()=>{
    return {
        type:DELETE_STATE_DATA
    }
}
const setOldUrlPathAction = (data)=>{
    return {
        type:SET_OLD_PATH,
        data
    }
}
const getListDataRequest = (pages=0,params={})=>{
    return (dispatch)=>{
        axios.post(`${request_url}/adlists`,{
            _limit:10,
            _start:10*pages,
            ...params
        }).then((res)=>{
            const data = res.data;
            const hasNext = data.length == 10;
            const action = _getListAction({data,hasNext})
            dispatch(action);
        })
    }
}
export {getListDataRequest,getDeleteStateAction,setOldUrlPathAction}