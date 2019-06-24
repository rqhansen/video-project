'use strict';
const connection = require('../database/db');
const { movieTypes, limitSeconds } = require('../config/index');
const { formatDate } = require('./utils');

async function getSearchResult(ctx) {
    let { keyword, page } = ctx.query;
    let actionPart = await connection.query(`select * from action where fullName like "%${keyword}%"`);
    let comedyPart = await connection.query(`select * from comedy where fullName like "%${keyword}%"`);
    let disasterPart = await connection.query(`select * from disaster where fullName like "%${keyword}%"`);
    let dramaPart = await connection.query(`select * from drama where fullName like "%${keyword}%"`);
    let horrorPart = await connection.query(`select * from horror where fullName like "%${keyword}%"`);
    let romancePart = await connection.query(`select * from romance where fullName like "%${keyword}%"`);
    let sciencePart = await connection.query(`select * from science where fullName like "%${keyword}%"`);
    let suspensePart = await connection.query(`select * from suspense where fullName like "%${keyword}%"`);
    let warPart = await connection.query(`select * from war where fullName like "%${keyword}%"`);
    let result = [].concat(actionPart, comedyPart, disasterPart, dramaPart, horrorPart, romancePart, sciencePart, suspensePart, warPart);
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