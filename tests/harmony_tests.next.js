Meteor.__HARMONY_PRESENT = true;

Tinytest.add('harmony - compile', (test) => test.isTrue(true));
Tinytest.add('harmony - shared', (test) => {
  test.equal(sharedFromJavascript, 321);
  test.equal(sharedFromHarmony, 789);
})
