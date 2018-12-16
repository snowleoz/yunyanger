import React from 'react';
import {Card} from 'antd';
const { Meta } = Card;
import {NavLink} from 'react-router-dom';
const AdCardSingle = (props)=>{
    const ad_url = {
        'w_cat':'wait_cat',
        'w_dog':'wait_dog',
        'l_cat':'luck_cat',
        'l_dog':'luck_dog'
    }
    let ad_prefix = props.data.ad_status?'l_':'w_';
    let type = props.data.ad_type=='猫'?`${ad_prefix}cat`:`${ad_prefix}dog`;
    return (
        <div className={props.className}>
            {
                <NavLink to={`/${ad_url[type]}/${props.data.map_addetail_id}`} key={props.data.id}>
                    <Card
                        hoverable={true}
                        cover={<img title={props.data.name} src={props.data.ad_cover}/>}
                    >
                        <Meta title={props.data.name} description={
                            <div>
                                <p>{`性别：${props.data.sex}`}</p>
                                <p>{`年龄：${props.data.age}`}</p>
                                <p>{`品种：${props.data.breed}`}</p>
                            </div>
                        }/>
                    </Card>
                </NavLink>
            }
        </div>
    )
}
export default AdCardSingle;