//1.  Calling the method of object.
const user = {
  id: 1,
  name: "example",
  callThis: function () {
    console.log("This refer", this);
  },
};

user.callThis(); // this refers to the current object

// 2.  Calling a standalone function.

// Since every function has a 'this' value, you can access `this` even in functions that are not properties of an object.
function standaloneFunction() {
  console.log(this);
  console.log(this.toString());
  console.log(this === window);
}

standaloneFunction();

// 3. Manipulating this via Function.apply and Function.call

function manipulating() {
  console.log(this);
}

const objectManipulation1 = { id: "Foo" };
const objectManipulation2 = { id: "Bar" };
// both call() and apply() allow us to specify what the value of this should be.
manipulating.call(objectManipulation1); // {id: 'Foo'}
manipulating.apply(objectManipulation2); // {id: 'Bar'}

// The difference between the two is how they pass on additional arguments
function manipulatingWithParams(a, b) {
  console.log(this, a, b);
}

// Call() takes the actual arguments of call(), while apply() takes just two arguments: thisArg and an array of arguments.
manipulatingWithParams.call(objectManipulation1, "A", "B"); // {id: 'Foo'} 'A' 'B'
manipulatingWithParams.apply(objectManipulation2, ["C", "D"]); // {id: 'Bar'} 'C' 'D'

// 4. Context changes

const changesContext = {
  id: "xyz",
  printId: function () {
    console.log(`This id is ${this.id} ${this.toString()}`);
  },
};

setTimeout(changesContext.printId, 100); //This id is undefined [object Window]
const methodCall = changesContext.printId;
methodCall(); // This id is undefined [object Window]

// 5. we can create a function which maintains a reference to obj, which makes sure that this is bound correctly

setTimeout(() => {
  changesContext.printId(); // method call
}, 100);
const referenceFunc = function () {
  changesContext.printId();
};
referenceFunc();

// 6. To store the value of `this` at the beginning of a function to a variable called `self`, and then using `self` in callback in place of `this`.
const objectSelfUse = {
  items: ["a", "b", "c", "d", "f", 1, 3, 5, 6],
  processItem: function () {
    // `self` is an ordinary variable,  it will contain the value of this when the  function was called.
    // no matter how or when the ```callback function passed to forEach()``` gets called.
    // If we had used "this" instead of "self" in the callback function,
    // it would have referred to the wrong object and the call to print() would have failed.
    const self = this; // assign this to self
    this.items.forEach((item) => {
      self.printItem(item);
    });
  },
  printItem: function (item) {
    console.log(`*** ${item} ***`);
  },
};

/**
 * Variable scope and variable evaluation strategy
 */

// Example #1: A simple for loop
for (let i = 0; i < 5; i++) {
  console.log("LOG ", i);
}

// Example #2: a setTimeout call inside a for loop
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log("LOG ", i);
  }, 100);
}

// Example #3: Delayed calls a function
let storyData = [];
for (let i = 0; i < 5; i++) {
  storyData[i] = function foo() {
    console.log(i);
  };
}

// if we will user `let` the output lock like
storyData[0](); // 0
storyData[1](); // 1
storyData[2](); // 2
storyData[3](); // 3
storyData[4](); // 4
// Example # 3.1: Delayed calls a function
var storyArrayData = [];
for (var i = 0; i < 5; i++) {
  storyArrayData[i] = function foo() {
    console.log(i);
  };
}

// if we will user `var` the output lock like
storyArrayData[0](); // 5
storyArrayData[1](); // 5
storyArrayData[2](); // 5
storyArrayData[3](); // 5
storyArrayData[4](); // 5

/**
 * 1. Variable scope is based on the nesting of functions.
 * In other words, the position of the function in the source always determines what variables can be accessed.
 */

// 1. Nested function can access their parent's variables
const globalVariables = "foo";
function parentFunc() {
  const b = "bar";
  function nested() {
    console.log(globalVariables);
    console.log(b);
  }
  nested();
}
parentFunc();

// 1.1 Non-nested functions can only access the topmost, global variables:
function parentSecond() {
  const b = "Nested inside parent function";
}
function accessParentVariable() {
  console.log(globalVariables);
  console.log(b);
}

parentSecond();
accessParentVariable();

/**
 * 2. Defining function creates new scopes
 */

// 2. The default behavior is to access previous scope
function grandparent() {
  const b = "bar";
  function parent() {
    function nested() {
      console.log(globalVariables);
      console.log(b);
    }
    nested();
  }
  parent();
}
grandparent();

// 2.  but inner function scopes can prevent access to a previous scope by defining a variable with the same name:

function grandparentPrevent() {
  const b = "bar";
  function parent() {
    const b = "B redefined!";
    function nested() {
      console.log(globalVariables);
      console.log(b);
    }
    nested();
  }
  parent();
}
grandparentPrevent();
