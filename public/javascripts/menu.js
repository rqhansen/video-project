

let menuWp = selectEleById('menuWp');

menuWp.addEventListener('click',(e) =>{
    handleTypeMovie(e);
},false);

/**
 * 处理不同的电影类型事件
 */
function handleTypeMovie(e) {
    let [val,url] = [e.target.innerHTML,'/html'];
    switch (val) {
        case '首页':
            url='/';
            break;
        case '动作片':
            url += '/action/index';
            break;
        case '喜剧片':
            url += '/comedy/index';
            break;
        case '爱情片':
            url += '/romance/index';
            break;
        case '科幻片':
            url += '/science/index';
            break;
        case 'drama':
            url += '/drama/index';
            break;
        case 'suspense':
            url += '/suspense/index';
            break;
        case 'war':
            url += '/war/index';
            break;
        case 'horror':
            url += '/horror/index';
            break;
        case 'disaster':
            url += '/disaster/index';
        default:
            break;
    }
    window.open(url,'_self');
}
