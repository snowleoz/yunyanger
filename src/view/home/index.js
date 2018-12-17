import React, {Component} from 'react';
import CarouselUI from '../carousel';
import BulletinUI from '../bulletin';
import AdCardUI from '../adCard';
class HomeUI extends Component {
    componentDidMount() {
        this
            .props
            .getHomeData();
    }
    render() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.title = '深圳领养之家—示例站';
        let dataSource = this.props.dataSource;
        let carousel_data = dataSource.carousel_data
            ? dataSource.carousel_data
            : [];
        let ad_news = dataSource.news_data
            ? dataSource.news_data[0].news_content
            : '';
        let ad_notice = dataSource.notice_data
            ? dataSource.notice_data[0].content
            : '';
        let ad_card = [
            dataSource.waitcat_data
                ? dataSource.waitcat_data
                : [],
            dataSource.waitdog_data
                ? dataSource.waitdog_data
                : [],
            dataSource.luckcat_data
                ? dataSource.luckcat_data
                : [],
            dataSource.luckdog_data
                ? dataSource.luckdog_data
                : []
        ];
        return (
            <div>
                <div className="home_first">
                    <CarouselUI
                        autoplay={true}
                        effect={"fade"}
                        autoplaySpeed={3000}
                        lazyLoad='ondemand'
                        className="home_carousel"
                        carouselData={carousel_data}/>
                    <BulletinUI ad_news={ad_news} ad_notice={ad_notice}/>
                </div>
                <AdCardUI ad_card={ad_card}/>
            </div>
        )
    }
}
export default HomeUI;