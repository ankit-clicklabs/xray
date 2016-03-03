'use strict';
var request = require('requests');
var url="http://matchcentre.starsports.com/cricket/data/180931.json?nocache=";//TODO make this url dynamic

var notifier = require('node-notifier');
var http=require('http');

var CronJob = require('cron').CronJob;
//run score update every 20 seconds
new CronJob('*/10 * * * * 1-20', function() {
  //append a random number to url to get non-cached response

	var random=Math.floor(Math.random() * 1000000000000);

 url+=random;

http.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        var jsonResp = JSON.parse(body);
    
      var score=jsonResp.Innings[0];
      console.log(jsonResp);
      var Total= score.Total;
 var Wickets= score.Wickets;
 var Overs= score.Overs;
 var scoreUpdate=Total+"/"+Wickets+" in "+Overs;
      //send desktop notification
      notifier.notify({
  'title': 'Score Update',
  'message': scoreUpdate
});

    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});
     notifier.on('click', function (notifierObject, options) {
  console.log(url);
  
});
}, null, true, 'America/Los_Angeles');
