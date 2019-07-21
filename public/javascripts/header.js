
(function () {
  /**
 * 显示与隐藏下拉导航
 */
  function setNavDisplay() {
    let indexNav = selectEleById('indexNav');
    let menuIcon = selectEleById('menuIcon');
    toggleClassName(indexNav, 'sm-nav');
    toggleClassName(menuIcon, 'active');
  }

  // active的menu
  setActiveNav();
  function setActiveNav() {
    let url = window.location.href;
    let wp = selectEleById('menuWp');
    if (!url.includes('html')) { //首页
      let target = selectElesByClassName('home', wp)[0];
      addClassName(target, 'active');
      return;
    }
    let movieType = url.split('/')[4];
    let menus = selectElesByClassName('work', wp);
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
      default:
        break;
    }
    addClassName(menus[activeIndex], 'active');
  }
  /**
   * 添加收藏
   */
  selectEleById('addSave').addEventListener('click', addSave, false);

  function addSave(e) {
    stopDefault(e);
    alert("请使用Ctrl+D进行添加");
  }

  /**
   *绑定浏览器窗口改变触发的事件
   */
  windowResizeEvent(() => {
    let { width } = getClientSize(); //获取浏览器文档区域的宽度
    if (width > 767) {
      removeClassName(selectEleById('indexNav'), 'sm-nav');
      removeClassName(selectEleById('menuIcon'), 'active');
    }
  });

  /**
   * 监听小屏下的菜单图标点击事件
   */
  selectEleById('menuIcon').addEventListener('click', setNavDisplay, false);

  //绑定搜索事件
  bandSearchEvent();

  function bandSearchEvent() {
    let rightSearch = selectEleById('rightSearch');
    let indexNav = selectEleById('indexNav');

    let rightBtn = selectElesByClassName('btn', rightSearch)[0];
    let navBtn = selectElesByClassName('btn', indexNav)[0];

    rightBtn.addEventListener('click', handleRightSearch, false);
    navBtn.addEventListener('click', handleNavSearch, false);
  }

  //大屏下搜索框绑定事件
  function handleRightSearch() {
    let ipt = selectElesByClassName('ipt', rightSearch)[0];
    let value = ipt.value;
    if (!value) return;
    window.open(`/plus/search?keyword=${value}&page=1`);
  }

  // 小屏下搜索按钮绑定事件
  function handleNavSearch() {
    let ipt = selectElesByClassName('ipt', indexNav)[0];
    let value = ipt.value;
    if (!value) return;
    window.open(`/plus/search?keyword=${value}&page=1`);
  }

  //监听页面滚动
  document.addEventListener('scroll', throttle(isShowGoTop), false);
  function isShowGoTop() {
    let scrollTop = getScrollTop();
    let goTop = selectEleById("goTop");
    if (scrollTop >= 300) {
      addClassName(goTop, 'show');
    } else {
      removeClassName(goTop, 'show');
    }
  }

  //注册回顶部事件
  selectEleById('goTop').addEventListener('click', goTop, false);
  //回顶部事件
  function goTop() {
    if (window.goTopTimer) {
      clearInterval(window.goTopTimer);
    }
    let obj = document.documentElement || document.body;
    window.goTopTimer = setInterval(() => {
      console.log(1);
      obj.scrollTop -= 100;
      if (obj.scrollTop <= 0) {
        clearInterval(window.goTopTimer);
      }
    }, 18)
  }

})();
