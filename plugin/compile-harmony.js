var traceur = Npm.require('traceur');

Plugin.registerSourceHandler("next.js", function (compileStep) {
  var oldPath = compileStep.inputPath;
  var newPath = oldPath.replace(/next(?=\.js$)/, 'now');

  var source = compileStep.read().toString('utf8');
  // force Traceur to define `this` in function scope
  source = "this;\n" + source;

  var compiler = new traceur.NodeCompiler({
    sourceMaps: true,
    modules: 'commonjs'
  });

  try {
    var output = compiler.compile(source, oldPath, newPath);
    compileStep.addJavaScript({
      sourcePath: oldPath,
      path: newPath,
      data: output,
      sourceMap: compiler.getSourceMap()
    });
  } catch (err) {
    var list = err.join("\n");
    compileStep.error({
      message: list,
    });
  }
});
