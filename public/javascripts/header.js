
(function() {
  /**
 * 显示与隐藏下拉导航
 */
function setNavDisplay() {
  let indexNav = selectEleById('indexNav');
  let menuIcon = selectEleById('menuIcon');
  toggleClassName(indexNav, 'sm-nav');
  toggleClassName(menuIcon, 'active');
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

function bandSearchEvent(){
  let rightSearch = selectEleById('rightSearch');
  let indexNav = selectEleById('indexNav');
  
  let rightBtn = selectElesByClassName('btn', rightSearch)[0];
  let navBtn = selectElesByClassName('btn', indexNav)[0];

  rightBtn.addEventListener('click', handleRightSearch,false);
  navBtn.addEventListener('click', handleNavSearch,false);
}

//大屏下搜索框绑定事件
function handleRightSearch() {
    let ipt = selectElesByClassName('ipt', rightSearch)[0];
    let value = ipt.value;
    if (!value) return;
    window.open(`/plus/search?keyword=${value}&page=1`);
}

//小屏下搜索按钮绑定事件
function handleNavSearch() {
  let ipt = selectElesByClassName('ipt', indexNav)[0];
  let value = ipt.value;
  if (!value) return;
  window.open(`/plus/search?keyword=${value}&page=1`);
}
})();
