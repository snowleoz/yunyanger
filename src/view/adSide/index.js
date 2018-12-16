import React from 'react';
import AdCardSingle from '../adCardSingle';
import '../css/adside.css';
const AdSideUI = (props) => {
    return (
        <div className="ad_sides_wrap">
            <h2><span>有兴趣看看它们吗？</span></h2>
            {
                props.side_data.map((item,index)=>{
                    return <AdCardSingle data={item} key={index} className='ad_sides'/>
                })
            }
        </div>
    )
}
export default AdSideUI;