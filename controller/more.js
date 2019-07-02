'use strict';
const connection = require('../database/db');
const { movieTypes,limitSeconds } = require('../config/index');

async function getMore(ctx) {
    let movies = await connection.query('select id,typeId,indexImgSrc,date_format(pubDate,"%Y-%m-%d"),fullName from films order by pubDate desc limit 102 offset 0');
    movies.forEach(item => {
        item.filmType = Object.values(movieTypes.filter(type => type[`${item.typeId}`])[0])[0];
        item.pubDate = item['date_format(pubDate,"%Y-%m-%d")'];
        item.isNew = new Date() - new Date(item.pubDate) <= limitSeconds;
        delete item['date_format(pubDate,"%Y-%m-%d")']
    })
    await ctx.render('more', { movies });
}

module.exports = {
    getMore
}