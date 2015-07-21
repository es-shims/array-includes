var test = require('tape');

// Make sure `Array.prototype.includes` is not available.
/* eslint-disable no-extend-native */
delete Array.prototype.includes;
/* eslint-enable no-extend-native */

test('ponyfill (native method not available)', function (t) {
  t.equal(
    require('../ponyfill')([NaN], NaN),
    true,
    'uses the shim'
  );

  t.end();
});
