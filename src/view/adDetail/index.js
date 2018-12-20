import React,{Component} from 'react';
import { Carousel,Button,Modal,Spin} from 'antd';
import AdSideUI from '../adSide';
class AddatailUI extends Component{
    componentDidMount(){
        this.first_load = true;
        this.data_loading = true;
        this.props.getNewsData(this.props.match.params.id);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    componentWillUpdate(nextProps){
        if(this.props.match.params !== nextProps.match.params){
            this.props.deleteDataSource();
            this.props.getNewsData(nextProps.match.params.id);
        }
    }
    componentWillUnmount(){
        this.props.deleteDataSource();
    }
    render(){
        let dataSource = this.props.dataSource;
        this.data_loading = !Object.keys(dataSource).length>0;
        let data = dataSource.data?dataSource.data:{};
        let side_data = dataSource.side_data?dataSource.side_data:[];
        let desc = data.detail_text?data.detail_text.split(','):[];
        let carousel_img = data.big_pic_src?data.big_pic_src.split(','):[];
        document.title = data.name?`深圳领养之家—${data.name}`:'深圳领养之家—示例站';
        return (
            <div className="detail_wrap">
                {
                    this.data_loading?(
                        <div className="ad_detail_loading_wrap">
                            <Spin size={'large'}/>
                        </div>
                    ):(
                        <div>
                            <div className="detail">
                                <div className="detail_meta">
                                    <div className="detail_carousel_wrap">
                                        <Carousel
                                            autoplay={true}
                                            effect={"fade"}
                                            autoplaySpeed={3000}
                                            lazyLoad='ondemand'
                                            className="detail_carousel"
                                        >
                                            {
                                                carousel_img.map((item,index)=>{
                                                    return (
                                                        <img src={item} key={index} title={data.name} alt="领养之家"/>
                                                    )
                                                })
                                            }
                                        </Carousel>
                                    </div>
                                    <div className="detail_info">
                                        <p>
                                            <span>名字：</span>
                                            <span>{data.name}</span>
                                        </p>
                                        <p>
                                            <span>年龄：</span>
                                            <span>{data.age}</span>
                                        </p>
                                        <p>
                                            <span>品种：</span>
                                            <span>{data.breed}</span>
                                        </p>
                                        <p>
                                            <span>性别：</span>
                                            <span>{data.sex}</span>
                                        </p>
                                        <Button type="primary" className="detail_ad_btn" onClick={this.props.modalSwap}>{data.ad_status?(data.ad_status?'已被领养':'我要领养'):''}</Button>
                                        <Modal 
                                            centered={true} 
                                            visible={this.props.modal_visible} 
                                            onCancel={this.props.modalSwap}
                                            onOk={this.props.goToContact}
                                            title={'感谢您选择领养'}
                                            cancelText={'取消'}
                                            okText={'跳转至联系我们？'}>
                                            <p className="modal_text">
                                                本网站所有数据均来自深圳领养之家官网，如果您有领养意愿，可以至本站“联系我们”，里面有深圳领养之家的具体地址及联系方式。
                                            </p>
                                            <p className="modal_text">
                                                也可以点击下方跳转按钮，跳转至“联系我们”。
                                            </p>
                                        </Modal>
                                    </div>
                                </div>
                                <div className="detail_desc">
                                    <h2><span>详细信息</span></h2>
                                    <div className="desc">
                                        {
                                            desc.length>0?desc.map((item,index)=>{
                                                return (
                                                    <p key={index}>{item}</p>   
                                                )
                                            }):<p>暂无信息</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="detail_side">
                                <AdSideUI side_data={side_data}/>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}
export default AddatailUI;