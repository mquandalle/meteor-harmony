var traceur = Npm.require('traceur');
var grasp = Npm.require('grasp');

Plugin.registerSourceHandler("next.js", function (compileStep) {
  var oldPath = compileStep.inputPath;
  var newPath = oldPath.replace(/next(?=\.js$)/, 'now');

  var source = compileStep.read().toString('utf8');
  var options = {
    filename: oldPath,
    sourceMap: true
  };

  // force Traceur to define `this` in function scope
  source = "this;\n" + source;

  var output = traceur.compile(source, options);

  if (output.errors.length) {
    output.errors.forEach(function (err) {
      // errors are split into four parts
      var errorParts = err.split(/: */);
      var SOURCEPATH = 0;
      var LINE = 1;
      var COLUMN = 2;
      var MESSAGE = 3;

      // throw a plugin error
      compileStep.error({
        message: errorParts[MESSAGE],
        sourcePath: errorParts[SOURCEPATH],
        line: errorParts[LINE],
        column: errorParts[COLUMN]
      });
    });
  } else {
    var code = output.js;

    // XXX Once https://github.com/gkz/grasp/issues/34 is fixed, we will operate
    // grasp transformations directly on the traceur AST -- more efficent.
    var graspTransformations = {
      // If traceur injects `module.exports`, rename it
      // XXX Tests
      "module.exports = $a.call(__);": "_.extend(this, ({{a}}).call(this));"
    };

    _.each(graspTransformations, function (replace, search) {
      code = grasp.replace("equery", search, replace, code)[0];
    });

    compileStep.addJavaScript({
      sourcePath: oldPath,
      path: newPath,
      data: code,
      sourceMap: output.sourceMap
    });
  }
});
