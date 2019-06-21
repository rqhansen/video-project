
module.exports.webSiteUrl = 'https://www.piaohua.com'; //要爬取的电影网站
module.exports.filmTypes = ['dongzuo', 'xiju', 'aiqing', 'kehuan', 'juqing', 'xuannian', 'zhanzheng', 'kongbu', 'zainan', 'lianxuju', 'dongma', 'zongyipan'];
// module.exports.movieSql = "insert into films (typeId,fullName,pureName,pubDate,indexImgSrc,detailImgSrc,transName,year,country,types,language,caption,onDate,imdbScore,imdbLink,format,fileSize,videoSize,filmLength,doubanScore,doubanLink,director,editor,actor,label,shortIntro,getAward,downUrl) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
module.exports.movieSql = "insert into films (typeId,typeName,fullName,pureName,pubDate,indexImgSrc,detailImgSrc,transName,subPureName,year,country,types,language,caption,onDate,imdbScore,imdbLink,format,fileSize,videoSize,filmLength,doubanScore,doubanLink,director,editor,actor,label,shortIntro,getAward,downUrl) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
module.exports.defaultImgUrl = '/images/defaultpic.gif';
module.exports.connectConfig = { //数据库连接池的配置
    host: '127.0.0.1',
    user: 'root',
    password: 'admin',
    database: 'movie'
}
module.exports.movieTypes = [ //电影类型
    { '1' : 'action'},
    { '2' : 'comedy' },
    { '3' : 'romance' },
    { '4' : 'science'},
    { '5' : 'drama' },
    { '6' : 'suspense' },
    { '7' : 'war' },
    { '8' : 'horror' },
    { '9' : 'disaster' }
];

module.exports.moviekeys = {
    typeId: " ",
    typeName: " ",
    fullName: " ",
    pureName: " ",
    pubDate: " ",
    indexImgSrc: " ",
    detailImgSrc:" ",
    transName: " ",
    subPureName:" ",
    year: " ",
    country: " ",
    types: " ",
    language: " ",
    caption: " ",
    onDate: " ",
    imdbScore: " ",
    imdbLink: " ",
    format: " ",
    fileSize: " ",
    videoSize: " ",
    filmLength: " ",
    doubanScore: " ",
    doubanLink: " ",
    director: " ",
    editor: " ",
    actor: " ",
    label: " ",
    shortIntro: " ",
    getAward: " ",
    downUrl: " "
}
