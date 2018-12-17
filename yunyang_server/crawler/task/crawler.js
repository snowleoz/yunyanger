const crawler = require('../util/handle');
const pup_params = require('../config/custom');
(async() => {
  try{
    const {browser,page} = await crawler.initCrawler(pup_params);
    await crawler.start(browser,page);
    await crawler.closeCrawler(browser);
  }catch(e){
    console.log(e);
  }
})()