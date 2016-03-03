var x = require('x-ray')();
var url ="https://news.google.co.in/";
var redis = require('redis'),
    client = redis.createClient();
    var _ = require('lodash-node');
var notifier = require('node-notifier');
var cachedNews=[]
client.lrange('testlist', 0, -1, function(err, reply) {
 cachedNews=reply;
});
x(url, '.blended-wrapper', [{
  title: 'span.titletext',
 page:x('a.article@href','title'),
}])(function(err,obj){
var newsArr=[];
	obj.forEach(function(news){
		newsArr.push(news.title);

	});

	var newItems=_.difference(newsArr,cachedNews);
	
	if(newItems.length>0){
		 notifier.notify({
  'title': 'Score Update',
  'message': newItems[0]+"\n"+newItems[0]
});
	var multi = client.multi();
	for (var i=0; i<newsArr.length; i++) {
    multi.rpush('testlist', newsArr[i]);
}
multi.exec(function(errors, results) {
	if(err){
		console.log(err);

	}else{
		//console.log(results);
	}
})

}else{
	
}
});

