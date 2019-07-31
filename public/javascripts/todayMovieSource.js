(function() {
    let isPc = isPcAgent();
    let goTop = selectEleById("goTop");
    if(isPc) {
        addEvent(document,'scroll',throttle(issShowPcGoTop));
    } else {
        let mainEle = selectEleById('main');
        addEvent(mainEle,'scroll',throttle(isShowGoTop));
    }
    function issShowPcGoTop() {
        let scrollTop = getScrollTop();
        if (scrollTop >= 300) {
            addClassName(goTop, 'show');
        } else {
            removeClassName(goTop, 'show');
        }
    }
    function isShowGoTop() {
        let scrollTop = mainEle.scrollTop;
        if (scrollTop >= 300) {
            addClassName(goTop, 'show');
        } else {
            removeClassName(goTop, 'show');
        }
    } 
})();