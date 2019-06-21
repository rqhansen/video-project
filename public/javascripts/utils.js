
/**
 * 获取浏览器文档区域的宽高 
 */
function getClientSize() {
    if (window.innerWidth != null) { // ie9+ 最新浏览器
        let { innerWidth, innerHeight } = window;
        return {
            width: innerWidth,
            height: innerHeight
        }
    } else if (document.compatMode === 'CSS1Compat') { //标准浏览器
        let { clientWidth, clientHeight } = document.documentElement;
        return {
            width: clientWidth,
            height: clientHeight
        }
    }
    let { clientWidth, clientHeight } = document.body;
    return { //怪异浏览器
        width: clientWidth,
        height: clientHeight
    }
}

/**
 * 浏览器resize事件
 * @param {function} callback
 */
function windowResizeEvent(callback) {
    window.onresize = function () {
        let resizeFlag = this.resizeFlag;
        if (resizeFlag) {
            clearTimeout(this.resizeFlag);
        }
        this.resizeFlag = setTimeout(() => {
            callback();
            this.resizeFlag = null;
        }, 100)
    }
}

/**
 * 根据id获取元素
 * @param {string} className 类名
 */
function selectEleById(id) {
    if (!id) throw new Error('id cant be empty');
    return document.getElementById(id);
}

/**
 * 为元素添加或删除类名
 * @param {DOM} el 节点 
 * @param {sring} className 类名
 */
function toggleClassName(el, className) {
    if (!el) return;
    let { classList } = el;
    if (classList.contains(className)) {
        classList.remove(className);
    } else {
        classList.add(className);
    }
}

/**
 * 元素添加类
 * @param {DOM} el Dom节点
 * @param {string} className类名 
 */

function addClassName(el,className) {
    if (!el) throw new Error('dom cant be empty');
    if (!className) throw new Error('className cant be empty');
    let {classList} = el;
    if(!classList.contains(className)) classList.add(className);
}

/**
 * 移除元素的某个类
 * @param {DOM} el Dom节点
 * @param {string} className类名 
 */
function removeClassName(el, className) {
    if (!el) throw new Error('dom cant be empty');
    if (!className) throw new Error('className cant be empty');
    let { classList } = el;
    if (classList.contains(className)) classList.remove(className);
}

/**
 * 阻止默认事件
 * @param {Event} e 事件对象
 */

function stopDefault(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
        return;
    }
    window.event.returnValue = false;
}

/**
 * 日期转为2019-07-03格式
 * @param {String} dateStr 日期的字符串形式
 */
function formatDate(dateStr) {
    let dateSplit = dateStr.split('-');
    dateSplit.forEach((item,idx) =>{
        if(idx) {
            if(item<10) dateSplit[idx] = `0${item}`;
        }
    })
    return dateSplit.join('-');
}
/**
 * 获取网络请求的XMLHttp对象
 */
// function getXMLHttpObj() {
//     let xmlHttp;
//     if (window.XMLHttpRequest) {
//         xmlHttp = new XMLHttpRequest();
//     } else {
//         xmlHttp = new ActiveXObject();
//     }
//     return xmlHttp;
// }



