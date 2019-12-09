var SsFileName = 'AmountOfSnowfall';

// Global Objects.
var ObjTest = [
  /* Test    */ [11999, 'テスト野郎', 'Test', 'https://sanosaka.jp/', /<div>山頂([\s\S]*?)cm<\/div>/,/\r\n|\r|\n/,1,'<div>積雪','cm</div>,</div>'],
];

var ObjTest2 = [
  /* Test    */ [12005, 'Tangram', 'Nagano', 'https://www.tangram.jp/ski/', /<th>積雪([\s\S]*?)<\/td>/,/\r\n|\r|\n/,1,'<td><strong>','</strong>cm</td>,</th>'],
];

var ObjHakuba = [
  /* Hakuba47   */ [11001, '47     ', 'Hakuba', 'https://www.hakuba47.co.jp/winter/', /a01_ico01.png"([\s\S]*?)<\/div>/,/\r\n|\r|\n/,2,'cm'],
  /* Tugaike    */ [11002, 'Tugaike', 'Hakuba', 'http://www.tsugaike.gr.jp/', /area01.gif"([\s\S]*?)<\/ul>/,/\r\n|\r|\n/,3,'cm<\/li>', '<li class="snow">積雪 '],
  /* Iwatake    */ [11003, 'Iwatake', 'Hakuba', 'https://iwatake-mountain-resort.com/winter', /<dt class="snow_cover">積雪([\s\S]*?)<\/dd>/,/\r\n|\r|\n/,1,'<dd class="snow_cover_state mountainSide">', 'cm</dd>,</dt>'],
  /* Happouone  */ [11004, 'Happouone', 'Hakuba', 'https://www.happo-one.jp/', /<h2>黒菱([\s\S]*?)cm<\/div>/,/\s/,20,'class="snow">積雪<strong>'],
  /* Hakunori   */ [11005, 'Hakunori', 'Hakuba', 'https://www.hakunori.com/', /<span>営業時間([\s\S]*?)<\/span>/,/\r\n|\r|\n/,2,'積雪 ／','cm<br>'],
  /* Sanosaka   */ [11006, 'Sanosaka', 'Hakuba', 'https://sanosaka.jp/', /<div>山頂([\s\S]*?)cm<\/div>/,/\r\n|\r|\n/,1,'<div>積雪','cm</div>,</div>'],

];

var ObjNagano = [
  /* Karuizawa  */ [12001, 'Karuizawa', 'Nagano', 'https://www.princehotels.co.jp/ski/karuizawa/winter/', /<li>積雪量([\s\S]*?)<\/span>/,/\s/,2,'<span>','</span>,<br'],
  /* Yeti       */ [12002, 'Yeti', 'Shizuoka', 'https://www.yeti-resort.com/', /<p>積雪量：([\s\S]*?)<\/p>/,/,/,1,'cm'],
  /* Nozawa     */ [12003, 'Nozawa', 'Nagano', 'http://www.nozawaski.com/', /<p class="snow_depth">積雪量([\s\S]*?)cm<\/span><\/p>/,/\r\n|\r|\n/,2,'<p class="meter">','<span>cm</span></p>,</p>'],
  /* Madarao    */ [12004, 'Madarao', 'Nagano', 'http://www.madarao.jp/ski', /<dt>積雪([\s\S]*?)<\/dd>/,/\r\n|\r|\n/,1,'<dd><strong>','</strong> cm</dd>,</dt>'],
  /* Tangram    */ [12005, 'Tangram', 'Nagano', 'https://www.tangram.jp/ski/', /<th>積雪([\s\S]*?)<\/td>/,/\r\n|\r|\n/,1,'<td><strong>','</strong>cm</td>,</th>'],
];

var ObjFukushima = [
  /* Grandeco   */ [13001, 'Grandeco', 'Fukushima', 'https://www.grandeco.com/winter/', /<dt>積雪([\s\S]*?)<\/dd>/,/\r\n|\r|\n/,1,'<dd>','<span>cm</span></dd>,</dt>'],
  /* Nekoma     */ [13002, 'Nekoma', 'Fukushima', 'https://www.nekoma.co.jp/', /積雪量([\s\S]*?)<\/dd>/,/\r\n|\r|\n/,2,'<dd class="cover_dl_dd fonten">','cm</dd>,'],
];



function test8() {

  var result = getAmount2(ObjTest2);

  var Cache = CacheService.getScriptCache();  

  Logger.log('Karuizawa:' + Cache.get(ObjTest2[0][0]));
  
}

function test22() {

  const MyDate = new Date();
  
  const MyDateJson = new DateJson(MyDate);
  const MyObjJson  = MyDateJson.get();

  var AryData = [[MyObjJson.yyyy + '/' + MyObjJson.mm + '/' + MyObjJson.dd]];

  var MySs = new CtrlSS(MyObjJson.season, ObjHakuba[0][2], MyObjJson.yyyy, MyObjJson.mm, MyObjJson.dd, 
                          MyObjJson.diff, AryData, (ObjHakuba.length + 1) );

  const MyObjData = MySs.output();

  // Set chart data
  var ChartData = Charts.newDataTable()
    .addColumn(Charts.ColumnType.DATE, "Date")
    .addColumn(Charts.ColumnType.NUMBER, "Value");

  for ( var i = 0; i < MyObjData.length; i++ ) {
    if ( MyObjData[i][0] !== "" && typeof MyObjData[i][0] !== 'undefined' && !isNaN(MyObjData[i][0]) ) {
      ChartData.addRow([MyObjData[i][0], MyObjData[i][1]]);
    }
  }
  
  ChartData.build();

  if ( MyObjData[MyObjData.length-1][1] > MyObjData[MyObjData.length-2][1] ) {
    var MyObjColor = ['#00DD00', '#78FF94'];
  } else if ( MyObjData[MyObjData.length-1][1] < MyObjData[MyObjData.length-2][1] ) {
    var MyObjColor = ['#FF0000', '#FF5192'];
  } else {
    var MyObjColor = ['#555555', '#bbbbbb'];
  }

  var ChartStyle = Charts.newAreaChart()
      .setDataTable(ChartData)
      .setStacked()
      .setRange(0, 40)
      .setTitle(ObjHakuba[0][1])
      .setTitleTextStyle(Charts.newTextStyle().setColor('#333').setFontSize(16))
      .setLegendPosition(Charts.Position.NONE)
      .setColors(MyObjColor)
      .build();

  Logger.log(MyObjData.length);

  var imageData = ChartStyle.getAs('image/png');

  var data={
    token:PropertiesService.getScriptProperties().getProperty('SLACK_TOKEN'), 
    channels:PropertiesService.getScriptProperties().getProperty('SLACK_CHANNEL'),
    file:imageData,
    title:'image'
  };

  var option={
    'method':'POST',
    'payload':data
  };

  var res =  UrlFetchApp.fetch('https://slack.com/api/files.upload',option);
  Logger.log(res.getContentText());

}

function test21() {

  var data = Charts.newDataTable()
    .addColumn(Charts.ColumnType.STRING, "Month")
    .addColumn(Charts.ColumnType.NUMBER, "In Store")
    .addRow(["January", 10])
    .addRow(["February", 82])
    .addRow(["March", 20])
    .addRow(["April", 25])
    .addRow(["May", 30])
    .build();

  
  var chart = Charts.newAreaChart()
      .setDataTable(data)
      .setStacked()
      .setRange(0, 40)
      .setTitle("Sales per Month")
      .setTitleTextStyle(Charts.newTextStyle().setColor('#333').setFontSize(16))
      .setColors(['#555', '#bbb'])
      .setLegendPosition(Charts.Position.NONE)
      .build();

//  var imageData = Utilities.base64Encode(chart.getAs('image/png').getBytes());
  var imageData = chart.getAs('image/png');

  var data={
    token:PropertiesService.getScriptProperties().getProperty('SLACK_TOKEN'), 
    channels:PropertiesService.getScriptProperties().getProperty('SLACK_CHANNEL'),
    file:imageData,
    title:'image'
  };
  var option={
    'method':'POST',
    'payload':data
  };

  var res =  UrlFetchApp.fetch('https://slack.com/api/files.upload',option);
  Logger.log(res.getContentText());
}

function test11() {

  var PostMsg = '';
  
  const MySnowHakuba = new SnowfallAmount(ObjHakuba);
  MySnowHakuba.get();
  MySnowHakuba.putss();
  var PostMsg = PostMsg + MySnowHakuba.getmsg();

  const MySnowNagano = new SnowfallAmount(ObjNagano);
  MySnowNagano.get();
  MySnowNagano.putss();
  var PostMsg = PostMsg + MySnowNagano.getmsg();

  const MySnowFukushima = new SnowfallAmount(ObjFukushima);
  MySnowFukushima.get();
  MySnowFukushima.putss();
  var PostMsg = PostMsg + MySnowFukushima.getmsg();
  
  const SlackPayload = {
    'text' : 'こんぐらいやで' + '\n' + PostMsg,
  };

  postSlack(SlackPayload);

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
  Logger.log(ArySnowfalls[IntOffset]);
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
    return 0;
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

// Snowfall Control Class
var SnowfallAmount = function (ObjRegion) {
  this.ObjRegion = ObjRegion;
};

SnowfallAmount.prototype = {

  // Put amount of snowfall from web site to cache.
  get : function() {

    var result = getAmount2(this.ObjRegion);
    var Cache = CacheService.getScriptCache();  

    for ( var i = 0; i < this.ObjRegion.length; i++ ) {
      Logger.log(this.ObjRegion[i][1] + ' :' + Cache.get(this.ObjRegion[i][0]));
    }  

  },

  // Put to spreadsheet.
  putss : function() {

    const MyDateJson = new DateJson();
    const MyObjJson  = MyDateJson.get();

    var AryData = [[MyObjJson.yyyy + '/' + MyObjJson.mm + '/' + MyObjJson.dd]];
    var Cache = CacheService.getScriptCache();  
  
    for ( var i = 0; i < this.ObjRegion.length; i++ ) {
      AryData[0][i + 1] = Cache.get(this.ObjRegion[i][0]);
    }
  
    var MySs = new CtrlSS(MyObjJson.season, this.ObjRegion[0][2], MyObjJson.yyyy, MyObjJson.mm, MyObjJson.dd, 
                          MyObjJson.diff, AryData, (this.ObjRegion.length + 1) );

    MySs.input();

  },

  // Post message to Slack order by identifier.
  postslack : function() {
    var PostMsg = '';
    var Cache = CacheService.getScriptCache();  
  
    for ( var i = 0; i < this.ObjRegion.length; i++ ) {
      var PostMsg = PostMsg + this.ObjRegion[i][1] + '  :  ' + Cache.get(this.ObjRegion[i][0]) + '\n';
      Logger.log(this.ObjRegion[i][1] + ' :' + Cache.get(this.ObjRegion[i][0]));
    }  

    const SlackPayload = {
        'text'       : 'こんぐらいやで',
        'attachments': [ {
          'title': this.ObjRegion[0][2],
          'text': PostMsg
         } ]
    };

    postSlack(SlackPayload);

  },

  // Post message to Slack order by values descending.
  postslack2 : function() {

    var ObjTmp = [];
    var PostMsg = '';
    var Cache = CacheService.getScriptCache();  
  
    for ( var i = 0; i < this.ObjRegion.length; i++ ) {
      ObjTmp[i] = { name: this.ObjRegion[i][1], value: Cache.get(this.ObjRegion[i][0]) };
    }  

    ObjTmp.sort(function(a, b) { if (a.value <= b.value) { return 1; } else { return -1; }});

    for ( var i = 0; i < this.ObjRegion.length; i++ ) {
      var PostMsg = PostMsg + ObjTmp[i].name + '  :  ' + ObjTmp[i].value + '\n';
    }  

    const SlackPayload = {
      'text' : 'こんぐらいやで' + '\n' +
               '*' + this.ObjRegion[0][2] + '*' + '\n' +
               PostMsg,
    };

    postSlack(SlackPayload);

  },
  
  // Post message to Slack order by values descending.
  getmsg : function() {

    var ObjTmp = [];
    var PostMsg = '';
    var Cache = CacheService.getScriptCache();  
  
    for ( var i = 0; i < this.ObjRegion.length; i++ ) {
      ObjTmp[i] = { name: this.ObjRegion[i][1], value: Cache.get(this.ObjRegion[i][0]) };
    }  

    ObjTmp.sort(function(a, b) { if (a.value <= b.value) { return 1; } else { return -1; }});

    for ( var i = 0; i < this.ObjRegion.length; i++ ) {
      var PostMsg = PostMsg + ObjTmp[i].name + '  :  ' + ObjTmp[i].value + '\n';
    }  

    return '*' + this.ObjRegion[0][2] + '*' + '\n' + PostMsg + '\n' 

  }


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

    SheetName.getRange(this.Diff, 1, 1, this.Length).setValues(this.Value);

  },

  // get identifier of file on root directory.
  output : function() {

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

    const Data = SheetName.getRange(1, 1, this.Diff, this.Length).getValues();

    return Data;

  }

}


