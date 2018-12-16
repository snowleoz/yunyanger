import React,{Component} from 'react';
import { Skeleton } from 'antd';
import AdSideUI from '../adSide'; 
import '../css/adsinglepage.css'
class AdSinglePageUI extends Component{
    constructor(props){
        super(props);
        this.data_req = {
            'ad_notice':props.getNoticeData,
            'ad_summary':props.getSummaryData,
            'contact':props.getContactData,
            'ad_news':props.getNewsData
        }
        this.match_link = props.match.path.split('/')[1];
        this.id = props.match.params.id;
    }
    componentDidMount(){
        let req_data = this.data_req[this.match_link];
        this.id?req_data(this.id):req_data();
    }
    render(){
        let dataSource = this.props.dataSource;
        let data = dataSource.data?(dataSource.data[0]?dataSource.data[0]:dataSource.data):{}
        let title = data.title?data.title:'';
        let content = data.content?data.content.split('。'):[];
        content.pop();
        let side_data = dataSource.side_data?dataSource.side_data:[];
        let loading = content.length>0?false:true;
        return (
            <Skeleton active loading={loading}>
                <div className="single_article_wrap">
                    <div className="single_page_wrap">
                        <h2><span>{title}</span></h2>
                        <article className="single_page_content">
                            {
                                content.map((item,index)=>{
                                    return (
                                        <p key={index}>{item}；</p>
                                    )
                                })
                            }
                        </article>
                        <div className="single_article_line"></div>
                    </div>
                    <div className="single_page_side_wrap">
                        <AdSideUI side_data={side_data}/>
                    </div>
                </div>
            </Skeleton>
        )
    }
}
export default AdSinglePageUI;