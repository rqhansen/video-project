const router = require('koa-router')();
const { getHome } = require('../controller/home');
const { getMovieDetail } = require('../controller/mDetail');
const { getMore } = require('../controller/more');
const { getTypeMovies } = require('../controller/typeMovie');
const {getSearchResult} = require('../controller/search');
const {getNotFind} = require('../controller/notFind');
const typeExp = '(action|comedy|romance|science|drama|suspense|horror|war|horror|disaster)/(index|page_\\d+)';
const detailExp = '(action|comedy|romance|science|drama|suspense|horror|war|horror|disaster)/(\\d+)';

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

router.get(`/html/${typeExp}`, getTypeMovies);

/**
 * 电影详情
 */
router.get(`/html/${detailExp}`, getMovieDetail);

/**
 * 搜索
 */
router.get('/plus/search',getSearchResult);

/**
 * 404页面
 */
router.get('*',getNotFind);

/**
 * 指定类型的电影列表
 */

// router.get('/html/*/index', getSomeTypeMoiveList);

module.exports = router
