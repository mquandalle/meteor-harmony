Package.describe({
  summary: "JavaScript.next-to-JavaScript-of-today compiler",
  version: "0.0.41"
});

Package._transitional_registerBuildPlugin({
  name: "harmony-compiler",
  use: [],
  sources: [
    "plugin/compiler.js"
  ],
  npmDependencies: {"traceur": "0.0.41"}
});

Package.on_use(function(api, where) {
  where = where || ['client', 'server'];

  // The location of this runtime file is not supposed to change:
  // https://github.com/google/traceur-compiler/commit/49ad82f89c593b12ac0bcdfcfd05028e79676c78
  api.add_files(".npm/plugin/harmony-compiler/node_modules/traceur/bin/traceur-runtime.js", where);
});

// Package.on_test(function (api) {
//   api.use(["harmony", "tinytest"]);
//   api.add_files("tests/test.js", ["client"]);
//   api.add_files([
//   ], ["client", "server"]);
// });
