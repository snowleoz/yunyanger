import React,{Component} from 'react';
import { Carousel,Button,Modal} from 'antd';
import AdSideUI from '../adSide';
import '../css/addetail.css';
class AddatailUI extends Component{
    componentDidMount(){
        this.first_load = true;
        this.data_loading = false;
        this.props.getNewsData(this.props.match.params.id);
    }
    shouldComponentUpdate(nextProps){
        if(this.props.modal_visible !== nextProps.modal_visible){
            return true;
        }
        if(this.first_load || this.data_loading){
            return true;
        }else{
            return this.props.match.params.id !== nextProps.match.params.id;
        }
    }
    componentWillUpdate(nextProps){
        if(this.first_load || this.data_loading){
            this.first_load = false;
            this.data_loading = false;
        }else{
            this.props.getNewsData(nextProps.match.params.id);
            this.data_loading = true;
        }
    }
    render(){
        let dataSource = this.props.dataSource;
        let data = dataSource.data?dataSource.data:{};
        let side_data = dataSource.side_data?dataSource.side_data:[];
        let desc = data.detail_text?data.detail_text.split(','):[];
        let carousel_img = data.big_pic_src?data.big_pic_src.split(','):[];
        return (
            <div className="detail_wrap">
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
                            <Button type="primary" className="detail_ad_btn" onClick={this.props.modalSwap}>我要领养</Button>
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
}
export default AddatailUI;