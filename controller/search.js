'use strict';
const connection = require('../database/db');
const { movieTypes, limitSeconds } = require('../config/index');
const { formatDate } = require('./utils');

async function getSearchResult(ctx) {
    let { keyword, page } = ctx.query;
    let result = await connection.query(`select * from action where fullName like "%${keyword}%" 
                                        union select * from comedy where fullName like "%${keyword}%"
                                        union select * from drama where fullName like "%${keyword}%"
                                        union select * from horror where fullName like "%${keyword}%"
                                        union select * from romance where fullName like "%${keyword}%"
                                        union select * from science where fullName like "%${keyword}%"
                                        union select * from suspense where fullName like "%${keyword}%"
                                        union select * from war where fullName like "%${keyword}%"`);
    let { length } = result;
    result = result.slice((page - 1) * 10, (page - 1) * 10 + 10);
    result.forEach(item => {
        item.typeChar = Object.values(movieTypes.filter(type => type[`${item.typeId}`])[0])[0];
        let pureName = item.pureName.trim();
        item.sharpness = item.fullName.trim().split(pureName)[1];
        item.actor = item.actor.split('$').slice(0, 1);
        let date = formatDate(item.pubDate)
        let dateSplit = date.split('-');
        item.pubDate = `${dateSplit[1]}-${dateSplit[2]}`;
        item.isNew = new Date() - new Date(date) < limitSeconds;
    })
    await ctx.render('searchResult', { keyword, result, total: length });
}

module.exports = {
    getSearchResult
}