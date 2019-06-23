
const { query } = require('../database/db');
const { movieTypes, limitSeconds } = require('../config/index');
const { formatDate } = require('./utils');

async function getTypeMovies(ctx) {
    let { url } = ctx;
    let urlSplit = url.split('/');
    let [type, index] = [urlSplit[2], urlSplit[3]];
    let page;
    if (index === 'index') {
        page = 0;
    } else {
        page = index.split('_')[1] - 1;
    }
    let result = await query(`select * from ${type} order by pubDate desc`);
    let { length } = result;
    let { typeId } = result[0];
    let typeChar = Object.values(movieTypes.filter(type => type[`${typeId}`])[0])[0];
    result = result.slice(page * 14, page * 14 + 14);
    result.forEach(item => {
        let pureName = item.pureName.trim();
        item.sharpness = item.fullName.trim().split(pureName)[1];
        item.actor = item.actor.split('$').slice(0, 1);
        let date = formatDate(item.pubDate)
        let dateSplit = date.split('-');
        item.pubDate = `${dateSplit[1]}-${dateSplit[2]}`;
        item.isNew = new Date() - new Date(date) < limitSeconds;
    })
    await ctx.render('typeMovie', { typeChar, result, total: length });
}


module.exports = {
    getTypeMovies
}