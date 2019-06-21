const cheerio = require('cheerio');
const superagent = require('superagent');
const { query } = require('../database/db');
const { downLoadImg } = require('./utils');
const { webSiteUrl, movieTypes, moviekeys, defaultImgUrl, movieSql } = require('../config/index');
/**
 * superagent 请求第三方网址的数据
 * 
 * @param {string} url 请求的网址
 */
async function superGetData(url) {
    try {
        const data = await superagent.get(url);
        return data;
    } catch (error) {
        console.log(error);
    }
    return
}


/**
 * 设置电影Id
 * @param {string} movieStr 
 */
function setMovieTypeId(movieStr) {
    for (let i = 0, len = movieTypes.length; i < len; i++) {
        if (movieTypes[i][movieStr]) {
            return movieTypes[i][movieStr];
        }
    }
    return;
}

/**
 * 设置电影的其它信息
 * @param {movieObj} movieObj 要添加到的电影对象
 * @param {string} key 标题
 * @param {string} value 名称
 */
function setMovieOtherContent(movieObj, key, value) {
    switch (key) {
        case '译名':
            movieObj.transName = value;
            if (value.includes('片名') || value.includes('年代') || value.includes('类别')) { //片名、年代等从这里取
                let mixins = value.split('◎');
                movieObj.transName = mixins[0].trim();
                for (let i = 1; i < mixins.length; i++) {
                    if (mixins[i].includes('片名')) {
                        movieObj.subPureName = mixins[i].slice(2);
                    } else if (mixins[i].includes('年代')) {
                        movieObj.year = mixins[i].slice(2);
                    } else if (mixins[i].includes('国家') || mixins[i].includes('产地')) {
                        movieObj.country = mixins[i].slice(2);
                    } else if (mixins[i].includes('类别')) {
                        movieObj.types = mixins[i].slice(2);
                    } else if (mixins[i].includes('语言')) {
                        movieObj.language = mixins[i].slice(2);
                    } else if (mixins[i].includes('片长')) {
                        movieObj.filmLength = mixins[i].slice(2);
                    } else if (mixins[i].includes('字幕')) {
                        movieObj.caption = mixins[i].slice(2);
                    } else if (mixins[i].includes('上映日期')) {
                        movieObj.onDate = mixins[i].slice(4);
                    } else if (mixins[i].includes('IMDb评分')) {
                        movieObj.imdbScore = mixins[i].slice(4);
                    } else if (mixins[i].includes('IMDb链接')) {
                        movieObj.imdbLink = mixins[i].slice(4);
                    } else if (mixins[i].includes('文件格式')) {
                        movieObj.format = mixins[i].slice(4);
                    } else if (mixins[i].includes('文件大小')) {
                        movieObj.fileSize = mixins[i].slice(4);
                    } else if (mixins[i].includes('视频尺寸')) {
                        movieObj.videoSize = mixins[i].slice(4);
                    } else if (mixins[i].includes('豆瓣评分')) {
                        movieObj.doubanScore = mixins[i].slice(4);
                    } else if (mixins[i].includes('豆瓣链接')) {
                        movieObj.doubanLink = mixins[i].slice(4);
                    } else if (mixins[i].includes('导演')) {
                        movieObj.director = mixins[i].slice(2);
                    } else if (mixins[i].includes('编剧')) {
                        movieObj.editor = mixins[i].slice(2);
                    } else if (mixins[i].includes('主演')) {
                        movieObj.actor = mixins[i].slice(2);
                    } else if (mixins[i].includes('标签')) {
                        movieObj.label = mixins[i].slice(2);
                    } else if (mixins[i].includes('简介')) {
                        movieObj.shortIntro = mixins[i].slice(2);
                    } else if (mixins[i].includes('获奖')) {
                        movieObj.getAward = mixins[i].slice(2);
                    }
                }
                break;
            }
            break;
        case '片名':
            movieObj.subPureName = value;
            break;
        case '年代':
            movieObj.year = value;
            break;
        case '产地':
        case '国家':
            movieObj.country = value;
            break;
        case '类别':
            movieObj.types = value;
            break;
        case '语言':
            movieObj.language = value;
            break;
        case '片长':
            movieObj.filmLength = value;
            break;
        case '字幕':
            movieObj.caption = value;
            break;
        case '上映日期':
            movieObj.onDate = value;
            break;
        case 'IMDb评分':
            movieObj.imdbScore = value;
            break;
        case 'IMDb链接':
            movieObj.imdbLink = value;
            break;
        case '文件格式':
            movieObj.format = value;
            break;
        case '文件大小':
            movieObj.fileSize = value;
            break;
        case '视频尺寸':
            movieObj.videoSize = value;
            break;
        case '豆瓣评分':
            movieObj.doubanScore = value;
            break;
        case '豆瓣链接':
            movieObj.doubanLink = value;
            break;
        case '导演':
            movieObj.director = value;
            break;
        case '编剧':
            movieObj.editor = value;
            break;
        case '主演':
            movieObj.actor = value;
            break;
        case '标签':
            movieObj.label = value;
            break;
        case '简介':
            movieObj.shortIntro = value;
            break;
        case '获奖':
            movieObj.getAward = value;
            break;
        default:
            break;
    }
}

