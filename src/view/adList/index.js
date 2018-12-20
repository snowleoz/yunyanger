import React, {Component} from 'react';
import {Button,Spin} from 'antd';
import AdCardSingle from '../adCardSingle';
class AdListUI extends Component {
    constructor(props) {
        super(props);
        let title_name = {
            'wait_cat':'待领养猫咪',
            'wait_dog':'待领养狗狗',
            'luck_cat':'已领养猫咪',
            'luck_dog':'已领养狗狗'
        }
        let type_pathname = props
            .match
            .path
            .split('/')[1];
        let type = {
            'wait_cat': {
                ad_type: '猫',
                ad_status: false
            },
            'wait_dog': {
                ad_type: '狗',
                ad_status: false
            },
            'luck_cat': {
                ad_type: '猫',
                ad_status: true
            },
            'luck_dog': {
                ad_type: '狗',
                ad_status: true
            }
        }
        this.title = title_name[type_pathname];
        this.params = type[type_pathname];
        this.loading = true;
    }
    componentDidMount() {
        if(this.props.dataSource.length==0){
            this.page = 0;
            this.props.getListDate(0,this.params)
            this.props.setOldUrlPath(this.props.match.path);
        }
        if(this.props.history.action == 'POP' && this.props.dataSource.length>0){
            if(this.props.old_url_path !== this.props.match.path){
                this.page = 0;
                this.props.unmountDeleteData();
                this.props.getListDate(this.props.page,this.params);
                this.props.setOldUrlPath(this.props.match.path);
            }else{
                this.page = this.props.dataSource.length/10;
            }
        }
        if(this.props.history.action == 'PUSH' && this.props.dataSource.length>0){
            this.page = 0;
            this.props.unmountDeleteData();
            this.props.getListDate(0,this.params);
            this.props.setOldUrlPath(this.props.match.path);
        }
    }
    shouldComponentUpdate(nextProps){
        if(nextProps.dataSource.length>0){
            (nextProps.dataSource.length/10).toString().indexOf('.')<0?++this.page:false;
        }
        return true;
    }
    render() {
        document.title = `深圳领养之家—${this.title}`;
        let data = this.props.dataSource
            ? this.props.dataSource
            : [];
        this.loading = !data.length>0;
        return (
            this.loading?(
                <div className="ad_list_loading">
                    <Spin size={'large'}/>
                </div>
            ):(
                <div className="ad_list_wrap">
                    <ul className="ad_list">
                        {
                            data.map((item) => {
                                return (
                                    <li className="ad_list_item" key={item._id}>
                                        <AdCardSingle data={item}/>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className="list_footer">
                        {
                            this.props.hasNext?(
                                <Button type="primary" onClick={()=>{
                                    this.props.getListDate(this.page,this.params)
                                }}>加载更多</Button>
                            ):(
                                <p>没有更多了...</p>
                            )
                        }
                    </div>
                </div>
            )
        )
    }
}
export default AdListUI;