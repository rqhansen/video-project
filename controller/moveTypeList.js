const cheerio = require('cheerio');
const { webSiteUrl, filmTypes } = require('../config/index');
const { superGetData, getMovieDetail } = require('./common');
/**
 * 获取某一个类型下的
 */
async function getSomeTypeMoiveList(ctx) {
    let typeUrl = filmTypes.map(type => `${webSiteUrl}/html/${type}/index.html`);
    for (let i = 8; i < 9; i++) { //只遍历电影

        let actionUrl = typeUrl[i];
        // console.log(actionUrl);

        let data = await superGetData(actionUrl); //第一页的数据
        let $;
        if (!data) return;
        if (data) {
            $ = cheerio.load(data.text);
        }
        //海报缩略图

        let pageText = $('.pages').eq(0).find('.total').text();
        let startIndex = pageText.indexOf('共');
        let endIndex = pageText.indexOf('页');
        let page = pageText.slice(startIndex + 1, endIndex); //总页数

        for (let j = 0; j < page; j++) {
            // let onePageResult;
            if (j === 0) {
                await getMovieDetail($); //返回一页的数据
            }
            else {
                let newActionUrl = actionUrl.replace('index', `list_${j + 1}`);
                let otherPageDate = await superGetData(newActionUrl);
                if (otherPageDate && otherPageDate.text) {
                    let other$ = cheerio.load(otherPageDate.text);
                    onePageResult = await getMovieDetail(other$)
                }
            }
            // if (typeof onePageResult === 'string') {
            //     return
            // }
            // onePageResult.forEach(async (item) => {
            //     let vals = Object.values(item);
            //     let insertRes = await query(movieSql, vals);
            //     console.log('插入成功');
            // }
            // )
        }
    }
}

module.exports = {
    getSomeTypeMoiveList
}