module = {};

// Setting `module.exports` should export the object as a global.
module.__defineSetter__('exports', function (obj) {
  (function () {
    // Export each local variable to the `this` object.
    for (var name in obj) {
      if (obj.hasOwnProperty(name)) {
       this[name] = obj[name];
      }
    }
  }).call(typeof global !== 'undefined' ? global : window)
});
