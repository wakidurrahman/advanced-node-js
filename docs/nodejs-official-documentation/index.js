const name = (params) => {};

function final(inputValue, callback) {
  callback(`${inputValue} and terminated by executing callback`);
}

function middleware(inputValue, callback) {
  return final(`${inputValue} touched by middleware`, callback);
}

function initiate() {
    // Variable in a global environment
    const someInput = 'hello this is a function ';
    middleware(someInput, function(result) {
        console.log(result);
        // requires callback to 'return' result
    })
}

initiate();