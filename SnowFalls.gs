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

function getAmount(ObjWork) {

  for ( var i = 0; i < ObjWork.length; i++ ) {
    try { 
      var aaa = fetchSnowFalls(ObjWork[i][0], ObjWork[i][1], ObjWork[i][2], ObjWork[i][3], ObjWork[i][4], ObjWork[i][5], ObjWork[i][6] );
      Logger.log(aaa);
    } catch(err) { 
      console.log(err); 
      Logger.log('akan');
      return 'akan';
    }
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


function test2() {

  ary = [
    /* Hakuba47   */ ['https://www.hakuba47.co.jp/winter/', /a01_ico01.png"([\s\S]*?)<\/div>/,/\r\n|\r|\n/,2,'cm'],
    /* Ozetokura  */ ['http://www.ozetokura.co.jp/snowpark/', /<p>天候：([\s\S]*?)<\/p>/,/：/,3,'cm　雪質'],
    /* Yeti       */ ['https://www.yeti-resort.com/', /<p>積雪量：([\s\S]*?)<\/p>/,/,/,1,'cm'],
    /* Ognahotaka */ ['http://ognahotaka.jp/', /title_report.png"([\s\S]*?)<div class="topics">/,/\r\n|\r|\n/,9,'cm</p></div>','<div class="fallensnow"><p>']
  ];

  for ( var i = 0; i < ary.length; i++ ) {

    Logger.log(ary[i][0]);
    Logger.log(ary[i][1]);
    Logger.log(ary[i][2]);
    Logger.log(ary[i][3]);
    Logger.log(ary[i][4]);
    Logger.log(ary[i][5]);
    Logger.log(ary[i][6]);
    try { 
      var aaa = fetchSnowFalls(ary[i][0], ary[i][1], ary[i][2], ary[i][3], ary[i][4], ary[i][5], ary[i][6] );
      Logger.log(aaa);
    } 
      catch(err) { console.log(err); Logger.log('akan'); 
    }
  }

}


function test3() {

  ary = [
    /* Yeti       */ ['https://www.yeti-resort.com/', /<p>積雪量：([\s\S]*?)<\/p>/,/,/,1,'cm']
  ];

  for ( var i = 0; i < ary.length; i++ ) {
    try { 
      var aaa = fetchSnowFalls(ary[i][0], ary[i][1], ary[i][2], ary[i][3], ary[i][4], ary[i][5], ary[i][6] );
      Logger.log(aaa);
    } 
      catch(err) { console.log(err); Logger.log('akan'); 
    }
  }

}


function test4() {

  ary = [
    /* Hakuba47   */ ['https://www.hakuba47.co.jp/winter/', /a01_ico01.png"([\s\S]*?)<\/div>/,/\r\n|\r|\n/,2,'cm'],
    /* Ozetokura  */ ['http://www.ozetokura.co.jp/snowpark/', /<p>天候：([\s\S]*?)<\/p>/,/：/,3,'cm　雪質'],
    /* Yeti       */ ['https://www.yeti-resort.com/', /<p>積雪量：([\s\S]*?)<\/p>/,/,/,1,'cm'],
    /* Ognahotaka */ ['http://ognahotaka.jp/', /title_report.png"([\s\S]*?)<div class="topics">/,/\r\n|\r|\n/,9,'cm</p></div>','<div class="fallensnow"><p>']
  ];

  var result = getAmount(ary);
  Logger.log(result);


}




var ctrlSnowfall = function ( ObjWork ) {
  this.ObjWork    = ObjWork;
  this.bbb = 'test';
}

ctrlSnowfall.prototype = {

  // get status of GCE instances.
  getAmount : function() {
    Logger.log(this.bbb);
    Logger.log(this.ObjWork[0][0]);
    for ( var i = 0; i < this.ObjWork.length; i++ ) {
      try { 
        var aaa = fetchSnowFalls(this.ObjWork[i][0], this.ObjWork[i][1], this.ObjWork[i][2], this.ObjWork[i][3], this.ObjWork[i][4], this.ObjWork[i][5], this.ObjWork[i][6] );
        Logger.log(aaa);
        return aaa;
      } catch(err) { 
        console.log(err); 
        Logger.log('akan');
        return 'akan';
      }
    }

  }
}