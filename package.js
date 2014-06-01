Package.describe({
  summary: "JavaScript.next-to-JavaScript-of-today compiler",
  version: "0.0.42"
});

Package._transitional_registerBuildPlugin({
  name: "harmony-compiler",
  use: [],
  sources: [
    "plugin/compiler.js"
  ],
  npmDependencies: {"traceur": "0.0.42"}
});

Package.on_use(function(api) {
  // The location of this runtime file is not supposed to change:
  // https://github.com/google/traceur-compiler/commit/49ad82f89c593b12ac0bcdfcfd05028e79676c78
  var dir = '.npm/plugin/compileHarmony/node_modules/traceur/bin/';
  api.add_files(dir + 'traceur-runtime.js', ['client', 'server']);
});
