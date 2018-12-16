import {GET_NEWS_DATA} from './types';
import axios from 'axios';
import {request_url} from '../../../config/config';
const _getNewsAction = (data)=>{
    return {
        type:GET_NEWS_DATA,
        data
    }
}
const getNewsRequest = (pages=0)=>{
    return (dispatch)=>{
        axios.post(`${request_url}/adnews`,{
            _limit:10,
            _start:pages*10
        }).then((res)=>{
            const data = res.data;
            const action = _getNewsAction(data);
            dispatch(action)
        })
    }
}
export {getNewsRequest}