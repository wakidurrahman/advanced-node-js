# The V8 JavaScript Engine

The cool thing is that the JavaScript engine is independent of the browser in which it's hosted. This key feature enabled the rise of Node.js. V8 was chosen to be the engine that powered Node.js back in 2009, and as the popularity of Node.js exploded, V8 became the engine that now powers an incredible amount of server-side code written in JavaScript.

## Other JS engines

Other browsers have their own JavaScript engine:

- Firefox has SpiderMonkey
- Safari has JavaScriptCore (also called Nitro)
- Edge was originally based on Chakra but has more recently been rebuilt using Chromium and the V8 engine.

## Compilation

JavaScript is generally considered an `interpreted` language, but modern JavaScript engines no longer just `interpret` JavaScript, they `compile` it.

This has been happening since 2009, when the SpiderMonkey JavaScript compiler was added to Firefox 3.5, and everyone followed this idea.

JavaScript is internally compiled by V8 with just-in-time (JIT) compilation to speed up the execution.
