var includes = require('../');
includes.shim();

var test = require('tape');
var defineProperties = require('define-properties');
var isEnumerable = Object.prototype.propertyIsEnumerable;

test('shimmed', function (t) {
	t.equal(Array.prototype.includes.length, 1, 'Array#includes has a length of 1');
	t.equal(Array.prototype.includes.name, 'includes', 'Array#includes has name "includes"');

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(false, isEnumerable.call(Array.prototype, 'includes'), 'Array#includes is not enumerable');
		et.end();
	});

	require('./tests')(Function.call.bind(Array.prototype.includes), t);

	t.end();
});
