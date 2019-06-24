
const { query } = require('../database/db');
const {movieTypes}  =require('../config/index');
const { formatDate } = require('./utils');
/**
 * 获取电影详情
 */
async function getMovieDetail(ctx) {
    let urlSplit = ctx.url.split('/');
    let [type, id] = [urlSplit[2], urlSplit[3]];
    let result = await query(`select * from ${type} where id=${id}`); //查询出来的是一个数组
    result = result[0];
    let downUrl = result.downUrl;
    let actor = result.actor;
    let getAward = result.getAward;
    let shortIntro = result.shortIntro;
    let pubDate = result.pubDate;
    if (downUrl) {
        result.downUrl = downUrl.split(',');
    }
    if (actor) {
        result.actor = actor.split('$');
    }
    if (getAward) {
        let awardArr = getAward.split('$');
        let flag = /\s/g.test(awardArr.toString());
        result.getAward = flag ? null : awardArr;
    }
    if (shortIntro) {
        result.shortIntro = shortIntro.split('$');
    }
    if (pubDate) {
        result.pubDate = formatDate(pubDate);
    }
    result.filmType = Object.values(movieTypes.filter(type =>type[`${result.typeId}`])[0])[0];
    await ctx.render('mDetail', result);
    // let keys = Object.keys(movieTypes);
    // let movieType = keys.filter(key => movieTypes[key] === result.typeId)[0];
    // let movie = Object.assign(result,{movieType});
    // console.log('电影详情~');
    // let url = ctx.req.url;
    // let data = await superGetData(`${webSiteUrl}${url}.html`);
    // let $ = cheerio.load(data.text);
    // let detail = $('.m-details');
    // let a = $('.cur a', detail).eq(1);
    // //面包屑导航~
    // let movieTypeHref = a.attr('href');
    // let movieType = a.text();
    // //详情
    // let mText = $('.m-text1', detail);
    // //标题
    // let title = $('h1', mText).eq(0).text();
    // let subTitle = $('.info', mText).eq(0).text();
    // //介绍部分
    // let txt = $('.txt', mText);
    // let thunTip = txt.children().first().text();
    // //电影名称
    // let movieName = thunTip.split('迅')[0];
    // //图片
    // let [imgSrc, intros] = ['', []];
    // //内容div
    // if ($('div', txt).length) { //电影
    //     intros = $('div', txt).filter((i, el) => $(el).text()).map((i, el) => $(el).text());
    //     imgSrc = $('img', txt).eq(0).attr('src');
    // } else { //电视剧
    //     intros = $('p', txt).filter((i, el) => $(el).text()).map((i, el) => $(el).text());
    //     imgSrc = $('p img', txt).eq(0).attr('src');
    // }
    // //下载链接
    // let bot = $('.bot', mText).eq(0);
    // let aHrefs = [];
    // $('a', bot).each((i, el) => {
    //     aHrefs.push($(el).attr('href'));
    // });
    // await ctx.render('mDetail', {
    //     movieType,
    //     movieName,
    //     movieTypeHref,
    //     title,
    //     subTitle,
    //     thunTip,
    //     imgSrc,
    //     intros,
    //     aHrefs
    // });
}

module.exports = {
    getMovieDetail
}