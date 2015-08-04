var test   = require('tape');
var labels = require('../lib/switcher');

test('crawl dwyl/tudo/labels', function(t){
	var project = 'dwyl/tudo/labels';
	labels(project, function(err, list) {
    console.log(list);
		t.ok(err === null, 'No Error when crawling ' + project +' (repo pages)');
    var question = list.entries.filter(function(item){
      return item.name === 'question';
    })
    question = question[0];
		t.ok(question.link === '/dwyl/tudo/labels/question', 'question.link is : '+question.link);
    t.ok(question.count > 1, 'question.count (number of open issues): '+question.count);
    t.ok(question.style.indexOf('#fff') > -1, 'question.styles are '+question.style);
		t.end();
	})
})
