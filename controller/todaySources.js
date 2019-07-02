'use strict';
const connection = require('../database/db');
const { movieTypes } = require('../config/index');
const { formatDate } = require('./utils');

async function getTodaySources(ctx) {
    let results = await connection.query(`select * from action where to_days(pubDate) = to_days(now())
                                        union select * from comedy where to_days(pubDate) = to_days(now())
                                        union select * from drama where to_days(pubDate) = to_days(now())
                                        union select * from horror where to_days(pubDate) = to_days(now())
                                        union select * from romance where to_days(pubDate) = to_days(now())
                                        union select * from science where to_days(pubDate) = to_days(now())
                                        union select * from suspense where to_days(pubDate) = to_days(now())
                                        union select * from war where to_days(pubDate) = to_days(now())`);
    results.forEach(item => {
        item.filmType = Object.values(movieTypes.filter(type => type[`${item.typeId}`])[0])[0];
        item.pubDate = formatDate(item.pubDate);
        item.isNew = true;
    })
    await (ctx.render('todaySources', { results }));
}

module.exports = {
    getTodaySources
}