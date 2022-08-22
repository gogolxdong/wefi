/*
 * @Author: jie 
 * @Date: 2022-07-06 14:11:54 
 * @Last Modified by:   jie 
 * @Last Modified time: 2022-07-06 14:11:54 
 */


function setRem() {
    // 320 默认大小16px; 320px = 20rem ;每个元素px基础上/16
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    //得到html的Dom元素
    let htmlDom = document.getElementsByTagName('html')[0];
    //设置根元素字体大小
    let clientWidth = document.body.clientWidth
    //1920设计稿一套样式，750设计稿一套样式
    htmlDom.style.fontSize = clientWidth < 900 ? htmlWidth / 16 + 'px' : htmlWidth / 120 + 'px';
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
    setRem()
}