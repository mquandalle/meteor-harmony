module = {};

// Setting `module.exports` should export the object as a global.
module.__defineSetter__('exports', function (obj) {
  // Export each local variable to the `this` object.
  var setProperties = function () {
    for (var name in obj) {
      if (obj.hasOwnProperty(name)) {
       this[name] = obj[name];
      }
    }
  };
  // Set `this` for the client.
  if (typeof window === 'object') {
    setProperties.call(window);
  }
  // Set `this` for the server.
  if (typeof global === 'object') {
    setProperties.call(global);
  }
});
