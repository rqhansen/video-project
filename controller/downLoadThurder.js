'use strict';
// const send = require('koa-send');
const { thurderUrl } = require('../config/index');


async function downLoadThurder(ctx) {
    await ctx.render('downLoadThurder.ejs');
}

module.exports = {
    downLoadThurder
}