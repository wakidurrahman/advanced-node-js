# Mixu's Node book

> A book about using Node.js

## 4. V8 and Javascript gotchas

There are basically two things that trip people up in Javascript:

1. The rules surrounding the `'this`' keyword
2. Variable scope rules.

### 4.1 Gotcha #1: `this` keyword

In `object-oriented programming`(OOP) languages, the `this` keyword is used to refer to the `current instance` of the object.

In `Javascript` - which is a `prototype-based` language - the `this` keyword is not fixed to a **_particular value_**. Instead, the `value` of `this` is determined by **`how the function is called`**

**_Calling the method of an object_**

```js
// Calling the method of an object
const objectContext = {
  id: 1,
  name: "Wakidur",
  details: "An object ",
  f1: function () {
    console.log(this);
  },
};
// We have define an object, and call objectContext.f1();
objectContext.f1();
```

**_Calling a standalone function_**

```js
// Calling a standalone function
function standaloneFunction() {
  console.log(this.toString());
  // In this case, this refers to the global object, which is "DomWindow" in the `browser`
  console.log(this === window);
  // In this case, this refers to the global object, which is "global" in the  `Node`
  // console.log(this === global);
}
standaloneFunction();
```
