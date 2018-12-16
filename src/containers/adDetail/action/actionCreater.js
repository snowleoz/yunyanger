import {GET_DETAIL_DATA,CHANGE_MODAL_VISIBLE} from './types';
import axios from 'axios';
import {request_url} from '../../../config/config';
const _getDetailAction = (data)=>{
    return {
        type:GET_DETAIL_DATA,
        data
    }
}
const getDetailRequest = (id)=>{
    return (dispatch)=>{
        let data = {
            data: axios.post(`${request_url}/addetails/${id}`),
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
                const action = _getDetailAction(data);
                dispatch(action);
            })
    }
}
const getModalAction = ()=>{
    return {
        type:CHANGE_MODAL_VISIBLE
    }
}
export {getDetailRequest,getModalAction}