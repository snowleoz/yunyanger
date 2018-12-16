import {GET_SINGLE_DATA} from './types';
import axios from 'axios';
import {request_url} from '../../../config/config';
function singlePageRequest(dispatch,title){
    let data = {
        data: axios.post(`${request_url}/adbulletins`, {
            title: title,
            _limit: 1
        }),
        side_data: axios.post(`${request_url}/adlists`, {
            _limit: 2
        })
    }
    let data_keys = Object.keys(data);
    Promise
        .all([data.data,data.side_data])
        .then((res) => {
            res.forEach((item, index) => {
                data[data_keys[index]] = item.data;
            })
            const action = _getSingleAction(data);
            dispatch(action);
        })
}
const _getSingleAction = (data) => {
    return {type: GET_SINGLE_DATA, data}
}
const getNoticeDataRequest = () => {
    return (dispatch) => {
        singlePageRequest(dispatch,'领养须知');
    } 
}
const getSummaryDataRequest = () => {
    return (dispatch) => {
        singlePageRequest(dispatch,'简介');
    } 
}
const getContactDataRequest = () => {
    return (dispatch) => {
        singlePageRequest(dispatch,'联系我们');
    } 
}
const getNewsDataRequest = (id)=>{
    return (dispatch)=>{
        let data = {
            data: axios.post(`${request_url}/adnews/${id}`),
            side_data: axios.post(`${request_url}/adlists`, {
                _limit: 2
            })
        }
        let data_keys = Object.keys(data);
        Promise
            .all([data.data,data.side_data])
            .then((res) => {
                res.forEach((item, index) => {
                    data[data_keys[index]] = item.data;
                })
                const action = _getSingleAction(data);
                dispatch(action);
            })
    }
}
export {getNoticeDataRequest,getSummaryDataRequest,getContactDataRequest,getNewsDataRequest}