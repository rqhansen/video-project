
const {query} = require('../database/db');
const {movieTypes}  =require('../config/index');

async function getTypeMovies(ctx) {
    let {url} = ctx;
    let urlSplit = url.split('/');
    let [type,index] = [urlSplit[2],urlSplit[3]];
    let page;
    if(index ==='index') {
        page = 0;
    } else {
        page = index.split('_')[1]-1;
    }
    let result = await query(`select * from ${type} order by pubDate desc`);
    let {length} = result;
    let {typeId} = result[0];
    let typeChar = Object.values(movieTypes.filter(type =>type[`${typeId}`])[0])[0];
    result = result.slice(page*14,page*14+14);
    let firstResult = result[0];
    firstResult.typeChar = typeChar;
    firstResult.total = length;
    result[0] = firstResult;
    let obj = {result,typeChar,length};
    await ctx.render('typeMovie',{result});
}


module.exports = {
    getTypeMovies
}