import AdNoticeUI from '../../view/adSinglePage';
import {getNoticeDataRequest,getSummaryDataRequest,getContactDataRequest,getNewsDataRequest} from './action/actionCreater';
import {connect} from 'react-redux';
const mapStateToProps = (state)=>{
    return {
        dataSource:state.singlePage.dataSource
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        getNoticeData(){
            const action = getNoticeDataRequest();
            dispatch(action);
        },
        getSummaryData(){
            const action = getSummaryDataRequest();
            dispatch(action);
        },
        getContactData(){
            const action = getContactDataRequest();
            dispatch(action);
        },
        getNewsData(id){
            const action = getNewsDataRequest(id);
            dispatch(action);
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AdNoticeUI);