'use strict';
const connection = require('../database/db');
const { movieTypes } = require('../config/index');

async function getTodaySources(ctx) {
    let results = await connection.query(`select id,typeId,indexImgSrc,fullName, date_format(pubDate,"%Y-%m-%d") from action where to_days(pubDate) = to_days(now())
                                        union select id,typeId,indexImgSrc,fullName, date_format(pubDate,"%Y-%m-%d") from comedy where to_days(pubDate) = to_days(now())
                                        union select id,typeId,indexImgSrc,fullName, date_format(pubDate,"%Y-%m-%d") from drama where to_days(pubDate) = to_days(now())
                                        union select id,typeId,indexImgSrc,fullName, date_format(pubDate,"%Y-%m-%d") from horror where to_days(pubDate) = to_days(now())
                                        union select id,typeId,indexImgSrc,fullName, date_format(pubDate,"%Y-%m-%d") from romance where to_days(pubDate) = to_days(now())
                                        union select id,typeId,indexImgSrc,fullName, date_format(pubDate,"%Y-%m-%d") from science where to_days(pubDate) = to_days(now())
                                        union select id,typeId,indexImgSrc,fullName, date_format(pubDate,"%Y-%m-%d") from suspense where to_days(pubDate) = to_days(now())
                                        union select id,typeId,indexImgSrc,fullName, date_format(pubDate,"%Y-%m-%d") from war where to_days(pubDate) = to_days(now())`);
    results.forEach(item => {
        item.filmType = Object.values(movieTypes.filter(type => type[`${item.typeId}`])[0])[0];
        item.pubDate = item['date_format(pubDate,"%Y-%m-%d")'];
        item.isNew = true;
        delete item['date_format(pubDate,"%Y-%m-%d")'];
    })
    console.log(results);
    await (ctx.render('todaySources', { results }));
}

module.exports = {
    getTodaySources
}