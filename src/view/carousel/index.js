import React from 'react';
import {Card} from 'antd';
const {Meta} = Card;
import {NavLink} from 'react-router-dom';
import {Carousel} from 'antd';
import '../css/carousel.css';
const CarouselUI = (props) => {
    const ad_url = {
        'cat':'wait_cat',
        'dog':'wait_dog'
    }
    let loading = props.carouselData.length>0?false:true;
    return (
        <div className="carousel_wrap">
            <Carousel {...props}>
                {props
                    .carouselData
                    .map((item) => {
                        let type = item.ad_type=='猫'?'cat':'dog';
                        let url = `/${ad_url[type]}/${item.map_addetail_id}`;
                        return ( 
                            <NavLink to={url} key={item.id} >
                                <Card
                                    loading={loading}
                                    className="carousel_item"
                                    cover={ < img alt="宠物领养" title={item.name} src={item.carousel_cover} />
                                }> 
                                    <Meta 
                                        title={<span className="carousel_title">{item.name}</span>} 
                                        description={
                                            <div className="carousel_desc">
                                                <p>
                                                    <span>性别：</span>
                                                    <span>{item.sex}</span>
                                                </p>
                                                <p>
                                                    <span>年龄：</span>
                                                    <span>{item.age}</span>
                                                </p>
                                                <p>
                                                    <span>领养状态：</span>
                                                    <span>{item.ad_status?'已领养':'待领养'}</span>
                                                </p>
                                            </div>
                                    }/> 
                                </Card>
                            </NavLink>
                        )
                })}
            </Carousel>
        </div>
    )
}
export default CarouselUI;