var test = require('tape');

// Mock `Array.prototype.includes`.
var FAKE = {};
/* eslint-disable no-extend-native */
Array.prototype.includes = function () { return FAKE; };
/* eslint-enable no-extend-native */

test('ponyfill (native method available)', function (t) {
  t.equal(
    require('../ponyfill')([NaN], NaN),
    FAKE,
    'uses the native method'
  );

  t.end();
});
