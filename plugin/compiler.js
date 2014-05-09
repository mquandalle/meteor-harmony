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

  compileStep.addJavaScript({
    sourcePath: compileStep.inputPath,
    path: compileStep.inputPath,
    data: output.js,
    sourceMap: output.sourceMap
  });
});
