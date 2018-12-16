import HomeUI from '../../view/home';
import {connect} from 'react-redux';
import {getHomeDataRequest} from './action/actionCreater';
const mapStateToProps = (state) => {
    return {
        dataSource: state.home.dataSource
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        getHomeData(){
            const action = getHomeDataRequest();
            dispatch(action);
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(HomeUI);