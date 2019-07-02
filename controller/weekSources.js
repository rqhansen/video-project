'use strict';
const connection = require('../database/db');
const { movieTypes } = require('../config/index');
const { handleMovieList } = require('./utils');

async function getWeekSources(ctx) {
    let results = [];
    let action = await connection.query(`select * from action where date_sub(curdate(),interval 7 day) <= date(pubDate)`);
    let comedy = await connection.query(`select * from comedy where date_sub(curdate(),interval 7 day) <= date(pubDate)`);
    let romance = await connection.query(`select * from romance where date_sub(curdate(),interval 7 day) <= date(pubDate)`);
    let science = await connection.query(`select * from science where date_sub(curdate(),interval 7 day) <= date(pubDate)`);
    let drama = await connection.query(`select * from drama where date_sub(curdate(),interval 7 day) <= date(pubDate)`);
    let suspense = await connection.query(`select * from suspense where date_sub(curdate(),interval 7 day) <= date(pubDate)`);
    let war = await connection.query(`select * from war where date_sub(curdate(),interval 7 day) <= date(pubDate)`);
    let horror = await connection.query(`select * from horror where date_sub(curdate(),interval 7 day) <= date(pubDate)`);
    let disaster = await connection.query(`select * from disaster where date_sub(curdate(),interval 7 day) <= date(pubDate)`);
    if (action.length) {
        results.push(handleMovieList(action));
    }
    if (comedy.length) {
        results.push(handleMovieList(comedy));
    }
    if (romance.length) {
        results.push(handleMovieList(romance));
    }
    if (science.length) {
        results.push(handleMovieList(science));
    }
    if (drama.length) {
        results.push(handleMovieList(drama));
    }
    if (suspense.length) {
        results.push(handleMovieList(suspense));
    }
    if (war.length) {
        results.push(handleMovieList(war));
    }
    if (horror.length) {
        results.push(handleMovieList(horror));
    }
    if (disaster.length) {
        results.push(handleMovieList(disaster));
    }
    // console.log(results);
    // let results = await connection.query(`select * from action where date_sub(curdate(),interval 7 day) <= date(pubDate)
    //                                     union select * from comedy where date_sub(curdate(),interval 7 day) <= date(pubDate)
    //                                     union select * from drama where date_sub(curdate(),interval 7 day) <= date(pubDate)
    //                                     union select * from horror where date_sub(curdate(),interval 7 day) <= date(pubDate)
    //                                     union select * from romance where date_sub(curdate(),interval 7 day) <= date(pubDate)
    //                                     union select * from science where date_sub(curdate(),interval 7 day) <= date(pubDate)
    //                                     union select * from suspense where date_sub(curdate(),interval 7 day) <= date(pubDate)
    //                                     union select * from war where date_sub(curdate(),interval 7 day) <= date(pubDate)`);
    // results.forEach(item => {
    //     item.filmType = Object.values(movieTypes.filter(type => type[`${item.typeId}`])[0])[0];
    //     item.pubDate = formatDate(item.pubDate);
    //     item.isNew = true;
    // })
    await (ctx.render('weekSources', { results }));
}

module.exports = {
    getWeekSources
}