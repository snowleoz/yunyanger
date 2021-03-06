import React,{Component} from 'react';
import { Spin } from 'antd';
import AdSideUI from '../adSide'; 
class AdSinglePageUI extends Component{
    constructor(props){
        super(props);
        this.title = {
            'ad_notice':'领养须知',
            'ad_summary':'简介',
            'contact':'联系我们',
            'ad_news':'最新动态'
        }
        this.data_req = {
            'ad_notice':props.getNoticeData,
            'ad_summary':props.getSummaryData,
            'contact':props.getContactData,
            'ad_news':props.getNewsData
        }
        this.match_link = props.match.path.split('/')[1];
        this.id = props.match.params.id;
        this.loading = true;
    }
    componentDidMount(){
        let req_data = this.data_req[this.match_link];
        this.id?req_data(this.id):req_data();
    }
    render(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.title = `深圳领养之家—${this.title[this.match_link]}`
        let dataSource = this.props.dataSource;
        this.loading = !Object.keys(dataSource).length>0;
        let data = dataSource.data?(dataSource.data[0]?dataSource.data[0]:dataSource.data):{}
        let title = data.title?data.title:'';
        let content = data.content?data.content.split('。'):[];
        content.pop();
        let side_data = dataSource.side_data?dataSource.side_data:[];
        return (
                this.loading?(
                    <div className="ad_single_page_loding">
                        <Spin size="large"/>
                    </div>
                ):(
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
                )
        )
    }
}
export default AdSinglePageUI;