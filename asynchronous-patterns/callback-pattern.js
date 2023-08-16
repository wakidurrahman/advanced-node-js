// Step one
function hideString(str) {
    return str.replace(/[a-zA-Z]/g, 'X');
}

const hiddenText = hideString('Hello world Hello world Hello world');

console.log(hiddenText);