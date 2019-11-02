// Get HTML Content.
function getHtml(TargetUrl){

  try {
    const HttpResponse = UrlFetchApp.fetch(TargetUrl);
    const ContentText = HttpResponse.getContentText("UTF-8");
  } catch(err) {
      console.log(err);
  }
    
  return ContentText;
  
}

// Extract the amount of snowfall from fetched HTML response.
function fetchSnowFalls(TargetUrl, StrRegexp, StrSep, IntOffset, StrExclution1, StrExclution2, StrExclution3) {
  
  // Get HTML response and extract by expression.
  var ContentText = getHtml(TargetUrl);
  var DataSnowfalls = ContentText.match(StrRegexp);

  // split the response data and store into array.
  var ArySnowfalls = String(DataSnowfalls).split(StrSep);

  // Exclude specified string 1.
  var IntSnowfalls = ArySnowfalls[IntOffset].replace(StrExclution1, "");

  // Exclude specified string 2.
  if (typeof StrExclution2 !== 'undefined') {
    var IntSnowfalls = IntSnowfalls.replace(StrExclution2, "");  
  }

  // Exclude specified string 2.
  if (typeof StrExclution3 !== 'undefined') {
    var IntSnowfalls = IntSnowfalls.replace(StrExclution3, "");  
  }

  // Exclude space.
  var IntSnowfalls = IntSnowfalls.replace(/\s+/g, "");

  // Null and Undefined and Not Number
  if ( IntSnowfalls !== "" && typeof IntSnowfalls !== 'undefined' && !isNaN(IntSnowfalls) ) {
    return IntSnowfalls;
  } else {
    return "n/a";
  }

}



function test() {

  //Hakuba47
  Logger.log("Hakuba47");

  try { 
    const bbb = fetchSnowFalls('https://www.hakuba47.co.jp/winter/', /a01_ico01.png"([\s\S]*?)<\/div>/,/\r\n|\r|\n/,2,'cm');
    Logger.log(bbb);
  } 
    catch(err) { console.log(err); Logger.log('akan'); 
  }


  // Ozetokura
  Logger.log("Ozetokura");
  try { 
    const ccc = fetchSnowFalls('http://www.ozetokura.co.jp/snowpark/', /<p>天候：([\s\S]*?)<\/p>/,/：/,3,'cm　雪質');
    Logger.log(ccc);
  } 
    catch(err) { console.log(err); Logger.log('akan');
  }



}





function fetchHakuba47() {
  var TargetUrl = "https://www.hakuba47.co.jp/winter/";
  var StrRegexp=/a01_ico01.png"([\s\S]*?)<\/div>/;
  
  var ContentText = getHtml(TargetUrl);

  var DataSnowfalls = ContentText.match(StrRegexp);
  Logger.log(DataSnowfalls);
  
  var ArySnowfalls = String(DataSnowfalls).split(/\r\n|\r|\n/);
  Logger.log(ArySnowfalls[0]);
  Logger.log(ArySnowfalls[1]);
  Logger.log(ArySnowfalls[2]);

  var IntSnowfalls = ArySnowfalls[2].replace("cm", "");
  Logger.log(IntSnowfalls);
  
  var IntSnowfalls = IntSnowfalls.replace(/\s+/g, "");
  Logger.log(IntSnowfalls);

  return IntSnowfalls;
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


