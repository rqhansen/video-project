
(function () {
  
  let isPc = userAgent().isPc; //判断是否为Pc
  let wp = selectEleById('menuWp');
  let menuIcon = selectEleById('menuIcon');
  let indexNav = selectEleById('indexNav');
  let addSave =  selectEleById('addSave');
  let rightSearch = selectEleById('rightSearch');
  let rightBtn = selectElesByClassName('btn', rightSearch)[0];
  let navBtn = selectElesByClassName('btn', indexNav)[0];
  let goTop = selectEleById("goTop");
  let mainEle = selectEleById('main');
  let footer = selectEleById('footer');

  if(!isPc) {
    footer.style.display='none';
  }

  /**
   * 小屏下切换显示下拉导航
   */
  menuIcon.addEventListener('click', setNavDisplay, false);
  function setNavDisplay() {
    toggleClassName(indexNav, 'sm-nav');
    toggleClassName(menuIcon, 'active');
  }

  // active的menu
  setActiveNav();
  function setActiveNav() {
    let url = window.location.href;
    let movieType = url.split('/')[4];
    let menus = selectElesByClassName('work', wp);
    if (!url.includes('html')) { //首页
      if(url.includes('search')) { //首页
        return;
      } 
      let target = selectElesByClassName('home', wp)[0];
      addClassName(target, 'active');
      return;
    }
    let activeIndex;
    switch (movieType) {
      case 'action':
        activeIndex = 1;
        break;
      case 'comedy':
        activeIndex = 2;
        break;
      case 'romance':
        activeIndex = 3;
        break;
      case 'science':
        activeIndex = 4;
        break;
      case 'drama':
        activeIndex = 5;
        break;
      case 'suspense':
        activeIndex = 6;
        break;
      case 'war':
        activeIndex = 7;
        break;
      case 'horror':
        activeIndex = 8;
        break;
      case 'disaster':
        activeIndex = 9;
        break;
      case 'tv':
        activeIndex = 10;
        break;
      case undefined:
        activeIndex = 0;
        break;
      default:
        activeIndex = -1;
    }
    if(activeIndex === -1) {
      return;
    }
    addClassName(menus[activeIndex], 'active');
  }
  /**
   * 添加收藏
   */
  addSave.addEventListener('click', addSaveEvent, false);
  function addSaveEvent(e) {
    stopDefault(e);
    alert("请使用Ctrl+D进行添加");
  }

  /**
   *绑定浏览器窗口改变触发的事件
   */
  windowResizeEvent(() => {
    let { width } = getClientSize(); //获取浏览器文档区域的宽度
    if (width > 767) {
      removeClassName(indexNav, 'sm-nav');
      removeClassName(menuIcon, 'active');
    }
  });

  //绑定搜索事件
  bandSearchEvent();
  function bandSearchEvent() {
    rightBtn.addEventListener('click', handleRightSearch, false);
  }

  //大屏下搜索框回车事件
  if(isPc) {
    iptKeyUp();
    function iptKeyUp() {
      let ipt = selectElesByClassName('ipt', rightSearch)[0];
      ipt.addEventListener('keyup', (e) => {
        let event = e || window.e;
        let key = event.which || event.keyCode || event.charCode;
        if (key === 13) {
          handleRightSearch();
        }
      }, false);
    }
    //大屏下搜索框绑定事件
    rightBtn.addEventListener('click',handleRightSearch,false);
    function handleRightSearch() {
      let normalIpt = selectElesByClassName('ipt', rightSearch)[0];
      let value = normalIpt.value;
      if (!value) return;
      window.open(`/plus/search?keyword=${value}&page=1`);
    }
  } else {
    // 小屏下搜索按钮绑定事件
    navBtn.addEventListener('click', handleNavSearch, false);
    function handleNavSearch() {
      let smIpt = selectElesByClassName('ipt', indexNav)[0]
      let value = smIpt.value;
      if (!value) return;
      window.open(`/plus/search?keyword=${value}&page=1`);
    }
  }

  //注册回顶部事件
  selectEleById('goTop').addEventListener('click', scrollToTop, false);
    //回顶部事件
  function scrollToTop() {
    if (window.goTopTimer) {
      clearInterval(window.goTopTimer);
    }
    let obj = isPc ? document.documentElement || document.body || window : mainEle;
    window.goTopTimer = setInterval(() => {
      obj.scrollTop -= 100;
      if (obj.scrollTop <= 0) {
        clearInterval(window.goTopTimer);
      }
    }, 18)
  }

  //监听页面滚动
  if(!isPc) { //手机端
    mainEle.style.height='100vh';
    mainEle.style.webkitOverflowScrolling='touch';
    mainEle.addEventListener('scroll', throttle(isShowGoTop), false);
    function isShowGoTop() {
      let scrollTop = mainEle.scrollTop;
      if (scrollTop >= 300) {
        addClassName(goTop, 'show');
      } else {
        removeClassName(goTop, 'show');
      }
    }
  } else { //PC端
    document.addEventListener('scroll',throttle(issShowPcGoTop),false);
    function issShowPcGoTop() {
      let scrollTop = getScrollTop();
      if (scrollTop >= 300) {
        addClassName(goTop, 'show');
      } else {
        removeClassName(goTop, 'show');
      }
    }
  }

})();
