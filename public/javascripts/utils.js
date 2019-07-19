
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
 * 获取页面滚动的距离
 */
function getScrollTop() {
    return document.documentElement.scrollTop || document.body.scrollTop;
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

// function 
function selectElesByClassName(className, el) {
    if (!className) throw new Error('className cant be empty');
    if (!el) throw new Error('parent element cant be empty');
    return el.getElementsByClassName(className);
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

function addClassName(el, className) {
    if (!el) throw new Error('dom cant be empty');
    if (!className) throw new Error('className cant be empty');
    let { classList } = el;
    if (!classList.contains(className)) classList.add(className);
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
 * 
 * @param {DOM} el Dom节点 
 * @param {string} className类名 
 */
function hasClassName(el, className) {
    if (!el) throw new Error('dom cant be empty');
    if (!className) throw new Error('className cant be empty');
    let { classList } = el;
    return classList.contains(className);
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
 * 复制文本
 */
function copyText(text) {
    var container = document.body
    var isRTL = document.documentElement.getAttribute('dir') == 'rtl'
    var copyDom = document.getElementsByClassName('copyDom')
    if (copyDom && copyDom.length > 0) {
        container.removeChild(copyDom[0])
    }
    var fakeElem = document.createElement('textarea')
    // Prevent zooming on iOS
    fakeElem.style.fontSize = '12pt'
    // Reset box model
    fakeElem.style.border = '0'
    fakeElem.style.padding = '0'
    fakeElem.style.margin = '0'
    // Move element out of screen horizontally
    fakeElem.style.position = 'absolute'
    fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px'
    // Move element to the same position vertically
    var yPosition = window.pageYOffset || document.documentElement.scrollTop
    fakeElem.style.top = yPosition + 'px'

    fakeElem.setAttribute('readonly', '')
    fakeElem.className = 'copyDom'
    fakeElem.value = text
    container.appendChild(fakeElem)
    fakeElem.select()
    fakeElem.setSelectionRange(0, fakeElem.value.length)

    window.selectedText = fakeElem.value
    var succeeded = void 0

    try {
        succeeded = document.execCommand('copy')
    } catch (err) {
        succeeded = false
    }
    return succeeded
}

/**
 * 节流函数
 */

function throttle(fn, delay = 200) {

    let timer, current, past, context, args;

    function execute() {
        fn.call(context, args);
        past = current;
    }

    return function () {

        context = this;
        args = arguments;

        if (timer) { //清除上一次的定时任务
            clearTimeout(timer);
            timer = null;
        }

        current = +new Date();

        if (!past) { //一开始执行一次
            execute()
        } else {
            let diff = delay - (current - past);
            if (diff <= 0) {
                execute();
            } else {
                timer = setTimeout(function () {
                    execute();
                }, diff)
            }
        }
    }
}

/**
 * 检测客户端是PC还是手机其它型号
 */
function userAgent() {
    var ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
    };
}




