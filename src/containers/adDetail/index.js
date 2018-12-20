import AddatailUI from '../../view/adDetail';
import {connect} from 'react-redux';
import {getDetailRequest,getModalAction,getDeleteDataAction} from './action/actionCreater';
const mapStateToProps = (state) => {
    return {
        dataSource:state.detail.dataSource,
        modal_visible:state.detail.modal_visible
    } 
}
const mapDispatchToProps = (dispatch) => {
    return {
        getNewsData(id){
            const action = getDetailRequest(id);
            dispatch(action);
        },
        modalSwap(){
            const action = getModalAction();
            dispatch(action);
        },
        goToContact(){
            window.location.href = '/contact';
        },
        deleteDataSource(){
            const action = getDeleteDataAction();
            dispatch(action);
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddatailUI)