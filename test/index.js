'use strict';

var includes = require('../');
var test = require('tape');

test('as a function', function (t) {
	t.test('bad array/this value', function (st) {
		st.throws(includes.bind(null, undefined, 'a'), TypeError, 'undefined is not an object');
		st.throws(includes.bind(null, null, 'a'), TypeError, 'null is not an object');
		st.end();
	});

	require('./tests')(includes, t);

	t.end();
});
