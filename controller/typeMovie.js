
const { query } = require('../database/db');
const { movieTypes, limitSeconds } = require('../config/index');

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

    let result = await query(`select id,typeId,typeName,indexImgSrc,trim(year),trim(country),trim(pureName),trim(fullName),pureName,actor,date_format(pubDate,"%Y-%m-%d"),left(shortIntro,90) from ${type} order by pubDate desc`);
    let { length } = result;
    let { typeId } = result[0];
    let typeChar = Object.values(movieTypes.filter(type => type[`${typeId}`])[0])[0];
    result = result.slice(page * 14, page * 14 + 14);
    if (!result.length) {
        await ctx.render('notFind', { title: '您找的资源不存在' });
        return;
    }
    result.forEach(item => {
        item.year = item['trim(year)'];
        item.country = item['trim(country)'];
        item.pureName = item['trim(pureName)'];
        item.pubDate = item['date_format(pubDate,"%Y-%m-%d")'];
        item.shortIntro = item['left(shortIntro,90)'];
        item.shortIntro = item.shortIntro.split('$').join('');
        let fullName = item['trim(fullName)'];
        item.sharpness = fullName.split(item.pureName)[1];
        item.actor = item.actor.split('$').slice(0, 1);
        item.isNew = new Date() - new Date(item.pubDate) < limitSeconds;
        delete item.typeId;
        delete item['trim(country)'];
        delete item['trim(year)'];
        delete item['trim(pureName)'];
        delete item['date_format(pubDate,"%Y-%m-%d")'];
        delete item['trim(fullName)'];
        delete item['left(shortIntro,80)'];
    })
    await ctx.render('typeMovie', { typeChar, result, total: length });
}

module.exports = {
    getTypeMovies
}