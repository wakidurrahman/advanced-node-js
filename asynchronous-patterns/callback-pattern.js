// Step one
// function hideString(str) {
//   return str.replace(/[a-zA-Z]/g, 'X');
// }

// const hiddenText = hideString('Hello world Hello world Hello world');

// console.log(hiddenText);

// Step 02

function delayCallback(seconds, callback) {
  setTimeout(callback, seconds * 1000);
}

delayCallback(2, () => {
  console.log('First callback');
  delayCallback(1, ()=> {
    console.log("Second callback");

    delayCallback(1, ()=> console.log('Fourth callback'))
  })
});
