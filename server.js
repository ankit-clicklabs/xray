'use strict';
var request = require('requests');
var url="http://matchcentre.starsports.com/cricket/data/180930.json?nocache=";

var notifier = require('node-notifier');
var http=require('http');

var CronJob = require('cron').CronJob;
new CronJob('*/10 * * * * 1-20', function() {
	var random=Math.floor(Math.random() * 1000000000000);
 url+=random;
http.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        var fbResponse = JSON.parse(body);
      //console.log(fbResponse.Innings);
      var score=fbResponse.Innings[0];
      var Total= score.Total;
 var Wickets= score.Wickets;
 var Overs= score.Overs;
 var scoreUpdate=Total+"/"+Wickets+" in "+Overs;
      //console.log(scoreUpdate);
      
      notifier.notify({
  'title': 'Score Update',
  'message': scoreUpdate
});
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});
}, null, true, 'America/Los_Angeles');
