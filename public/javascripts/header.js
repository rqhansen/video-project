
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
})();
