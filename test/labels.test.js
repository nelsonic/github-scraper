var test   = require('tape');
var labels = require('../lib/labels');

test('expect 400 when repo not stated', function(t){
  var project = '';
  labels(project, function(err){
    t.ok(err === 400, 'got 400 error when no user defined');
    t.end();
  })
})

test('expect random (non-existent) repo to return 404 error ', function(t){
	var project = Math.floor(Math.random() * 1000000000000000); // a nice long "random" number
	labels(project, function(err, list){
		t.ok(err === 404, 'Got 404 Error when repo does not exist');
		t.ok(typeof list === 'undefined', '@param list is undefined (as expected)');
		t.end();
	})
})

test('crawl dwyl/tudo/labels', function(t){
	var project = 'dwyl/tudo';
	labels(project, function(err, list) {
    console.log(list);
		t.ok(err === null, 'No Error when crawling ' + project +' (repo pages)');
    var question = list.filter(function(item){
      return item.name === 'question';
    })
    question = question[0];
		t.ok(question.link === '/dwyl/tudo/labels/question', 'question.link is : '+question.link);
    t.ok(question.count > 1, 'question.count (number of open issues): '+question.count);
    t.ok(question.style.indexOf('#fff') > -1, 'question.styles are '+question.style);
		t.end();
	})
})