/**
 * cherrio解析后的单个电影数据 
 */
async function getSingleMovieDetail($) {
    //电影详情部分
    let mDetail = $('.m-details').eq(0);
    let aa = $('.cur a', mDetail).eq(1);
    //电影类型
    let filmType = aa.text();
    //电影名称包括BD高清
    let mText = $('.m-text1', mDetail).eq(0);
    let fileName = $('h1', mText).eq(0).text();
    let pureName = $('.info span', mText).eq(0).text().split('：')[1].trim();
    //发布日期
    let date = $('.info span', mText).eq(1).text().split('：')[1].trim();
    //大图
    let txt = $('.txt', mText).eq(0);
    let imgUrl = $('img', txt).eq(0).attr('src');
    //下载保存图片
    let movieObj = JSON.parse(JSON.stringify(moviekeys));

    //电影Id
    movieObj.typeId = setMovieTypeId(filmType);
    //电影类型名称
    movieObj.typeName = filmType;
    //电影名称和清晰度
    movieObj.fullName = fileName;
    //片名
    movieObj.pureName = pureName;
    //发布日期
    movieObj.pubDate = date;
    //图片
    let imgSrc = await downLoadImg(imgUrl, 'images/movies/detail/'); //本地图片路径
    // let imgSrc = '';
    if (imgSrc) {
        movieObj.detailImgSrc = imgSrc;
    } else {
        movieObj.detailImgSrc = defaultImgUrl;
    }

    //其它信息：从译名开始
    // let divs = $('div', txt);
    let divs = $('div', txt);
    if (!divs.eq(0).text()) { //
        divs = $('p', txt);
    }

    divs.each((i, el) => {
        let text = $(el).text().trim();
        let arrStr = text.split(/\s/);
        //去除div内容为空格的情况,并且标题以@开头
        if (arrStr[0]) {
            if (arrStr[0].includes('◎')) {
                if (!arrStr[1]) {
                    let title, content = '';
                    if (arrStr.length > 3) {
                        if (arrStr[0].includes('IMDb评分')) { //排除掉IMDb评分
                            title = [arrStr[0], arrStr[1]].join('').slice(1);
                            content = text.slice(7).trim();
                        } else if (arrStr[0].includes('文件格式')) {
                            title = [arrStr[0], arrStr[1]].join('').slice(1);
                            content = text.slice(5).trim();
                        } else if (arrStr[0].includes('豆瓣评分')) {
                            title = [arrStr[0], arrStr[1]].join('').slice(1);
                            content = text.slice(5).trim();
                        }
                        else {
                            title = [arrStr[0], arrStr[1], arrStr[2]].join('').slice(1);
                            content = arrStr.slice(3).join('');
                        }
                        //主演
                        if (title === '主演') {
                            for (let j = i + 1; j < divs.length; j++) {
                                let nextContent = $(divs[j]).text().trim();
                                if (nextContent.includes('◎')) {
                                    break;
                                }
                                if (nextContent) {
                                    content = content + '$' + nextContent;
                                }
                            }
                        }
                    } else if (arrStr.length <= 3) {
                        if (arrStr[0].includes('简')) {
                            title = [arrStr[0], arrStr[1], arrStr[2]].join('').slice(1);
                            //找到简介的内容
                            for (let j = i + 1; j < divs.length; j++) {
                                let nextContent = $(divs[j]).text().trim();
                                if (nextContent.includes('◎')) {
                                    break;
                                }
                                if (!content) {
                                    content = nextContent;
                                    continue;
                                }
                                content = content + '$' + nextContent;
                            }
                        } else if (arrStr[0].includes('获奖情况')) {
                            title = [arrStr[0]].join('').slice(1);
                            for (let j = i + 1; j < divs.length; j++) {
                                let nextContent = $(divs[j]).text().trim();
                                if (nextContent) {
                                    content = content + '$' + nextContent;
                                }
                            }
                        }
                        else {
                            title = [arrStr[0], arrStr[1]].join('').slice(1);
                            content = arrStr.slice(2).join('');
                        }
                    }
                    setMovieOtherContent(movieObj, title, content);
                } else {
                    let title = arrStr[0].slice(1).toString();
                    let content = arrStr.slice(1).join('');
                    setMovieOtherContent(movieObj, title, content);
                }
            }
        }
    })

    //下载链接
    let bot = $('.bot', mText).eq(0);
    let downUrl = [];
    if (bot.children().length) {
        let aInfo = $('a', bot);
        aInfo.each((i, el) => {
            let text = $(el).text();
            if (text.includes('magnet')) {
                if (text.includes('[飘花www.piaohua.com]')) {
                    text = text.replace('[飘花www.piaohua.com]', '');
                }
            }
            downUrl.push(text);
        })
    } else {
        let table = $('table', txt);
        table.each((i, el) => {
            let aCount = $('a', el);
            aCount.each((j, a) => {
                let text = $(a).text();
                if (text.includes('magnet')) {
                    if (text.includes('[飘花www.piaohua.com]')) {
                        text = text.replace('[飘花www.piaohua.com]', '');
                    }
                    downUrl.push(text);
                } else if (!/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(text)) {
                    downUrl.push(text);
                }
            })
        })
    }
    movieObj.downUrl = downUrl.join(',');
    return movieObj;
}

