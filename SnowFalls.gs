var SsFileName = 'AmountOfSnowfall';

// Global Objects.
var ObjTest = [
  /* Tugaike    */ [1002, 'Tugaike', 'Hakuba', 'http://www.tsugaike.gr.jp/', /area01.gif"([\s\S]*?)<\/ul>/,/\r\n|\r|\n/,3,'cm<\/li>', '<li class="snow">積雪 '],

];

var ObjNagano = [
  /* Hakuba47   */ [1001, '47         ', 'Nagano', 'https://www.hakuba47.co.jp/winter/', /a01_ico01.png"([\s\S]*?)<\/div>/,/\r\n|\r|\n/,2,'cm'],
  /* Tugaike    */ [1002, 'Tugaike', 'Nagano', 'http://www.tsugaike.gr.jp/', /area01.gif"([\s\S]*?)<\/ul>/,/\r\n|\r|\n/,3,'cm<\/li>', '<li class="snow">積雪 '],
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

  var result = getAmount2(ObjNagano);

  var Cache = CacheService.getScriptCache();  

  for ( var i = 0; i < ObjNagano.length; i++ ) {
    Logger.log(ObjNagano[i][1] + ' :' + Cache.get(ObjNagano[i][0]));
  }  
  
}


function test7() {

  var msg = '';
  var Cache = CacheService.getScriptCache();  
  
  for ( var i = 0; i < ObjNagano.length; i++ ) {
    var msg = msg + ObjNagano[i][1] + '  :  ' + Cache.get(ObjNagano[i][0]) + '\n';
    Logger.log(ObjNagano[i][1] + ' :' + Cache.get(ObjNagano[i][0]));
  }  
  
  const SlackPayload = {
      'text'       : 'こんな感じやで',
      'attachments': [ {
        'title': ObjNagano[0][2],
        'text': msg
       } ]
  };

  postSlack(SlackPayload);


}

function test10() {

  var date = new Date('2020/11/1');
  const MyDateJson = new DateJson();
  const MyObjJson  = MyDateJson.get();

  Logger.log(MyObjJson.season);
  Logger.log(MyObjJson.yyyy);
  Logger.log(MyObjJson.mm);
  Logger.log(MyObjJson.dd);
  Logger.log(MyObjJson.diff);

  var ary = [[MyObjJson.yyyy + '/' + MyObjJson.mm + '/' + MyObjJson.dd]];
  var Cache = CacheService.getScriptCache();  
  
  for ( var i = 0; i < ObjNagano.length; i++ ) {
    ary[0][i + 1] = Cache.get(ObjNagano[i][0]);
  }  
Logger.log(ary);

  
  var MySs = new CtrlSS(MyObjJson.season, ObjNagano[0][2], MyObjJson.yyyy, MyObjJson.mm, MyObjJson.dd, MyObjJson.diff, ary, (ObjNagano.length + 1) );

  MySs.input();

}


// JSON Control Class
var DateJson = function (TextDate) {
  this.TextDate = TextDate;
};

DateJson.prototype = {

  // return target date and time by JSON
  get : function() {

    const CurrentDate = new Date();

    if ( !this.TextDate ) {
      var Stryyyy = CurrentDate.getFullYear();
      var Strmm   = ( CurrentDate.getMonth() + 1 );
      var Strdd   = CurrentDate.getDate();
    } else {
      var Stryyyy = this.TextDate.getFullYear();
      var Strmm   = ( this.TextDate.getMonth() + 1 );
      var Strdd   = this.TextDate.getDate();
    }

    if ( Strmm < 11 ) {
      var TargetSeason = ( Stryyyy - 1 ) + '-' + Stryyyy;
      var InitialDate = new Date( ( Stryyyy - 1 ) + '/11/01 00:00:00');
    } else {
      var TargetSeason = Stryyyy + '-' + ( Stryyyy + 1 );
      var InitialDate = new Date( Stryyyy + '/11/01 00:00:00');
    }

    const TargetDate = new Date(Stryyyy + '/' + Strmm + '/' + Strdd + ' ' + '00:00:01');
    const TargetRelative = Math.ceil( ( TargetDate - InitialDate )  / ( 1000 * 60 * 60 * 24 ) );

    const JsonDateOut = {
      "season" : TargetSeason,
      "yyyy"   : Stryyyy,
      "mm"     : ( '00' + ( Strmm ) ).slice(-2),
      "dd"     : ( '00' + ( Strdd ) ).slice(-2),
      "diff"   : TargetRelative,
    };

    return JsonDateOut;

  }
}

// File Control Class
var CtrlFile = function ( FileName ) {
  this.FileName = FileName;
}

CtrlFile.prototype = {

  // get identifier of file on root directory.
  getSSID : function() {

    const RootId = DriveApp.getRootFolder().getId();
    const RootFolder = DriveApp.getFolderById(RootId);  
    const RootFiles = RootFolder.getFiles();

    while (RootFiles.hasNext()) {
      var FileName = RootFiles.next();
    
      if ( FileName.getName() === this.FileName ) {
        var SsId = FileName.getId();
        break;
      }
    }
    return SsId;
  }
}


// Control Spread Sheet Class
var CtrlSS = function ( Season, UserName, yyyy, mm, dd, Diff, Value, Length ) {
  this.Season     = Season;
  this.UserName   = UserName;
  this.yyyy       = yyyy;
  this.mm         = mm;
  this.dd         = dd;
  this.Diff       = Diff;
  this.Value      = Value;
  this.Length     = Length;
}

CtrlSS.prototype = {

  // get identifier of file on root directory.
  input : function() {

    // Set Spread Sheet Name like AmountOfSnowfall_2019-2020.
    const SsName = SsFileName + '_' + this.Season;

    // Get Spread Sheet ID from Script Properties.
    var SsId = PropertiesService.getScriptProperties().getProperty(SsName);

    // If not exist in Properties then get from DriveApp
    if ( !SsId ) {
      var MySs = new CtrlFile(SsName);
      var SsId = MySs.getSSID();
      var UserProp = PropertiesService.getScriptProperties();
      UserProp.setProperty(SsName, SsId);
    }

    // If not exist SS then create.
    if ( !SsId ) {
      SpreadsheetApp.create(SsName);
      var MySs = new CtrlFile(SsName);
      var SsId = MySs.getSSID();
      var UserProp = PropertiesService.getScriptProperties();
      UserProp.setProperty(SsName, SsId);
    }

    // open spread sheet by id.
    const ObjSs = SpreadsheetApp.openById(SsId);

    // get sheet name.
    var SheetName = ObjSs.getSheetByName(this.UserName);

    // if not exist sheet then insert.
    if ( !SheetName ) {
      ObjSs.insertSheet(this.UserName);
      var SheetName = ObjSs.getSheetByName(this.UserName);
    }

//    SheetName.getRange(this.Diff,1).setValue(this.yyyy + '/' + this.mm + '/' + this.dd);
//    SheetName.getRange(this.Diff,2).setValue(this.Value);

    SheetName.getRange(this.Diff, 1, 1, this.Length).setValues(this.Value);

  }
}


