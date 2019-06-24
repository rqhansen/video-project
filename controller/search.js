'use strict';
const connection = require('../database/db');

async function getSearchResult(ctx) {
    let {keyword} = ctx.query;
    let actionPart = await connection.query('select * from action where ');
}

module.exports = {
    getSearchResult
}