/**
 * 获取某个电影的详细信息
 * @param {object} $ cheerio 处理后的信息
 */
function getMovieDetail($) {
    let filmList = $('.ul-imgtxt2').eq(0);
    let lis = filmList.find('li');
    let oneMovies = [];
    //收集异步函数
    let getDetailFun = [];
    let indexImgUrls = [];
    lis.each(async function (i, el) {
        let li = $(el);
        let pic = $('.pic', li).eq(0);
        let a = $('a', pic);
        let detailUrl = a.attr('href');
        let indexImgUrl = $('img', pic).eq(0).attr('src');
        let imgUrl = await downLoadImg(indexImgUrl, 'images/movies/index/');
        // let imgUrl = '';
        if (imgUrl) {
            indexImgUrls.push(imgUrl);
        } else {
            indexImgUrls.push(defaultImgUrl);
        }
        getDetailFun.push(superGetData(`${webSiteUrl}${detailUrl}`));
        if (i === lis.length - 1) {
            Promise.all(getDetailFun).then(res => {
                res.forEach(async (item, idx) => {
                    if (item) {
                        let $2 = cheerio.load(item.text);
                        let oneMoive = await getSingleMovieDetail($2);
                        oneMoive.indexImgSrc = indexImgUrls[idx];
                        let vals = Object.values(oneMoive);
                        // console.log(vals);
                        let insertRes = await query(movieSql, vals);
                        console.log('插入成功');
                    }
                })
            }, () => {
                reject('fail to fetch resource');
            })
        }
    })


    //异步发起这个页面请求详情的数据
    // return new Promise((resolve, reject) => {
    //     console.log(getDetailFun);
    //     Promise.all(getDetailFun).then(res => {
    //         console.log(res);
    //         res.forEach(async (item,idx) => {
    //             console.log(`idx:${idx}`);
    //             if (item) {
    //                 let $2 = cheerio.load(item.text);
    //                 let oneMoive = await getSingleMovieDetail($2);
    //                 oneMoive.indexImgUrl = indexImgUrls[idx];
    //                 oneMovies.push(oneMoive);
    //             } 

    //         })
    //         // if(idx===res.length-1) {
    //             resolve(oneMovies);
    //         // }
    //     }, () => {
    //         reject('fail to fetch resource');
    //     })
    // })
}

module.exports = {
    superGetData,
    getMovieDetail
}