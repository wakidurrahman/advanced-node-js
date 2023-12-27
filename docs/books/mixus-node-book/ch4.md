# Mixu's Node book

> A book about using Node.js

## 4. V8 and Javascript gotchas

There are basically two things that trip people up in Javascript:

1. The rules surrounding the `'this`' keyword
2. Variable `scope` rules.

### 4.1 Gotcha #1: `this` keyword

In `object-oriented programming`(OOP) languages, the `this` keyword is used to **refer** to the `current instance` of the object.

In `Javascript` - which is a `prototype-based` language - the `this` keyword is not fixed to a **_particular value_**. Instead, the `value` of `this` is determined by **`how the function is called`**

**_Calling the method of an object_**

```js
// Calling the method of an object
const user = {
  id: 1,
  name: "example",
  callThis: function () {
    console.log("This refer", this);
  },
};

user.callThis(); // this refers to the current object
// We have define an object, and call objectContext.f1();
user.f1();
```

**_Calling a standalone function_**

```js
// Calling a standalone function
function standaloneFunction() {
  // In this case, this refers to the global object, which is "DomWindow" in the `browser`
  console.log(this);
  // In this case, this refers to the global object, which is "DomWindow" in the `browser`
  console.log(this.toString());
  // In this case, this refers to the global object, which is "DomWindow" in the `browser`
  console.log(this === window);
  // In this case, this refers to the global object, which is "global" in the  `Node`
  // console.log(this === global);
}
```

**_Manipulating this via Function.apply and Function.call_**

```js
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
```

**_Context changes_**

The value of `this` is not fixed it is determined by `how the function is called`. In other words, the value of `this` is determined at the time the function is called, rather than being fixed to some particular value.

```js
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
```

Since the value of `this` is determined at **_`call time`_** - and we are not calling the function using the `object.method` notation, `this` refers to the global object.

In `setTimeout(changesContext.printId, 100);`; we are passing the value of `obj.printId`, which is a function. When that function later gets called, it is called as a standalone function not as a method of an object.

To get around this, we can create a function which maintains a reference to obj, which makes sure that `this` is bound correctly.

```js
setTimeout(() => {
  changesContext.printId(); // method call
}, 100);
const referenceFunc = function () {
  changesContext.printId();
};
referenceFunc();
```

To store the value of `this` at the beginning of a function to a variable called `self`, and then using `self` in callback in place of `this`.

````js
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
````

### 4.2 Gotcha #2: variable scope and variable evaluation strategy

There are three things you need to remember about variable scope in JavaScript.

1. Variable scope is based on the nesting of functions. In other words, the position of the function in the source always determines what variables can be accessed.

```js
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
```

2. Defining functions creates new scopes:

```js
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
```

3. Some functions are executed later, rather than immediately. You can emulate this yourself by storing but not executing functions,

```js
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
```
