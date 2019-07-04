'use strict';
const connection = require('../database/db');
const { movieTypes, limitSeconds } = require('../config/index');

/**
 * 获取首页电影列表
 * @param {object} ctx 
*/
async function getHome(ctx) {
    // let movies = await connection.query('select id,typeId,indexImgSrc,fullName,date_format(pubDate,"%Y-%m-%d") from films order by pubDate desc limit 24 offset 0');
    // movies.forEach(item => {
    //     item.filmType = Object.values(movieTypes.filter(type => type[`${item.typeId}`])[0])[0];
    //     item.pubDate = item['date_format(pubDate,"%Y-%m-%d")'];
    //     item.isNew = new Date() - new Date(item.pubDate) <= limitSeconds;
    //     delete item['date_format(pubDate,"%Y-%m-%d")'];
    // })
    // let action = await connection.query(`select id,typeId,typeName,indexImgSrc,fullName, date_format(pubDate,"%Y-%m-%d") from action where date_sub(curdate(),interval 30 day) <= date(pubDate)`);
    // let comedy = await connection.query(`select id,typeId,typeName,indexImgSrc,fullName, date_format(pubDate,"%Y-%m-%d") from comedy where date_sub(curdate(),interval 30 day) <= date(pubDate)`);
    // let romance = await connection.query(`select id,typeId,typeName,indexImgSrc,fullName, date_format(pubDate,"%Y-%m-%d") from romance where date_sub(curdate(),interval 30 day) <= date(pubDate)`);
    // let science = await connection.query(`select id,typeId,typeName,indexImgSrc,fullName, date_format(pubDate,"%Y-%m-%d") from science where date_sub(curdate(),interval 30 day) <= date(pubDate)`);
    // let drama = await connection.query(`select id,typeId,typeName,indexImgSrc,fullName, date_format(pubDate,"%Y-%m-%d") from drama where date_sub(curdate(),interval 30 day) <= date(pubDate)`);
    // let suspense = await connection.query(`select id,typeId,typeName,indexImgSrc,fullName, date_format(pubDate,"%Y-%m-%d") from suspense where date_sub(curdate(),interval 30 day) <= date(pubDate)`);
    // let war = await connection.query(`select id,typeId,typeName,indexImgSrc,fullName, date_format(pubDate,"%Y-%m-%d") from war where date_sub(curdate(),interval 30 day) <= date(pubDate)`);
    // let horror = await connection.query(`select id,typeId,typeName,indexImgSrc,fullName, date_format(pubDate,"%Y-%m-%d") from horror where date_sub(curdate(),interval 30 day) <= date(pubDate)`);
    // let disaster = await connection.query(`select id,typeId,typeName,indexImgSrc,fullName, date_format(pubDate,"%Y-%m-%d") from disaster where date_sub(curdate(),interval 30 day) <= date(pubDate)`);
    // await ctx.render('index', { movies });
    let movies = await connection.query(`select id,typeId,indexImgSrc,fullName, pureName,date_format(pubDate,"%Y-%m-%d"),pubDate from action where date_sub(curdate(),interval 30 day) <= date(pubDate)
                                        union select id,typeId,indexImgSrc,fullName, pureName,date_format(pubDate,"%Y-%m-%d"),pubDate from comedy where date_sub(curdate(),interval 30 day) <= date(pubDate)
                                        union select id,typeId,indexImgSrc,fullName, pureName,date_format(pubDate,"%Y-%m-%d"),pubDate from drama where date_sub(curdate(),interval 30 day) <= date(pubDate)
                                        union select id,typeId,indexImgSrc,fullName, pureName,date_format(pubDate,"%Y-%m-%d"),pubDate from horror where date_sub(curdate(),interval 30 day) <= date(pubDate)
                                        union select id,typeId,indexImgSrc,fullName, pureName,date_format(pubDate,"%Y-%m-%d"),pubDate from romance where date_sub(curdate(),interval 30 day) <= date(pubDate)
                                        union select id,typeId,indexImgSrc,fullName, pureName,date_format(pubDate,"%Y-%m-%d"),pubDate from science where date_sub(curdate(),interval 30 day) <= date(pubDate)
                                        union select id,typeId,indexImgSrc,fullName, pureName,date_format(pubDate,"%Y-%m-%d"),pubDate from suspense where date_sub(curdate(),interval 30 day) <= date(pubDate)
                                        union select id,typeId,indexImgSrc,fullName, pureName,date_format(pubDate,"%Y-%m-%d"),pubDate from war where date_sub(curdate(),interval 30 day) <= date(pubDate)
                                        union select id,typeId,indexImgSrc,fullName, pureName,date_format(pubDate,"%Y-%m-%d"),pubDate from ethical where date_sub(curdate(),interval 30 day) <= date(pubDate) order by pubDate desc limit 24 offset 0`);
    movies.forEach(item => {
        item.filmType = Object.values(movieTypes.filter(type => type[`${item.typeId}`])[0])[0];
        item.pubDate = item['date_format(pubDate,"%Y-%m-%d")'];
        item.isNew = new Date() - new Date(item.pubDate) <= limitSeconds;
        delete item['date_format(pubDate,"%Y-%m-%d")'];
    })
    await ctx.render('index', { movies });
}

module.exports = {
    getHome
}