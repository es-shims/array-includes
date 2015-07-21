module.exports = (
  typeof Array.prototype.includes === 'function' ?
  function (array) {
    return Array.prototype.includes.apply(array,
      Array.prototype.slice.call(arguments, 1)
    );
  } :
  require('./index')
);
