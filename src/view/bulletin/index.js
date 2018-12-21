import React from 'react';
import {NavLink} from 'react-router-dom';
import {Skeleton} from 'antd';
const BulletinUI = (props) => {
    let loading = props.ad_notice.length>0?false:true;
    let ad_notice_arr = props
        .ad_notice
        .split('。')
        .slice(0, 2);
    return (
        <div className="bulletin_wrap">
            <div className="bulletin">
                <Skeleton active title loading={loading}>
                    <div>
                        <NavLink to='/ad_news/5c19d845116e636593c6c0f1'>
                            <h2>
                                <span>最新动态</span>
                            </h2>
                            <p>{props.ad_news}</p>
                        </NavLink>
                    </div>
                </Skeleton>
                <Skeleton active title loading={loading}>
                    <div>
                        <NavLink to='/ad_notice'>
                            <h2>
                                <span>领养须知</span>
                            </h2>
                            <div className="bulletin_notice_content_wrap">
                                <p className="bulletin_notice_content">
                                    {ad_notice_arr.map(item=>(item))}
                                </p>
                            </div>
                        </NavLink>
                    </div>
                </Skeleton>
            </div>
        </div>
    )
}
export default BulletinUI;