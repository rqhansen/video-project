//格式化日期
let dt = selectEleById('pubDate');
dt.innerHTML = formatDate(dt.innerHTML);

//控制内容显示隐藏
let detail = selectEleById('detailContent');
let ps = detail.getElementsByTagName('p');
Array.from(ps).forEach(el =>{
    let span = el.children[0];
    if(!span.innerText) {
        addClassName(span.parentNode,'hide');
    }
})
