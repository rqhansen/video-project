'use strict';
const connection = require('../database/db');

async function getSearchResult(ctx) {
    let {keyword} = ctx.query;
}

module.exports = {
    getSearchResult
}