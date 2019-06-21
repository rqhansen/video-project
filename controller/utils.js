const fs =require('fs');
const superagent = require('superagent');
const images = require('images');

/**
 * 下载图片
 * @param {String} url 图片的地址
 * @param {String} prefixUrl 图片中间部分的路径
 */
module.exports.downLoadImg = function (url,prefixUrl){
    if(!url) return;
    if (!url.includes('http')) {
        url = `https://www.piaohua.com${url}`;
    }
    let dt = new Date();
    let preDt = dt.toLocaleDateString().replace(/-/g,'') + dt.getTime();
    let imgName = url.lastIndexOf('.');
    let format = url.slice(imgName,imgName+4);
    let prefixName = `${prefixUrl}${preDt}${format}`;
    return new Promise(async (resolve, reject) => {
        try {
            let stream = fs.createWriteStream(`public/${prefixName}`);
            let req = superagent.get(url);
            req.pipe(stream);
            resolve(prefixName);
        } catch (error) {
            console.log('下载图片报错:' + error);
            resolve();
        }  
    })
}

/**
 * 同步获取某目录下所有文件,返回文件名称的数组
 * @param {String} path 
 */
module.exports.getFileInDirSync = function (path) {
    return fs.readdirSync(path);
}

/**
 * 异步获取文件
 * @param {String} path 文件路径
 */
module.exports.getFileInDir = function(path) {
    return new Promise((resolve,reject) =>{
        fs.readFile(path,(err,files) =>{
            if(err) {
                reject();    
            } else {
                resolve(files);
            }
        })
    })
}

/**
 * 同步删除某目录下文件
 * @param {String} path 文件路径 eg: public/images/movies/detail/20196121560337387826.jpg
 */
module.exports.deleteFileInDirSync = function(path) {
    //判断文件是否存在
    if(!fs.statSync(path)) return;
    // console.log(fs.statSync(path));
    fs.unlinkSync(path);
}

/**
 * 异步删除文件
 * @param {String} path 文件路径
 */
module.exports.deleteFileInDir = function(path) {
    fs.stat(path,(err,info) =>{
        if(err) {
            console.log('文件不存在');
            return;
        }
        fs.unlink(path,err =>{
            if(err) {
                console.log('删除文件失败');
                return;
            }
            console.log('删除成功');
        })
    })
}

/**
 * @param {String} path 文件路径
 */
module.exports.condenseImg = function(path) {
    images(path).save(path,{
        quality:80
    })
}



