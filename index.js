'use strict';

var define = require('define-properties');
var RequireObjectCoercible = require('es-abstract/2020/RequireObjectCoercible');
var callBound = require('call-bind/callBound');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var polyfill = getPolyfill();
var shim = require('./shim');

var $slice = callBound('Array.prototype.slice');

/* eslint-disable no-unused-vars */
var boundIncludesShim = function includes(array, searchElement) {
/* eslint-enable no-unused-vars */
	RequireObjectCoercible(array);
	return polyfill.apply(array, $slice(arguments, 1));
};
define(boundIncludesShim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundIncludesShim;
