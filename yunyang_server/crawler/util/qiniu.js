const qiniu = require("qiniu");
const config = require('../config/qiniu');
const accessKey = config.accessKey;
const secretKey = config.secretKey;
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
let quniu_config = new qiniu.conf.Config();
let bucketManager = new qiniu.rs.BucketManager(mac, quniu_config);
function uploadToQiniu(resUrl,bucket,key){
  return new Promise((resolve,reject)=>{
    bucketManager.fetch(resUrl, bucket, key, function(err, respBody, respInfo) {
      if (err) {
        reject(err);
      } else {
        if (respInfo.statusCode == 200) {
          resolve(respBody.key);
        } else {
          reject(respInfo);
        }
      }
    });
  })
}
module.exports.uploadToQiniu = uploadToQiniu;