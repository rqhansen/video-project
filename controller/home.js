'use strict';
const connection = require('../database/db');
const {movieTypes}  =require('../config/index');
const fs = require('fs');

/**
 * 获取首页电影列表
 * @param {object} ctx 
*/
async function getHome(ctx) {
    //数据库存在数据，则从数据库获取
    let movies = await connection.query('select * from films order by pubDate desc limit 24 offset 0');
    movies.forEach(item =>{
        item.filmType = Object.values(movieTypes.filter(type =>type[`${item.typeId}`])[0])[0];
    })
    await ctx.render('index', { movies });
}



module.exports = {
    getHome
}