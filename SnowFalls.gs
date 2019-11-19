// Global Objects.
var ObjTest = [
  /* Tugaike    */ [1002, 'Tugaike', 'Hakuba', 'http://www.tsugaike.gr.jp/', /area01.gif"([\s\S]*?)<\/ul>/,/\r\n|\r|\n/,3,'cm<\/li>', '<li class="snow">積雪 '],

];

var ObjHakuba = [
  /* Hakuba47   */ [1001, '47         ', 'Hakuba', 'https://www.hakuba47.co.jp/winter/', /a01_ico01.png"([\s\S]*?)<\/div>/,/\r\n|\r|\n/,2,'cm'],
  /* Tugaike    */ [1002, 'Tugaike', 'Hakuba', 'http://www.tsugaike.gr.jp/', /area01.gif"([\s\S]*?)<\/ul>/,/\r\n|\r|\n/,3,'cm<\/li>', '<li class="snow">積雪 '],
  /* Yeti       */ [1003, 'Yeti       ', 'Shizuoka', 'https://www.yeti-resort.com/', /<p>積雪量：([\s\S]*?)<\/p>/,/,/,1,'cm'],
  /* Karuizawa  */ [1004, 'Karuizawa', 'Nagano', 'https://www.princehotels.co.jp/ski/karuizawa/winter/', /<li>積雪量([\s\S]*?)<\/span>/,/\s/,2,'<span>','</span>,<br']
];


function test8() {

  var result = getAmount2(ObjTest);

  var Cache = CacheService.getScriptCache();  

  Logger.log('Karuizawa:' + Cache.get(ObjTest[0][0]));
  
}

  
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
  Logger.log(DataSnowfalls);
  
  // split the response data and store into array.
  var ArySnowfalls = String(DataSnowfalls).split(StrSep);

  // Exclude specified string 1.
  var IntSnowfalls = ArySnowfalls[IntOffset].replace(StrExclution1, "");
  Logger.log(IntSnowfalls);
  
  // Exclude specified string 2.
  if (typeof StrExclution2 !== 'undefined') {
    var IntSnowfalls = IntSnowfalls.replace(StrExclution2, "");  
    Logger.log(IntSnowfalls);
  }

  // Exclude specified string 2.
  if (typeof StrExclution3 !== 'undefined') {
    var IntSnowfalls = IntSnowfalls.replace(StrExclution3, "");  
    Logger.log(IntSnowfalls);
  }

  // Exclude space.
  var IntSnowfalls = IntSnowfalls.replace(/\s+/g, "");
  Logger.log(IntSnowfalls);

  // Null and Undefined and Not Number
  if ( IntSnowfalls !== "" && typeof IntSnowfalls !== 'undefined' && !isNaN(IntSnowfalls) ) {
    return IntSnowfalls;
  } else {
    return "n/a";
  }

}

// get amount of snowfall to script cache.
function getAmount(ObjWork) {
  
  var Cache = CacheService.getScriptCache();  

  for ( var i = 0; i < ObjWork.length; i++ ) {
    try { 
      var SnowfallAmount = fetchSnowFalls(ObjWork[i][0], ObjWork[i][1], ObjWork[i][2], ObjWork[i][3], ObjWork[i][4], ObjWork[i][5], ObjWork[i][6] );
      Cache.put(ObjWork[i][0], SnowfallAmount, 60);
      Logger.log(SnowfallAmount);
    } catch(err) { 
      console.log(err); 
      Logger.log('akan');
    }
  }
}

// get amount of snowfall to script cache.
function getAmount2(ObjWork) {
  
  var Cache = CacheService.getScriptCache();  

  for ( var i = 0; i < ObjWork.length; i++ ) {
    try { 
      var SnowfallAmount = fetchSnowFalls(ObjWork[i][3], ObjWork[i][4], ObjWork[i][5], ObjWork[i][6], ObjWork[i][7], ObjWork[i][8], ObjWork[i][9] );
      Cache.put(ObjWork[i][0], SnowfallAmount, 60*60*6);
    } catch(err) { 
      console.log(err); 
      Logger.log('akan');
    }
  }
}





function postSlack(SlackPayload){

  const SlackPostUrl = PropertiesService.getScriptProperties().getProperty('SLACK_URL');

  const SlackPostOptions = {
    'method' : 'POST',
    'contentType' : 'application/json; charset=UTF-8',
      'payload' : JSON.stringify(SlackPayload),
  };

  var res =  UrlFetchApp.fetch(SlackPostUrl, SlackPostOptions);
  Logger.log(res.getContentText());

}

function test6() {

  var result = getAmount2(ObjHakuba);

  var Cache = CacheService.getScriptCache();  

  for ( var i = 0; i < ObjHakuba.length; i++ ) {
    Logger.log(ObjHakuba[i][1] + ' :' + Cache.get(ObjHakuba[i][0]));
  }  
  
}


function test7() {

  var msg = '';
  var Cache = CacheService.getScriptCache();  
  
  for ( var i = 0; i < ObjHakuba.length; i++ ) {
    var msg = msg + ObjHakuba[i][1] + '  :  ' + Cache.get(ObjHakuba[i][0]) + '\n';
    Logger.log(ObjHakuba[i][1] + ' :' + Cache.get(ObjHakuba[i][0]));
  }  
  
  const SlackPayload = {
      'text'       : 'こんな感じやで',
      'attachments': [ {
        'title': 'Hakuba',
        'text': msg
       } ]
  };

  postSlack(SlackPayload);


}



