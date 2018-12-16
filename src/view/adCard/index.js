import React from 'react';
import {Link} from 'react-router-dom';
import AdCardSingle from '../adCardSingle';
import '../css/adcard.css';
const AdCardUI = (props)=>{
    const titles = {
        wait_cat:'待领养猫咪',
        wait_dog:'待领养狗狗',
        luck_cat:'已领养猫咪',
        luck_dog:'已领养狗狗'
    }
    return (
        <div className="ad_card_wrap">
            {props.ad_card.map((items,index)=>{
                let is_ad = items[0]?(items[0].ad_status==true?'luck':'wait'):'';
                let type = items[0]?(items[0].ad_type=='猫'?'_cat':'_dog'):'';
                let title = titles[`${is_ad}${type}`]?titles[`${is_ad}${type}`]:'';
                let more_link = `${is_ad}${type}`;
                return (
                    <div className="ad_card_items" key={index}>
                        <h2><Link to={more_link}><span>{title}</span></Link><Link to={more_link} className="card_more">更多</Link></h2>
                        <div className="ad_card_item">
                            {
                                items.map((item,index)=>{
                                    return <AdCardSingle data={item} key={`${item.name}${index}`} className="ad_card"/>
                                })
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default AdCardUI;