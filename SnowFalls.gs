// 公式サイトより山頂の積雪量を取得
// 白馬 47
function fetchHakuba47() {
  var fetch = UrlFetchApp.fetch("https://www.hakuba47.co.jp/winter/");
  var response = fetch.getContentText();
  var strRegexp=/a01_ico01.png"([\s\S]*?)<\/div>/;
  var dataSnowfalls = response.match(strRegexp);
Logger.log(dataSnowfalls);
  var arySnowfalls = String(dataSnowfalls).split(/\r\n|\r|\n/);
  var intSnowfalls = arySnowfalls[2].replace("cm", "");
Logger.log(intSnowfalls);  

  var intSnowfalls = intSnowfalls.replace(/\s+/g, "");
Logger.log(intSnowfalls);  


Logger.log(intSnowfalls);  
  return intSnowfalls;
}

// 公式サイトより山頂の積雪量を取得
// 尾瀬戸倉
function fetchOzetokura() {
  var fetch = UrlFetchApp.fetch("http://www.ozetokura.co.jp/snowpark/");
  var response = fetch.getContentText();
  
  var strRegexp=/<p>天候：([\s\S]*?)<\/p>/;
  var dataSnowfalls = response.match(strRegexp);
  var arySnowfalls = String(dataSnowfalls).split(/：/);
  var intSnowfalls = arySnowfalls[3].replace('cm　雪質', "");
  var intSnowfalls = intSnowfalls.replace(/\s+/g, "");
  Logger.log(intSnowfalls);  

  return intSnowfalls;
}

// 公式サイトより山頂の積雪量を取得
// おぐなほたか
function fetchOgnahotaka() {
  var fetch = UrlFetchApp.fetch("http://ognahotaka.jp/");
  var response = fetch.getContentText();
  
  var strRegexp=/title_report.png"([\s\S]*?)<div class="topics">/;
  var dataSnowfalls = response.match(strRegexp);
  var arySnowfalls = String(dataSnowfalls).split(/\r\n|\r|\n/);
  var intSnowfalls = arySnowfalls[9].replace('cm</p></div>', "");
  var intSnowfalls = intSnowfalls.replace('<div class="fallensnow"><p>', "");
  var intSnowfalls = intSnowfalls.replace(/\s+/g, "");
  Logger.log(intSnowfalls);  
  
  return intSnowfalls;
}


