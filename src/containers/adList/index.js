import AdListUI from '../../view/adList';
import {connect} from 'react-redux';
import {getListDataRequest,getDeleteStateAction,setOldUrlPathAction,setPageAction,setLoadMoreAction} from './action/actionCreater';
const mapStateToProps = (state) => {
    return {
        dataSource:state.list.dataSource,
        hasNext:state.list.hasNext,
        old_url_path:state.list.old_url_path,
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
        },
        setOldUrlPath(data){
            const action = setOldUrlPathAction(data);
            dispatch(action);
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AdListUI)