'use strict';
const connection = require('../database/db');
const { movieTypes } = require('../config/index');
const { formatDate } = require('./utils');

async function getWeekSources(ctx) {
    let results = await connection.query(`select * from action where date_sub(curdate(),interval 7 day) <= date(pubDate)
                                        union select * from comedy where date_sub(curdate(),interval 7 day) <= date(pubDate)
                                        union select * from drama where date_sub(curdate(),interval 7 day) <= date(pubDate)
                                        union select * from horror where date_sub(curdate(),interval 7 day) <= date(pubDate)
                                        union select * from romance where date_sub(curdate(),interval 7 day) <= date(pubDate)
                                        union select * from science where date_sub(curdate(),interval 7 day) <= date(pubDate)
                                        union select * from suspense where date_sub(curdate(),interval 7 day) <= date(pubDate)
                                        union select * from war where date_sub(curdate(),interval 7 day) <= date(pubDate)`);
    results.forEach(item => {
        item.filmType = Object.values(movieTypes.filter(type => type[`${item.typeId}`])[0])[0];
        item.pubDate = formatDate(item.pubDate);
        item.isNew = true;
    })
    await (ctx.render('weekSources', { results }));
}

module.exports = {
    getWeekSources
}