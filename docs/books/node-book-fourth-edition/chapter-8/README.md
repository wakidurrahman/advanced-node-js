# 💁‍♂️ Testing with Node.js

Testing enables you to identify bugs in your code more quickly and efficiently.
Test cases should be written to verify that each piece of code is giving the expected output or result.

> [!TIP]
> Tests can act as a form of documentation for the logic of your program.

`Unit` testing is a specific type of testing where individual `components` or `units of code` are tested.

Testing frameworks provide `components` and `utilities` such as test `runners` for running `automated` tests.

## #️⃣ Testing with [tape](https://www.npmjs.com/package/tape)

`tape` is a `TAP-producing` test harness for node and browsers.

`tape` is one of the more lightweight testing frameworks and is commonly used to implement `unit` testing.

`tape` is a `TAP-producing` test library that provides a lightweight testing interface that requires `minimal` `configuration`.

TAP stands for `Test Anything Protocol` (https://testanything.org/). TAP is a language-agnostic `text-based` `protocol` that enables communication between `unit tests` and a `test harness`. It decouples the reporting of errors from the presentation of the reports.

`TAP` provides a simple and minimal view for test results.

```js
const test = require("tape");

test("timing test", function (t) {
  t.plan(2);

  t.equal(typeof Date.now, "function");
  const start = Date.now();

  setTimeout(function () {
    t.equal(Date.now() - start, 100);
  }, 100);
});

test("test using promises", async function (t) {
  const result = await someAsyncThing();
  t.ok(result);
});
```

As the tests were executing, the test results were output to `STDOUT` in TAP format. In the TAP output, `ok` implies that the test has passed, and `not ok` implies that the test has failed. When a test case has failed, the corresponding error is output.
