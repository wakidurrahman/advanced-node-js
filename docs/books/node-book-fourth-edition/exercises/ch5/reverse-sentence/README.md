# reverse-sentence-nodejs-module

The module will expose a single API that will reverse the sentence we pass to it. We'll also install a popular code formatter to keep our module code consistent.

## Install

```sh
npm install @wakidurrahman/reverse-sentence-nodejs-module
```

## API

```js
require("reverse-sentence-nodejs-module") => Function
reverseSentence(sentence) => String
```

## Example

```js
const reverseSentence = require("reverse-sentence-nodejs-module");
const sentence = "Hello World!";
const reversed = reverseSentence(sentence);
console.log(reversed); // World! Hello
```

## License

MIT