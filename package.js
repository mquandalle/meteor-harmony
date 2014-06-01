Package.describe({
  summary: "JavaScript.next-to-JavaScript-of-today compiler",
  version: "0.0.42"
});

Package._transitional_registerBuildPlugin({
  name: "harmony-compiler",
  use: [],
  sources: [
    "plugin/compile-harmony.js"
  ],
  npmDependencies: {"traceur": "0.0.42"}
});

Package.on_use(function(api, where) {
  where = where || ['client', 'server'];

  // The location of this runtime file is not supposed to change:
  // http://git.io/B2s0Tg 
  api.add_files(".npm/plugin/harmony-compiler/node_modules/traceur/bin/traceur-runtime.js", where);
});

// Package.on_test(function (api) {
//   api.use(["harmony", "tinytest"]);
//   api.add_files("tests/test.js", ["client"]);
//   api.add_files([
//   ], ["client", "server"]);
// });
