//控制内容显示隐藏
(function () {
    let detail = selectEleById('detailContent');
    let ps = detail.getElementsByTagName('p');
    Array.from(ps).forEach(el => {
        let span = el.children[0];
        if (!span.innerText) {
            addClassName(span.parentNode, 'hide');
        }
    })

    //是否显示加载中
    handleIsShowLoad();
    function handleIsShowLoad() {
        let { isPc } = userAgent();
        if (!isPc) {
            let loadWp = selectEleById('loadWp');
            if (hasClassName(loadWp, 'show')) {
                removeClassName(loadWp, 'show');
                return;
            }
            addClassName(loadWp, 'show');
            imgOnLoad();
        }
    }

    //图片加载触发的事件
    let img = selectEleById('detailImg');
    function imgOnLoad() {
        img.addEventListener('load', hideLoad, false);
        img.addEventListener('error', hideLoad, false);
    }
    //隐藏加载中
    function hideLoad() {
        let loadWp = selectEleById('loadWp');
        removeClassName(loadWp, 'show');
    }

    //复制影片链接(pc和移动端)
    let { width } = getClientSize();
    if (width > 767) {
        copyMDetail('copyMDetail');
    } else {
        copyMDetail('mbCopyMDetail');
    }
    function copyMDetail(eleId) {
        let cBtn = selectEleById(eleId);
        cBtn.addEventListener('click', () => {
            let url = window.location.href;
            let flag = copyText(url);
            if (flag) {
                alert('网址已复制，分享给好友了!');
            }
        }, false);
    }
})();

