'use strict';

var define = require('define-properties');
var $isNaN = Number.isNaN || function (a) { return a !== a; };
var $isFinite = Number.isFinite || function (n) { return typeof n === 'number' && global.isFinite(n); };
var maxSafeInteger = Number.MAX_SAFE_INTEGER || (Math.pow(2, 53) - 1);
var Obj = Object;
var toStr = Obj.prototype.toString;
var ES = {
	CheckObjectCoercible: function (x, optMessage) {
		if (x == null) {
			throw new TypeError(optMessage || 'Cannot call method on ' + x);
		}
		return x;
	},
	ToObject: function (o, optMessage) {
		return Obj(ES.CheckObjectCoercible(o, optMessage));
	},
	ToLength: function (value) {
		var len = ES.ToInteger(value);
		if (len <= 0) { return 0; } // includes converting -0 to +0
		if (len > maxSafeInteger) { return maxSafeInteger; }
		return len;
	},
	ToNumber: function (value) {
		if (toStr.call(value) === '[object Symbol]') {
			throw new TypeError('Symbols can not be converted to numbers');
		}
		return +value;
	},
	ToInteger: function (value) {
		var number = ES.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
	},
	SameValueZero: function (a, b) {
		return a === b || ($isNaN(a) && $isNaN(b));
	}
};

var includesShim = function includes(searchElement) {
	var O = ES.ToObject(this);
	var length = ES.ToLength(O.length);
	if (length === 0) {
		return false;
	}
	var fromIndex = arguments.length > 1 ? ES.ToInteger(arguments[1]) : 0;
	var k = fromIndex >= 0 ? fromIndex : Math.max(0, length + fromIndex);
	while (k < length) {
		if (ES.SameValueZero(searchElement, O[k])) {
			return true;
		}
		k += 1;
	}
	return false;
};

/*eslint-disable no-unused-vars */
var boundIncludesShim = function includes(array, searchElement) {
/*eslint-enable no-unused-vars */
	return includesShim.apply(array, Array.prototype.slice.call(arguments, 1));
};
boundIncludesShim.method = includesShim;

boundIncludesShim.shim = function shimArrayPrototypeIncludes() {
	define(Array.prototype, {
		includes: includesShim
	});
	return Array.prototype.includes || includesShim;
};

module.exports = boundIncludesShim;
