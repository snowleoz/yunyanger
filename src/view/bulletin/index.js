import React from 'react';
import {Skeleton} from 'antd';
import '../css/bulletin.css';
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
                        <h2>
                            <span>最新动态</span>
                        </h2>
                        <p>{props.ad_news}</p>
                    </div>
                </Skeleton>
                <Skeleton active title loading={loading}>
                    <div>
                        <h2>
                            <span>领养须知</span>
                        </h2>
                        <div className="bulletin_notice_content_wrap">
                            {ad_notice_arr.map((item, index) => {
                                return (
                                    <p key={index} className="bulletin_notice_content">{`${item}；`}</p>
                                )
                            })
}
                        </div>
                    </div>
                </Skeleton>
            </div>
        </div>
    )
}
export default BulletinUI;