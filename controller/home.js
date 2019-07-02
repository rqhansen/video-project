'use strict';
const connection = require('../database/db');
const { movieTypes, limitSeconds } = require('../config/index');

/**
 * 获取首页电影列表
 * @param {object} ctx 
*/
async function getHome(ctx) {
    //数据库存在数据，则从数据库获取
    let movies = await connection.query('select id,typeId,indexImgSrc,fullName,date_format(pubDate,"%Y-%m-%d") from films order by pubDate desc limit 24 offset 0');
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