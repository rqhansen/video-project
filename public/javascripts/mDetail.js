//控制内容显示隐藏
(function(){
    let detail = selectEleById('detailContent');
    let ps = detail.getElementsByTagName('p');
    Array.from(ps).forEach(el =>{
        let span = el.children[0];
        if(!span.innerText) {
            addClassName(span.parentNode,'hide');
        }
    })
    //复制影片链接(pc和移动端)
    let {width} = getClientSize();
    if(width >767) {
        copyMDetail('copyMDetail');
    } else {
        copyMDetail('mbCopyMDetail');
    }
    function copyMDetail(eleId){
        let cBtn = selectEleById(eleId);
        cBtn.addEventListener('click',() =>{
            let url =  window.location.href;
            let flag = copyText(url);
            if(flag) {
                alert('网址已复制，粘贴给好友请按 Crtl+V');
            }
        },false);
    }
})();

