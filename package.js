var path = Npm.require("path");

Package.describe({
  summary: "JavaScript.next-to-JavaScript-of-today compiler",
  version: "1.0.0+0.0.42"
});

Package._transitional_registerBuildPlugin({
  name: "compileHarmony",
  use: [],
  sources: [
    "plugin/compile-harmony.js"
  ],
  npmDependencies: {"traceur": "0.0.42"}
});

Package.on_use(function(api) {
  // The location of this runtime file is not supposed to change:
  // http://git.io/B2s0Tg
  var dir = ".npm/plugin/compileHarmony/node_modules/traceur/bin/";
  api.add_files(path.join(dir, "traceur-runtime.js"));
});

// Issue #7 reminder
// Package.on_test(function (api) {
//   api.use(["harmony", "tinytest"]);
//   api.add_files("tests/test.js", ["client"]);
//   api.add_files([
//   ], ["client", "server"]);
// });
