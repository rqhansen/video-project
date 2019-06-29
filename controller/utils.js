
/**
 * 日期转为2019-07-03格式
 * @param {String} dateStr 日期
 */
module.exports.formatDate = function (date) {
    // let dateStr = date.toLocaleDateString();
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let dt = date.getDate();
    m = m >= 10 ? m : `0${m}`;
    dt = dt >= 10 ? dt : `0${dt}`;
    return `${y}-${m}-${dt}`;
    // console.log(dt);

    // let dateSplit = dateStr.split('-');
    // dateSplit.forEach((item, idx) => {
    //     if (idx) {
    //         if (item < 10) dateSplit[idx] = `0${item}`;
    //     }
    // })
    // return dateSplit.join('-');
}



