const router = require('koa-router')();
const { getHome } = require('../controller/home');
const { getMovieDetail } = require('../controller/mDetail');
const {getMore} = require('../controller/more');
const { getSomeTypeMoiveList } = require('../controller/moveTypeList');

/**
 * 首页
 */
router.get('/', getHome);

/**
 * 更多
 */

 router.get('/film/more',getMore)

/**
 * 电影详情
 */

// router.get('/html/*/:id/:id/:id', getMovieDetail);
router.get('/film/*/:id',getMovieDetail)


/**
 * 指定类型的电影列表
 */

// router.get('/html/*/index', getSomeTypeMoiveList);

module.exports = router
