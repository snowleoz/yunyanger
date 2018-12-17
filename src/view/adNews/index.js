import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { List,Button } from 'antd';
class AdNewsUI extends Component{
    componentDidMount(){
        this.props.getNewsData();
    }
    render(){
        document.title = '深圳领养之家—最新动态';
        let dataSource = this.props.dataSource;
        let is_loading_btn = dataSource.length>0?(dataSource.length/10).toString().indexOf('.')<0:false;
        let loading = dataSource[0]?false:true;
        return (
            <div className="news_list_wrap">
                <List
                    header={
                        <h2>
                            <span>最新动态</span>
                        </h2>
                    }
                    footer={
                        <div className="list_footer">
                            {
                                is_loading_btn
                                ?<Button type="primary">加载更多</Button>
                                :<span>没有更多了</span>
                            }
                        </div>
                    }
                    loading={loading}
                    className="news_list"
                    dataSource={dataSource}
                    renderItem={item => (
                        <List.Item className="list_item">
                            <Link to={`ad_news/${item._id}`}>{item.title}</Link>
                            <span className="news_time">{item.updated_At.split('T')[0]}</span>
                        </List.Item>)}
                />
            </div>
        )
    }
}
export default AdNewsUI;