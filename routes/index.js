const router = require('koa-router')();
const { getHome } = require('../controller/home');
const { getMovieDetail } = require('../controller/mDetail');
const { getMore } = require('../controller/more');
const { getTypeMovies } = require('../controller/typeMovie');
const {getSearchResult} = require('../controller/search');

/**
 * 首页
 */
router.get('/', getHome);

/**
 * 更多
 */

router.get('/html/more', getMore);

/**
 * 类别电影
 */

router.get('/html/*/(index|page_\\d+)', getTypeMovies);

/**
 * 电影详情
 */
router.get('/html/*/:id', getMovieDetail);

/**
 * 搜索
 */
router.get('/plus/search',getSearchResult);

/**
 * 指定类型的电影列表
 */

// router.get('/html/*/index', getSomeTypeMoiveList);

module.exports = router
