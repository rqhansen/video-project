(function(){
    let btn = selectEleById('searchBtn');
    let value = btn.innerHTML;
    if(!value) return;
    btn.addEventListener('click',() =>{
        window.open(`/plus/search?keyword=${value}`);
    },false)
})();