var path = Npm.require("path");

Package.describe({
  summary: "JavaScript.next-to-JavaScript-of-today compiler",
  version: "1.0.1+0.0.42"
});

Package._transitional_registerBuildPlugin({
  name: "compileHarmony",
  use: [],
  sources: [
    "plugin/compile-harmony.js"
  ],
  npmDependencies: {
    "traceur": "0.0.42"
  }
});

Package.on_use(function (api) {
  // The location of this runtime file is not supposed to change:
  // http://git.io/B2s0Tg
  var dir = ".npm/plugin/compileHarmony/node_modules/traceur/bin/";
  api.add_files([
    path.join(dir, "traceur-runtime.js"),
    'lib/moduleExports.js'
  ]);
  api.export('module');
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
