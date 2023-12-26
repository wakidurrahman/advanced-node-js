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

const objectManipulation1 = {id: "Foo"};
const objectManipulation2 = {id: "Bar"};
// both call() and apply() allow us to specify what the value of this should be.
manipulating.call(objectManipulation1); // {id: 'Foo'}
manipulating.apply(objectManipulation2); // {id: 'Bar'}

// The difference between the two is how they pass on additional arguments    
function manipulatingWithParams(a, b) {
    console.log(this, a, b);
}

// Call() takes the actual arguments of call(), while apply() takes just two arguments: thisArg and an array of arguments.
manipulatingWithParams.call(objectManipulation1, 'A', 'B'); // {id: 'Foo'} 'A' 'B'
manipulatingWithParams.apply(objectManipulation2, ["C", "D"]); // {id: 'Bar'} 'C' 'D'         


