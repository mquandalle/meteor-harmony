var traceur = Npm.require('traceur');

Plugin.registerSourceHandler("next.js", function (compileStep) {
  var oldPath = compileStep.inputPath;
  var newPath = oldPath.replace(/\.next\.js$/, '.now.js');

  var options = {
    filename: oldPath,
    sourceMap: true
  };
  var content = compileStep.read().toString('utf8');
  var output = traceur.compile(content, options);

  if (output.error) {
    throw new Error(output.error);
  }

  compileStep.addJavaScript({
    sourcePath: oldPath,
    path: newPath,
    data: output.js,
    sourceMap: output.sourceMap
  });
});
