import {GET_HOME_DATA} from './types';
import axios from 'axios';
import {request_url} from '../../../config/config';
const _getHomeDataAction = (data) => {
    return {type: GET_HOME_DATA, data}
}
const getHomeDataRequest = () => {
    return (dispath) => {
        let carousel = axios.post(`${request_url}/adlists`, {
            ad_status: false,
            _limit: 5,
            _sort: 'updated_At:asc'
        })
        let bulletin_news = axios.post(`${request_url}/adnews`, {
            _limit: 1,
            _sort: 'updated_At:asc'
        })
        let bulletin_notice = axios.post(`${request_url}/adbulletins`, {title:"领养须知"})
        let ad_card_waitcat = axios.post(`${request_url}/adlists`, {
            ad_status: false,
            _limit: 4,
            ad_type: '猫'
        });
        let ad_card_luckcat = axios.post(`${request_url}/adlists`, {
            ad_status: true,
            _limit: 4,
            ad_type: '猫'
        });
        let ad_card_waitdog = axios.post(`${request_url}/adlists`, {
            ad_status: false,
            _limit: 4,
            ad_type: '狗'
        });
        let ad_card_luckdog = axios.post(`${request_url}/adlists`, {
            ad_status: true,
            _limit: 4,
            ad_type: '狗'
        });
        let data = {
            carousel_data: [],
            news_data: [],
            notice_data: [],
            waitcat_data: [],
            luckcat_data: [],
            waitdog_data: [],
            luckdog_data: []
        }
        let data_keys = Object.keys(data);
        Promise
            .all([
            carousel,
            bulletin_news,
            bulletin_notice,
            ad_card_waitcat,
            ad_card_luckcat,
            ad_card_waitdog,
            ad_card_luckdog
        ])
            .then((res) => {
                res.forEach((item, index) => {
                    data[data_keys[index]] = item.data;
                })
                const action = _getHomeDataAction(data);
                dispath(action);
            })
    }
}
export {getHomeDataRequest}