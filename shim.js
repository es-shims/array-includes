'use strict';

var define = require('define-properties');
var implementation = require('./implementation');
var getPolyfill = require('./polyfill');

module.exports = function shimArrayPrototypeIncludes() {
	var polyfill = getPolyfill();
	if (Array.prototype.includes !== polyfill) {
		define(Array.prototype, { includes: implementation });
	}
	return polyfill;
};
