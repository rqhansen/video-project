'use strict';
// const send = require('koa-send');
const { thurderUrl } = require('../config/index');


async function downLoadThurder(ctx) {
    // const fileName = 'xunlei5.zip';
    // const fileName = 'Pc版+迅雷+v5.+绿色共存版【可下载版权限制的资源】.zip';
    // ctx.attachment(fileName);
    // await send(ctx, fileName, { root: thurderUrl });
    // await ctx
    await ctx.render('downLoadThurder');
}

module.exports = {
    downLoadThurder
}