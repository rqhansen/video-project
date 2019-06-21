'use strict';
const connection = require('../database/db');
const {movieTypes}  =require('../config/index');

async function getMore(ctx) {
    let movies = await connection.query('select * from films order by pubDate desc limit 102 offset 0');
    movies.forEach(item =>{
        item.filmType = Object.values(movieTypes.filter(type =>type[`${item.typeId}`])[0])[0];
    })
    await ctx.render('more',{movies});
}

module.exports = {
    getMore
}