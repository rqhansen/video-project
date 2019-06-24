(function () {
    let wp = selectEleById('searchWp');
    let btn = selectElesByClassName('btn', wp)[0];
    btn.addEventListener('click', () => {
        let ipt = selectElesByClassName('ipt', wp)[0];
        let value = ipt.value;
        if (!value) return;
        window.open(`/plus/search?keyword=${value}&page=1`);
    }, false)
})();