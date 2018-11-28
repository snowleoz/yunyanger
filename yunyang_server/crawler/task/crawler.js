const crawler = require('../util/handle');
const pup_params = require('../config/custom');
const AdHandle = require('../util/handle');
(async() => {
  try{
    const {browser,page} = await crawler.initCrawler(pup_params);
    await crawler.start(browser,page,{tabs:1,count:1});
    await crawler.closeCrawler(browser);
  }catch(e){
    console.log(e);
  }
})()