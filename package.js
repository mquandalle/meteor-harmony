var path = Npm.require("path");

Package.describe({
  summary: "JavaScript.next-to-JavaScript-of-today compiler",
  version: "1.2.0+0.0.44"
});

Package._transitional_registerBuildPlugin({
  name: "compileHarmony",
  use: [],
  sources: [
    "plugin/compile-harmony.js"
  ],
  npmDependencies: {
    "traceur": "0.0.44"
  }
});

Package.on_use(function (api) {
  // The location of this runtime file is not supposed to change:
  // http://git.io/B2s0Tg
  var dir = ".npm/plugin/compileHarmony/node_modules/traceur/bin/";
  api.add_files(path.join(dir, "traceur-runtime.js"));

  // Export `module.exports` and `exports` down the package pipeline
  api.imply('exports');
});

Package.on_test(function (api) {
  api.use(['harmony', 'tinytest']);
  api.add_files([
    'harmony_test_setup.js',
    'harmony_tests.js',
    'tests/harmony_test_setup.next.js',
    'tests/harmony_tests.next.js'
  ], ["client", "server"]);
});
