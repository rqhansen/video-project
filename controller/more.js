'use strict';
const connection = require('../database/db');
const { movieTypes,limitSeconds } = require('../config/index');
const { formatDate } = require('./utils');

async function getMore(ctx) {
    let movies = await connection.query('select * from films order by pubDate desc limit 102 offset 0');
    movies.forEach(item => {
        item.filmType = Object.values(movieTypes.filter(type => type[`${item.typeId}`])[0])[0];
        item.pubDate = formatDate(item.pubDate);
        item.isNew = new Date() - new Date(item.pubDate) <= limitSeconds;
    })
    await ctx.render('more', { movies });
}

module.exports = {
    getMore
}