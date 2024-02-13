# 💁‍♂️ The Module System

Node.js currently comes with two different module systems:

1. CommonJS(CJS)
2. ECMAScript Modules (ESM or ES modules).

## #️⃣ The need for modules

A good module system should help with addressing some fundamental needs of software engineering: একটি ভাল module system সফ্টওয়্যার ইঞ্জিনিয়ারিং এর কিছু মৌলিক চাহিদা পূরণে সহায়তা করবে:

- **_Having a way to split the codebase into multiple files_**. কোডবেসটিকে একাধিক ফাইলে বিভক্ত করার একটি উপায় রয়েছে।
- **_Allowing code reuse across different projects_**. বিভিন্ন প্রকল্প জুড়ে কোড পুনরায় ব্যবহার করার অনুমতি দেয়।
- **_Encapsulation (or information hiding)_**. এনক্যাপসুলেশন It is generally a good idea to hide implementation complexity and only expose simple interfaces with clear responsibilities.
- **_Managing dependencies_**

It is important to clarify the distinction between a `module` and a `module system`.

- **`a module`**: we can define `a module` as the actual unit of software.
- **`a module system`**: `a module system` is **the syntax** and **the tooling** that allows us to define `modules` and to use them within our projects.

### 📝 Module systems in JavaScript and Node.js

- AMD: **_asynchronous module definition_** popularized by RequireJS
- UMD: **_Universal Module Definition_**
- The browser landscape thanks to `module bundlers` like `Browserify` and `webpack`
- CommonJS has been the dominant module system in Node.js
- ESM or ECMAScript modules: In 2015, with the release of ECMAScript 6 (also called ECMAScript 2015 or ES2015),

ESM: it tries to bridge the gap between how modules are managed on `browsers` and `servers`.

### 📝 The module system and its patterns

Modules are the bricks for structuring non-trivial applications and the main mechanism to enforce information hiding by keeping private all the `functions` and `variables` that are not explicitly marked to be exported.

### 📝 The revealing module pattern

One of the bigger problems with JavaScript in the browser is the lack of namespacing. Every `script` runs in the `global scope`; therefore, `internal` `application` `code` or `third-party` dependencies can pollute the `scope` while exposing their own pieces of functionality.

A popular technique to solve this class of problems is called the `revealing module pattern`, and it looks like this:

```js
const myModule = (() => {
  const privateFoo = () => {};
  const privateBar = [];

  const exported = {
    publicFoo: () => {},
    publicBar: () => {},
  };

  return exported;
})(); // once the parenthesis here are parsed, the function will be invoked

console.log(myModule);
console.log(myModule.privateFoo, myModule.privateBar);
```

This pattern leverages a self-invoking function. This type of function is sometimes also referred to as **_Immediately Invoked Function Expression (IIFE)_** and it is used to create a private scope, exporting only the parts that are meant to be public.

In the preceding code, the myModule variable contains only the exported API, while the rest of the module content is practically inaccessible from outside.

This demonstrates that only the exported properties are directly accessible from myModule.

## #️⃣ CommonJS modules

CommonJS is the first `module system` originally built into Node.js.

Let's summarize two of the main concepts of the CommonJS specification:

1. `require`: is a function that allows you to import a module from the local filesystem
2. `exports`: and `module.exports` are special `variables` that can be used to `export` **_public functionality_** from the current `module`.

### 📝 A homemade module loader

To understand how CommonJS works in Node.js, let's build a similar system from scratch.
The code that follows creates a function that mimics a subset of the functionality of the original `require()` function of Node.js.

### 📝 Defining a module

The essential concept to remember is that everything inside a `module` is `private` unless it's assigned to the `module.exports` `variable`.

### 📝 module.exports versus exports

The `exports` variable is just a reference to the initial value of `module.exports`.

If we want to export something other than an object literal, such as a function, an instance, or even a string, we have to reassign module.exports as follows:

```js
module.exports = () => {
  console.log("Hello");
};
```

### 📝 The require function is synchronous

The `synchronous` nature of `require()` has important reflection on the way we define modules, as it limits us to mostly using `synchronous` code during the definition of a module.

### 📝 The resolving algorithm

The term **_dependency hell_** describes a situation whereby two or more dependencies of a program in turn depend on a shared dependency, but require different incompatible versions.

Node.js solves this problem elegantly by loading a different version of a module depending on where the module is loaded from. All the merits of this feature go to the way Node.js `package managers` (such as `npm` or `yarn`) organize the dependencies of the application, and also to the **_resolving algorithm_** used in the `require()` function.

The `resolve()` function takes a `module` name (which we will call `moduleName`) as input and it returns the full `path` of the `module`. This path is then used to load its code and also to identify the `module` uniquely.

The resolving algorithm can be divided into the following three major branches:

1. File modules: If `moduleName` starts with 👉 `/`, it is already considered an **_`absolute path`_** to the `module` and it's returned as it is. If it starts with 👉 `./`, then `moduleName` is considered a **_`relative path`_**, which is calculated starting from the directory of the requiring module.
2. Core modules: If `moduleName` is not prefixed with `/` or `./`, the algorithm will first try to search within the core Node.js modules.
3. Package modules: If no `core module` is found matching `moduleName`, then the search continues by looking for a matching `module` in the first `node_modules` directory that is found navigating up in the directory structure starting from the requiring module. The algorithm continues to search for a match by looking into the next `node_modules` directory up in the directory tree, until it reaches the root of the filesystem.

