async function bar() {
  await Promise.resolve();
  throw new Error("Fail");
}

async function foo() {
  await bar();
}

foo().then(
  () => console.log("success"),
  (error) => console.error(error.stack)
);
