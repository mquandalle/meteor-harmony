Meteor.__HARMONY_PRESENT = true;

Tinytest.add('harmony - compile', (test) => test.isTrue(true));
Tinytest.add('harmony - shared', (test) => {
  test.equal(sharedFromJavascript, 321);
  test.equal(sharedFromHarmony, 789);
})

Tinytest.add('harmony - array comprehension', (test) => {
  var array = [for (x of [0, 1, 2]) for (y of [0, 1, 2]) x + '' + y];
  test.equal(array, [
    '00', '01', '02', '10', '11', '12', '20', '21', '22'
  ]);
});

Tinytest.add('harmony - arrow functions', (test) => {
  var square = (x) => {
    return x * x;
  };
  var square2 = x => x * x;
  test.equal(square(4), 16);
  test.equal(square2(4), 16);
});

Tinytest.add('harmony - classes', (test) => {
  class Character {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  class Monster extends Character {
    constructor(x, y, name) {
      super(x, y);
      this.name = name;
      this.health_ = 100;
    }

    attack(character) {
      super.attack(character);
      // Can also be written as:
      // super(character);
    }

    get isAlive() { return this.health_ > 0; }
    get health() { return this.health_; }
    set health(value) {
      if (value < 0) throw new Error('Health must be non-negative.');
      this.health_ = value;
    }
  }
  var myMonster = new Monster(5,1, 'arrrg');
  test.equal(myMonster.health, 100);
  test.equal(myMonster.isAlive, true);
  test.equal(myMonster.x, 5);
  myMonster.health = 10;
  test.equal(myMonster.health, 10);
  test.equal(myMonster.name, 'arrrg');
});

Tinytest.add('harmony - computed property names', (test) => {
  var x = 0;
  var obj = {
    [x] : 'hello'
  };
  test.equal(obj[0], 'hello');
});


Tinytest.add('harmony - default parameters', (test) => {
  function f(list, indexA = 0, indexB = list.length) {
    return [list, indexA, indexB];
  }
  test.equal(f([1,2,3]), [[1,2,3], 0, 3]);
  test.equal(f([1,2,3], 1), [[1,2,3], 1, 3]);
  test.equal(f([1,2,3], 1, 2), [[1,2,3], 1, 2]);
});

Tinytest.add('harmony - destructuring assignment', (test) => {
  var [a, [b], [c], d] = ['hello', [', ', 'junk'], ['world']];
  test.equal(a + b + c, 'hello, world');
});

Tinytest.add('harmony - iterators and `for of`', (test) => {
  var res = [];
  for (var element of [1, 2, 3]) {
    res.push(element * element);
  }
  test.equal(res, [1, 4, 9]);
});

Tinytest.add('harmony - generator comprehension', (test) => {
  var list = [1, 2, 3, 4];
  var res = (for (x of list) x);

  var acc = '';
  for (var x of res) {
    acc += x;
  }
  test.equal(acc, '1234');
});


Tinytest.add('harmony - generators', (test) => {
  // A binary tree class.
  function Tree(left, label, right) {
    this.left = left;
    this.label = label;
    this.right = right;
  }
  // A recursive generator that iterates the Tree labels in-order.
  function* inorder(t) {
    if (t) {
      yield* inorder(t.left);
      yield t.label;
      yield* inorder(t.right);
    }
  }

  // Make a tree
  function make(array) {
    // Leaf node:
    if (array.length == 1) return new Tree(null, array[0], null);
    return new Tree(make(array[0]), array[1], make(array[2]));
  }
  // Harmony: Changed `let` to `var` because `let` doesn't work
  var tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

  // Iterate over it
  var result = [];

  // Harmony: Also changed `let` to `var` here
  for (var node of inorder(tree)) {
    result.push(node); // a, b, c, d, ...
  }
  test.equal(result, ['a', 'b', 'c', 'd', 'e', 'f', 'g']);
});

Tinytest.add('harmony - modules', (test) => {
  // Removed `import` because Meteor automatically imports all files.
  test.equal(firstName, 'David');
  test.equal(lastName, 'Belle');
  test.equal(year, 1973);
});

Tinytest.add('harmony - numeric literals', (test) => {
  var binary = [
    0b0,
    0b1,
    0b11
  ];
  test.equal(binary, [0, 1, 3]);

  var octal = [
    0o0,
    0o1,
    0o10,
    0o77
  ];
  test.equal(octal, [0, 1, 8, 63]);
});

Tinytest.add('harmony - property method assigment', (test) => {
  var object = {
    value: 42,
    toString() {
      return this.value;
    }
  };
  test.equal(object.toString(), 42);
});

Tinytest.add('harmony - object initializer shorthand', (test) => {
  function getPoint() {
    var x = 1;
    var y = 10;

    return {x, y};
  }
  test.equal(getPoint(), {
    x: 1,
    y: 10
  });
});

Tinytest.add('harmony - rest parameters', (test) => {
  function push(array, ...items) {
    items.forEach(function(item) {
      array.push(item);
    });
  }
  var res = [];
  push(res, 1, 2, 3);
  test.equal(res, [1, 2, 3]);
});

Tinytest.add('harmony - spread', (test) => {
  function push(array, ...items) {
    array.push(...items);
  }

  function add(x, y) {
    return x + y;
  }

  var numbers = [4, 38];
  test.equal(add(...numbers), 42);
});

Tinytest.add('harmony - template literals', (test) => {
  var name = 'world';
  var greeting = `hello ${name}`;
  test.equal(greeting, 'hello world');
});

Tinytest.add('harmony - promises', (test) => {
  // We need this to run in its own Fiber
  Meteor.bindEnvironment(function(){
    function timeout(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }

    var x = 0;

    timeout(100).then(() => {
      x = 42;
    });

    setTimeout(function () {
      test.equal(x, 42);
    }, 200);
  });
});
