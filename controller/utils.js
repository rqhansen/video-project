
/**
 * 日期转为2019-07-03格式
 * @param {String} dateStr 日期
 */
module.exports.formatDate = function(date) {
    let dateStr = date.toLocaleDateString();
    let dateSplit = dateStr.split('-');
    dateSplit.forEach((item,idx) =>{
        if(idx) {
            if(item<10) dateSplit[idx] = `0${item}`;
        }
    })
    return dateSplit.join('-');
}



