'use strict';
const connection = require('../database/db');
const { movieTypes, limitSeconds } = require('../config/index');

async function getMore(ctx) {
    let { url } = ctx;
    let type = url.slice(1).split('/')[1];
    if (type === 'movie') {
        let movies = await connection.query(`select id,typeId,indexImgSrc,fullName, pureName,date_format(pubDate,"%Y-%m-%d"),pubDate from action where date_sub(curdate(),interval 30 day) <= date(pubDate)
                                        union select id,typeId,indexImgSrc,fullName, pureName,date_format(pubDate,"%Y-%m-%d"),pubDate from comedy where date_sub(curdate(),interval 30 day) <= date(pubDate)
                                        union select id,typeId,indexImgSrc,fullName, pureName,date_format(pubDate,"%Y-%m-%d"),pubDate from romance where date_sub(curdate(),interval 30 day) <= date(pubDate)
                                        union select id,typeId,indexImgSrc,fullName, pureName,date_format(pubDate,"%Y-%m-%d"),pubDate from science where date_sub(curdate(),interval 30 day) <= date(pubDate)
                                        union select id,typeId,indexImgSrc,fullName, pureName,date_format(pubDate,"%Y-%m-%d"),pubDate from drama where date_sub(curdate(),interval 30 day) <= date(pubDate)
                                        union select id,typeId,indexImgSrc,fullName, pureName,date_format(pubDate,"%Y-%m-%d"),pubDate from suspense where date_sub(curdate(),interval 30 day) <= date(pubDate)
                                        union select id,typeId,indexImgSrc,fullName, pureName,date_format(pubDate,"%Y-%m-%d"),pubDate from war where date_sub(curdate(),interval 30 day) <= date(pubDate)
                                        union select id,typeId,indexImgSrc,fullName, pureName,date_format(pubDate,"%Y-%m-%d"),pubDate from horror where date_sub(curdate(),interval 30 day) <= date(pubDate)
                                        union select id,typeId,indexImgSrc,fullName, pureName,date_format(pubDate,"%Y-%m-%d"),pubDate from disaster where date_sub(curdate(),interval 30 day) <= date(pubDate)
                                        union select id,typeId,indexImgSrc,fullName, pureName,date_format(pubDate,"%Y-%m-%d"),pubDate from cartoon where date_sub(curdate(),interval 30 day) <= date(pubDate) order by pubDate desc`);
        movies.forEach(item => {
            item.filmType = Object.values(movieTypes.filter(type => type[`${item.typeId}`])[0])[0];
            item.pubDate = item['date_format(pubDate,"%Y-%m-%d")'];
            item.isNew = new Date() - new Date(item.pubDate) <= limitSeconds;
            delete item['date_format(pubDate,"%Y-%m-%d")'];
        })
        await ctx.render('moreMovie', { movies });
    } else {
        let tvs = await connection.query(`select id,typeId,indexImgSrc,fullName, pureName,tvNum,downUrl,date_format(pubDate,"%Y-%m-%d"),pubDate from tv where date_sub(curdate(),interval 60 day) <= date(pubDate) order by pubDate desc`);
        tvs.forEach(item => {
            item.filmType = 'tv';
            item.fullName = item.fullName.replace('$', item.downUrl.split('$').length);
            item.pubDate = item['date_format(pubDate,"%Y-%m-%d")'];
            item.isNew = new Date() - new Date(item.pubDate) <= limitSeconds;
            delete item['date_format(pubDate,"%Y-%m-%d")'];
            delete item['downUrl'];
        })
        await ctx.render('moreTv', { tvs });
    }

}

module.exports = {
    getMore
}