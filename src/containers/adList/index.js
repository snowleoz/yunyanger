import AdListUI from '../../view/adList';
import {connect} from 'react-redux';
import {getListDataRequest,getDeleteStateAction} from './action/actionCreater';
const mapStateToProps = (state) => {
    return {
        dataSource:state.list.dataSource
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getListDate(pages=0,params={}){
            const action = getListDataRequest(pages,params);
            dispatch(action)
        },
        unmountDeleteData(){
            const action = getDeleteStateAction();
            dispatch(action);
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AdListUI)