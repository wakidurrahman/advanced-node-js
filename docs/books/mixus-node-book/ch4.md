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

Since the value of `this` is determined at **_`call time`_** - and we are not calling the function using the `object.method` notation, ``