For `file` and `package modules`, both files and directories can match `moduleName`. In particular, the `algorithm` will try to match the following:

- `<moduleName>`.js
- `<moduleName>`/index.js
- The directory/file specified in the main property of `<moduleName>`/package.json

[All together ](https://nodejs.org/api/modules.html#modules_all_together)

To get the exact `filename` that will be loaded when `require()` is called, use the `require.resolve()` function.

Putting together all of the above, here is the `high-level` algorithm in pseudocode of what `require()` does:

```sh

require(X) from module at path Y
1. If X is a core module,
   a. return the core module
   b. STOP
2. If X begins with '/'
   a. set Y to be the file system root
3. If X begins with './' or '/' or '../'
   a. LOAD_AS_FILE(Y + X)
   b. LOAD_AS_DIRECTORY(Y + X)
   c. THROW "not found"
4. If X begins with '#'
   a. LOAD_PACKAGE_IMPORTS(X, dirname(Y))
5. LOAD_PACKAGE_SELF(X, dirname(Y))
6. LOAD_NODE_MODULES(X, dirname(Y))
7. THROW "not found"

LOAD_AS_FILE(X)
1. If X is a file, load X as its file extension format. STOP
2. If X.js is a file, load X.js as JavaScript text. STOP
3. If X.json is a file, parse X.json to a JavaScript Object. STOP
4. If X.node is a file, load X.node as binary addon. STOP

LOAD_INDEX(X)
1. If X/index.js is a file, load X/index.js as JavaScript text. STOP
2. If X/index.json is a file, parse X/index.json to a JavaScript object. STOP
3. If X/index.node is a file, load X/index.node as binary addon. STOP

LOAD_AS_DIRECTORY(X)
1. If X/package.json is a file,
   a. Parse X/package.json, and look for "main" field.
   b. If "main" is a falsy value, GOTO 2.
   c. let M = X + (json main field)
   d. LOAD_AS_FILE(M)
   e. LOAD_INDEX(M)
   f. LOAD_INDEX(X) DEPRECATED
   g. THROW "not found"
2. LOAD_INDEX(X)

LOAD_NODE_MODULES(X, START)
1. let DIRS = NODE_MODULES_PATHS(START)
2. for each DIR in DIRS:
   a. LOAD_PACKAGE_EXPORTS(X, DIR)
   b. LOAD_AS_FILE(DIR/X)
   c. LOAD_AS_DIRECTORY(DIR/X)

NODE_MODULES_PATHS(START)
1. let PARTS = path split(START)
2. let I = count of PARTS - 1
3. let DIRS = []
4. while I >= 0,
   a. if PARTS[I] = "node_modules" CONTINUE
   b. DIR = path join(PARTS[0 .. I] + "node_modules")
   c. DIRS = DIR + DIRS
   d. let I = I - 1
5. return DIRS + GLOBAL_FOLDERS

LOAD_PACKAGE_IMPORTS(X, DIR)
1. Find the closest package scope SCOPE to DIR.
2. If no scope was found, return.
3. If the SCOPE/package.json "imports" is null or undefined, return.
4. let MATCH = PACKAGE_IMPORTS_RESOLVE(X, pathToFileURL(SCOPE),
  ["node", "require"]) defined in the ESM resolver.
5. RESOLVE_ESM_MATCH(MATCH).

LOAD_PACKAGE_EXPORTS(X, DIR)
1. Try to interpret X as a combination of NAME and SUBPATH where the name
   may have a @scope/ prefix and the subpath begins with a slash (`/`).
2. If X does not match this pattern or DIR/NAME/package.json is not a file,
   return.
3. Parse DIR/NAME/package.json, and look for "exports" field.
4. If "exports" is null or undefined, return.
5. let MATCH = PACKAGE_EXPORTS_RESOLVE(pathToFileURL(DIR/NAME), "." + SUBPATH,
   `package.json` "exports", ["node", "require"]) defined in the ESM resolver.
6. RESOLVE_ESM_MATCH(MATCH)

LOAD_PACKAGE_SELF(X, DIR)
1. Find the closest package scope SCOPE to DIR.
2. If no scope was found, return.
3. If the SCOPE/package.json "exports" is null or undefined, return.
4. If the SCOPE/package.json "name" is not the first segment of X, return.
5. let MATCH = PACKAGE_EXPORTS_RESOLVE(pathToFileURL(SCOPE),
   "." + X.slice("name".length), `package.json` "exports", ["node", "require"])
   defined in the ESM resolver.
6. RESOLVE_ESM_MATCH(MATCH)

RESOLVE_ESM_MATCH(MATCH)
1. let RESOLVED_PATH = fileURLToPath(MATCH)
2. If the file at RESOLVED_PATH exists, load RESOLVED_PATH as its extension
   format. STOP
3. THROW "not found"
```

The `node_modules` directory is actually where the `package managers` install the dependencies of each `package`. This means that, based on the `algorithm` we just described, each `package` can have its own **_private dependencies_**.

The `resolving algorithm` is the core part behind the robustness of the Node.js `dependency management`, and it makes it possible to have `hundreds` or even `thousands` of `packages` in an application without having collisions or problems of version compatibility.

### 📝 The module cache

Each `module` is only loaded and evaluated the first time it is required, since any subsequent call of `require()` will simply return the cached version.

The module cache is exposed via the `require.cache` variable,

### 📝 Circular dependencies

Many consider circular dependencies an intrinsic design issue, but it is something that might actually happen in a real project,