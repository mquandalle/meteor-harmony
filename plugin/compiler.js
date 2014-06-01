'use strict';

Plugin.registerSourceHandler("next.js", function (compileStep) {
  var traceur = Npm.require('traceur');

  // find paths
  var oldPath = compileStep.inputPath;
  var newPath = oldPath.replace(/\.next\.js$/, '.now.js');

  // get ES6 code and set options
  var content = compileStep.read().toString('utf8');
  var options = {
    filename: oldPath,
    sourceMap: true
  };

  // compile ES6 to ES5
  var output = traceur.compile(content, options);

  if (typeof output.error !== 'undefined') {
    throw new Error(output.error);
  } else {
    // solve bug where "module is not defined" in Meteor
    var data = output.js.replace("module.exports", "harmony");

    compileStep.addJavaScript({
      sourcePath: oldPath,
      path: newPath,
      data: data,
      sourceMap: output.sourceMap
    });
  }
});
