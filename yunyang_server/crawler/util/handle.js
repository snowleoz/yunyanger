const puppeteer = require('puppeteer');
const axios = require('axios');
const {uploadToQiniu} = require('../util/qiniu');
const {qiniu_domain,server_port} = require('../config/custom');
module.exports = {
    console(info) {
        return new Promise((resolve) => {
            console.log(info);
            resolve({"console": "complated"});
        })
    },
    initCrawler(params = {}) {
        return new Promise(async(resolve, reject) => {
            let reload_count = 5;
            const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
            const page = await browser.newPage();
            await page.setUserAgent(params.userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)' +
                    ' Chrome/69.0.3497.100 Safari/537.36');
            await page.setViewport(params.viewPort || {
                width: 1920,
                height: 1080
            });
            await page.goto(params.url || 'about:blank', {waitUntil: 'networkidle2'}).catch(()=>{
                if(reload_count > 0){
                    page.reload({waitUntil: 'networkidle2'})
                    --reload_count;
                }else{
                    reject('check your network')
                }
            });
            await page.waitFor(params.initWaitFor || 3000);
            resolve({browser, page});
        })
    },
    createPage(browser, params = {}) {
        return new Promise(async(resolve, reject) => {
            let reload_count = 5;
            const page = await browser.newPage();
            await page.setUserAgent(params.userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)' +
                    ' Chrome/69.0.3497.100 Safari/537.36');
            await page.setViewport(params.viewPort || {
                width: 1920,
                height: 1080
            });
            await page.goto(params.url || 'about:blank', {waitUntil: 'networkidle2'}).catch(()=>{
                if(reload_count > 0){
                    page.reload({waitUntil: 'networkidle2'})
                    --reload_count;
                }else{
                    reject('check your network')
                }
            });
            resolve(page);
        })
    },
    start(browser, page,assignPage={tabs:-1,count:0}) {
        return new Promise(async(resolve, reject) => {
            let url_arr = await this.getSourceUrl(page,assignPage.tabs);
            let url_flag = 0;
            let pages = 1;
            while (url_flag < url_arr.length) {
                let list_data = await this.getAdList(page, `${url_arr[url_flag]}/p_${pages}.html`,assignPage.count);
                let hasNext = await this.findNext(page);
                await this.getAdDetailMapList(browser, list_data);
                if (hasNext) {
                    ++pages;
                    continue;
                }
                if (list_data && !hasNext) {
                    pages = 1;
                    url_flag++;
                }
            }
            resolve('crawler complated');
        })
    },
    getSourceUrl(page,index) {
        return new Promise(async(resolve, reject) => {
            const result = await page.evaluate((index) => {
                let urls = null;
                let count = index - 1;
                if(count >= 0){
                    let urls = document.querySelector('.rows.clr').querySelectorAll('a')[count].href;
                    return [urls];
                }else{
                    let url_ele = []
                    .slice
                    .call(document.querySelector('.rows.clr').querySelectorAll('a'));
                    urls = url_ele.map((item) => {
                        return item.href;
                    })
                }
                return urls;
            },index);
            resolve(result);
        })
    },
    findNext(page) {
        return new Promise(async(resolve, reject) => {
            let next = await page.evaluate(() => {
                const next = document.querySelector('.next');
                if (next) {
                    return true;
                } else {
                    return false;
                }
            });
            resolve(next);
        })
    },
    getAdList(page, url,count) {
        return new Promise(async(resolve, reject) => {
            await page.goto(url, {waitUntil: 'networkidle2'});
            await page.waitFor(3000);
            const result = await this.getSingleList(page,count);
            resolve(result);
        })
    },
    getAdDetailMapList(browser, list) {
        return new Promise(async(resolve, reject) => {
            let reload_count = 5;
            const page = await this.createPage(browser);
            let count = 0;
            while (count < list.length) {
                let detail_url = list[count].source_url;
                await page.goto(detail_url, {waitUntil: 'networkidle2'}).catch(()=>{
                    if(reload_count > 0){
                        page.reload({waitUntil: 'networkidle2'})
                        --reload_count;
                    }else{
                        reject('check your network')
                    }
                });
                await page.waitFor(3000);
                let addetail = await page.evaluate(() => {
                    let big_pic_src = [];
                    let big_pic_wrap = []
                        .slice
                        .call(document.querySelectorAll('.bigPic ul li img'));
                    big_pic_wrap.forEach((item) => {
                        big_pic_src.push(item.src)
                    });
                    let small_pic_src = [];
                    let small_pic_wrap = []
                        .slice
                        .call(document.querySelectorAll('.bigPic ul li img'));
                    small_pic_wrap.forEach((item) => {
                        small_pic_src.push(item.src)
                    });
                    let detail_ele = []
                        .slice
                        .call(document.querySelectorAll('.petDetail-cnt p'));
                    let detail_text = [];
                    detail_ele.forEach((item) => {
                        let text = item
                            .innerText
                            .replace(/\s/g, '');
                        if (text.length > 0) {
                            detail_text.push(text);
                        }
                    })
                    return {big_pic_src, small_pic_src, detail_text};
                })
                let addetail_data = await this.updateAdDetail(addetail);
                list[count].map_addetail_id = addetail_data._id;
                let adlist_data = await this.updateAdList(list[count]);
                count++;
            }
            await page.close();
            resolve('success');
        })
    },
    updateAdList(data) {
        return new Promise(async(resolve, reject) => {
            let {
                source_img_src,
                sex,
                name,
                breed,
                age,
                ad_type,
                ad_status,
                map_addetail_id
            } = data;
            let ad_cover = await this.toQiniuLink(source_img_src);
            let adlist = {
                sex,
                name,
                breed,
                age,
                ad_type,
                ad_status,
                ad_cover,
                map_addetail_id
            };
            let res = await this.pushToDatabase('/create/adlists', adlist, 'lists');
            resolve(res);
        })
    },
    updateAdDetail(data) {
        return new Promise(async(resolve, reject) => {
            data.big_pic_src = await this.toQiniuLink(data.big_pic_src, 'big');
            data.small_pic_src = await this.toQiniuLink(data.small_pic_src);
            let res = await this.pushToDatabase('/create/addetails', data, 'details');
            resolve(res);
        })
    },
    _typeOf(value) {
        return Object
            .prototype
            .toString
            .call(value)
            .replace(']', '')
            .split(' ')[1];
    },
    toQiniuLink(urls, name_ext = '') {
        return new Promise(async(resolve, reject) => {
            let type = this._typeOf(urls);
            switch (type) {
                case 'String':
                    {
                        let list_cover_name = urls
                            .split('?')[0]
                            .split('/')
                            .pop();
                        let fileName = await uploadToQiniu(urls, 'lingyangzhijia', list_cover_name);
                        resolve(`${qiniu_domain + escape(fileName)}`)
                    }
                    break;
                case 'Array':
                    {
                        let qiniu_link = [];
                        let list_cover_name = null;
                        if (name_ext.length > 0) {
                            list_cover_name = urls.map((item) => {
                                let temp_name_arr = item
                                    .split('?')[0]
                                    .split('/')
                                    .pop()
                                    .split('.');
                                return `${temp_name_arr[0]}${name_ext}.${temp_name_arr[1]}`;
                            })
                        } else {
                            list_cover_name = urls.map((item) => {
                                return item
                                    .split('?')[0]
                                    .split('/')
                                    .pop()
                            })
                        }
                        for (let i = 0; i < urls.length; i++) {
                            let qiniu_key = await uploadToQiniu(urls[i], 'lingyangzhijia', list_cover_name[i]);
                            qiniu_link.push(`${qiniu_domain + escape(qiniu_key)}`)
                        }
                        resolve(qiniu_link);
                    }
                    break;
                default:
                    {
                        await this.console('params type must be Array or String');
                    }
            }

        })
    },
    getSingleList(page,count) {
        return new Promise(async(resolve, reject) => {
            let result = await page.evaluate((count) => {
                let data = [];
                let ad_type_meta = document
                    .querySelector('.rows.clr')
                    .querySelector('.current')
                    .innerText;
                let ad_type = ad_type_meta[ad_type_meta.search(/猫|狗/g)];
                let ad_status = ad_type_meta.indexOf('待') > 0
                    ? false
                    : true;
                let ele_wrap = document
                    .querySelector('.list ul')
                    .querySelectorAll('li');
                let ele_wrap_length = count>0?count:ele_wrap.length;
                for (let i = 0; i < ele_wrap_length; i++) {
                    let ele = ele_wrap[i];
                    let source_url = ele
                        .querySelector('a')
                        .href;
                    let source_img_src = ele
                        .querySelector('a img')
                        .src;
                    if (source_img_src.indexOf('pic') < 0) {
                        continue;
                    }
                    let info = ele.querySelector('.txt');
                    let meta = info
                        .querySelector('.name')
                        .innerText;
                    let sex = meta[meta.lastIndexOf('母') > 0
                            ? meta.lastIndexOf('母')
                            : meta.lastIndexOf('公')];
                    let name = meta
                        .slice(0, meta.lastIndexOf(sex))
                        .replace(/\s/g, '');
                    let breed = meta.slice(meta.lastIndexOf(sex) + 1).replace(/\s/g, '');
                    let age = info
                        .querySelector('.years')
                        .innerText
                        .split('：')[1]
                        .replace(/\s/g, '');
                    data.push({
                        source_url,
                        source_img_src,
                        sex,
                        name,
                        breed,
                        age,
                        ad_type,
                        ad_status
                    });
                }
                return data;
            },count);
            resolve(result);
        })
    },
    pushToDatabase(query, data, type) {
        return new Promise((resolve, reject) => {
            switch (type) {
                case 'lists':
                    {
                        axios
                            .post(`http://127.0.0.1:${server_port}${query}`, data)
                            .then((res) => {
                                resolve(res.data);
                            })
                    }
                    break;
                case 'details':
                    {
                        axios
                            .post(`http://127.0.0.1:${server_port}${query}`, data)
                            .then((res) => {
                                resolve(res.data);
                            })
                    }
            }
        })
    },
    closeCrawler(browser) {
        return new Promise(async(resolve) => {
            await browser.close();
            resolve('browser closed');
        })
    }
}