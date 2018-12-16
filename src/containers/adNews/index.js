import AdNewsUI from '../../view/adNews';
import {connect} from 'react-redux';
import {getNewsRequest} from './action/actionCreater';
const mapStateToProps = (state) => {
    return {
        dataSource:state.newsList.dataSource
    } 
}
const mapDispatchToProps = (dispatch) => {
    return {
        getNewsData(){
            const action = getNewsRequest();
            dispatch(action);
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AdNewsUI)