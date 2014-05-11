var traceur = Npm.require('traceur');
var os = Npm.require('os');

Plugin.registerSourceHandler("next.js", function (compileStep) {
  var oldPath = compileStep.inputPath;
  var newPath = oldPath.replace(/\.next\.js$/, '.now.js');

  var options = {
    filename: oldPath,
    sourceMap: true
  };
  var content = compileStep.read().toString('utf8');
  var output = traceur.compile(content, options);

  if (output.errors.length) {
    throw new Error(output.errors.join(os.EOL));
  }

  compileStep.addJavaScript({
    sourcePath: oldPath,
    path: newPath,
    data: output.js,
    sourceMap: output.sourceMap
  });
});
