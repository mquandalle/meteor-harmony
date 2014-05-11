var traceur = Npm.require('traceur');
var os = Npm.require('os');

Plugin.registerSourceHandler("next.js", function (compileStep) {
  var options = {
    filename: compileStep.inputPath,
    sourceMap: true
  };

  var content = compileStep.read().toString('utf8');
  var output = traceur.compile(content, options);

  if (output.errors.length) {
    throw new Error(output.errors.join(os.EOL));
  }

  var newPath = compileStep.inputPath.replace(/\.next\.js$/, '.now.js');
  compileStep.addJavaScript({
    sourcePath: compileStep.inputPath,
    path: newPath;
    data: output.js,
    sourceMap: output.sourceMap
  });
});
