
//总页数
let total = selectEleById('totalPages').innerHTML;
//总个数
let items = selectEleById('totalItems').innerHTML;
//分页容器
let pageWp = selectEleById('pageIndexWp');
//首页
let first = selectElesByClassName('first', pageWp)[0];
//上一页
let prePage = selectElesByClassName('page-pre', pageWp)[0];
//第n页至第n+14页
let pages = selectElesByClassName('page', pageWp);

let url = window.location.href;
let urlSplits = url.split('/');
let currPage = urlSplits.slice(-1)[0];
let remain;
if (currPage !== 'index') {
    remain = urlSplits.slice(-1)[0].split('_')[1];
}
if (currPage === 'index' || remain === '1') { //首页
    addClassName(prePage, 'disable');
    addClassName(first, 'disable');
    addClassName(prePage.nextElementSibling, 'active');
} else {
    let page = currPage.split('_')[1];
    let startPage = 1;
    let endPage = 11;
    if (page >= 11) {
        startPage = page - 5;
        endPage = page + 5;
        if (endPage > total) {
            endPage = total;
        }
    }
    for (let i = 0; i < pages.length; i++) {
        let pageEle = pages[i];
        let cachePage;
        if (startPage + i > total) {
            cachePage = total;
        } else {
            cachePage = startPage + i;
        }
        pageEle.children[0].innerHTML = cachePage;
        pageEle.children[0].href = `page_${cachePage}`;
        //如果是当前页
        if (cachePage == page) {
            addClassName(pageEle, 'active');
        }
    }
}

let firstLink = first.children[0];
firstLink.addEventListener('click', (e) => {
    stopDefault(e);
    if (hasClassName(e.target, 'disable')) {
        return;
    }
}, false);

//page添加事件
pageWp.addEventListener('click', (e) => {
    stopDefault(e);
    if (hasClassName(e.target, 'disable') || hasClassName(e.target, 'active')) {
        return;
    }
}, false);