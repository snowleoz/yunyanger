import {GET_LIST_DATA,DELETE_STATE_DATA} from './types';
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
const getListDataRequest = (pages=0,params={})=>{
    return (dispatch)=>{
        axios.post(`${request_url}/adlists`,{
            _limit:10,
            _start:10*pages,
            ...params
        }).then((res)=>{
            const data = res.data;
            const action = _getListAction(data)
            dispatch(action);
        })
    }
}
export {getListDataRequest,getDeleteStateAction}