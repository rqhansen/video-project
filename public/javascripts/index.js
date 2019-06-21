
//处理日期样式
let container = document.getElementsByClassName('media-list')[0];
let time = container.getElementsByTagName('time');
let nowDate = new Date().getTime();
for(let i = 0,len = time.length;i<len;i++) {
    let innerTime = time[i].innerHTML;
    time[i].innerHTML = formatDate(innerTime);
    let pastDate = new Date(innerTime);
    let flag = nowDate-pastDate.getTime()<259200000;
    if(flag) {
        time[i].style.color='#be1204';
    }
}



