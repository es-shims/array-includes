var includes = require('../');
var test = require('tape');

test('as a function', function (t) {
	require('./tests')(includes, t);

	t.end();
});
