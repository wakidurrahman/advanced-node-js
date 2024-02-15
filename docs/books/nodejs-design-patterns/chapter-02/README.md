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
  console.log('Hello');
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

## #️⃣ Module definition patterns

The module system, besides being a mechanism for loading dependencies, is also a tool for defining APIs. The main
factor to consider is the balance between private and public functionality. The aim is to maximize information hiding and API usability, while balancing these with other software qualities, such as **_extensibility_** and **_code reuse_**.

Some of the most popular **_patterns_** for defining modules in `Node.js`, such as

- Named exports
- Exporting Functions
- Exporting Classes
- Exporting an instance
- monkey patching

Each one has its own balance of information `hiding`, extensibility, and `code reuse`.

### 📝 Named exports

The most basic method for exposing a public API is using **named exports**, which involves assigning the values we want to make public to properties of the object referenced by `exports` (or `module.exports`).

```js
exports.info = (message) => {
  console.log(`info: ${message}`);
};
```

> [!TIP]
> Most of the Node.js core modules use this pattern.

### 📝 Exporting a function

One of the most popular module definition patterns consists of reassigning the whole `module.exports` variable to a function.

The modularity of Node.js heavily encourages the adoption of the **single-responsibility principle (SRP)**: every module should have responsibility over a single functionality and that responsibility should be entirely encapsulated by the module.

```js
module.exports = (message) => {
  console.log(`info: ${message}`);
};
```

### 📝 Exporting a class

A `module` that exports a `class` is a specialization of a module that exports a function. The difference is that with this new pattern we allow the user to create new `instances` using the `constructor`, but we also give them the ability to extend its `prototype` and forge/reproduce new `classes`.

```js
class Logger {
  constructor(name) {
    this.name = name;
  }
}

module.exports = Logger;
```

### 📝 Exporting an instance

We can leverage the caching mechanism of `require()` to easily define stateful instances created from a constructor or a factory, which can be shared across different modules.

```js
class Logger {
  constructor(name) {
    this.name = name;
  }
}

module.exports = new Logger('DEFAULT');
```

Because the module is cached, every module that requires the logger module will actually always retrieve the same instance of the object, thus sharing its state.

### 📝 Modifying other modules or the global scope

A module can modify other `modules` or `objects` in the `global scope`; well, this is called **_monkey patching_**. It generally refers to the practice of modifying the existing objects at runtime to change or extend their behavior or to apply temporary fixes.

The technique described here can be very dangerous to use.

## #️⃣ ESM: ECMAScript modules

The ESM specification tries to retain some good ideas from previous existing module systems like `CommonJS` and `AMD`. There is support for rotational dependencies and the possibility to load modules asynchronously.

The most important differentiator between **ESM** and **CommonJS** is that **ES** modules are **_static_**, which means that imports are described at the top level of every file and they cannot be nested within control flow statements. Also, the name of the imported modules cannot be **_dynamically generated_** at runtime using expressions, only constant strings are allowed.

### 📝 Using ESM in Node.js

There are several ways to tell the Node.js interpreter to consider a given module as an ES module rather than a CommonJS module:

1. Give the module file the extension `.mjs`
2. Add to the nearest parent `package.json` a field called "type" with a value fo "module" `"type": "module",`

> [!IMPORTANT]
> :+1: Node.js will consider every .js file to be written using the CommonJS syntax by default; :shipit:

### 📝 Named exports and imports

ESM allows us to export functionality from a module through the `export` keyword.

> [!NOTE]
> :smiling_imp: Note that `ESM` uses the singular word `export` as opposed to the plural (exports and module.exports) used by CommonJS. :shipit:

> [!IMPORTANT]
> :+1: In an ES module, everything is private by default and only exported entities are publicly accessible from other modules. :shipit:

```js
// logger.js
// exports a function as `log`
export function log(message) {
  console.log(message);
}

// main.js
import * as loggerModule from './logger.js';
```

- ♨️📢 If we want to import entities from a module we can use the import keyword.
- ♨️📢 we are using the `*` syntax (also called **namespace import**) to import all the members of the module and assign them to the local loggerModule variable.

> [!IMPORTANT]
> :rage: ESM we have to specify the **file extension** of the imported modules.

we can resolve the clash by renaming the imported entity with the as keyword.

```js
import { log as log2 } from './logger.js';
```

This approach can be particularly useful when the clash is generated by importing two entities with the same name from different modules, and therefore changing the original names is outside the consumer's control.

### 📝 Default exports and imports

A default export makes use of the export default keywords and it looks like this:

```js
// logger.js
export default class Logger {...}
```

In this case, the name Logger is ignored, and the entity exported is registered under the name `default`.

This exported name is handled in a special way, and it can be imported as follows:

```js
// main.js
import MyLogger from './logger.js';
```

The difference with `named ESM` imports is that here, since the default export is considered `unnamed`, we can import it and at the same time assign it a `local name` of our choice. In this example, we can replace `MyLogger` with anything else that makes sense in our context.

### 📝 Mixed exports

It is possible to mix `named exports` and a `default export` within an ES module.

It is generally considered good practice to stick with `named exports`, especially when you want to expose more than one functionality, and only use `default exports` if it's one clear functionality you want to export.

This is not a hard rule and there are notable exceptions to this suggestion.

> [!TIP]
> :alien: Consider carefully what the best approach for your specific module is and what you want the developer experience to be for the users of your module.

### 📝 Module identifiers

**Module identifiers** (also called **_module specifiers_**) are the different types of values that we can use in our `import` statements to specify the location of the module we want to load.

- _Relative specifiers_: `import MyLogger from './logger.js';`
- _Absolute specifiers_: like `'file:///opt/nodejs/config.js'`. They refer directly and explicitly to a full path.

```js

// package.json:
{
  "type" : "module",
  "imports": {
    "#root/*.js": "./*.js"
  }
}

// main.js
import { Source } from '#root/path/to/Source.js';

// Source.js:
export class Source {
  // ...
}
```

- _Bare specifiers_: `import fastify from 'fastify';`
- _Deep import specifiers_: `import MyLogger from 'fastify/lib/logger.js';`

### 📝 Async imports

The `import` statement is `static`.

There are two important limitations:

1. A module identity cannot be constructed at runtime.
2. Module imports are declared at the top level of every file and they cannot be nested withing control flow statements.

To allow us to overcome these limitations ES modules provides _`async imports`_ (also called _dynamic imports_).

Async imports can be performed at `runtime` using the special `import()` operator.

The `import()` operator is syntactically equivalent to a function that takes a **_module identifier_** as an argument and it returns a `promise` that resolves to a module object.

```js
const translationModule = `./strings-en.js`;
import(translationModule).then((strings) => {
  console.log(strings.HELLO);
});
```

### 📝 Module loading in depth

- To understand how ESM actually works
- How it can deal effectively with circular dependencies,
- How JavaScript code is parsed and evaluated when using ES modules.

1. #### Loading phases

   The goal of the interpreter is to build a graph of all the necessary module (a dependency graph). Essentially, the dependency graph is needed by the interpreter to figure out how modules depend on each other and in what order the code needs to be executed.

   - Phase 1 - Construction (or `parsing`):
   - Phase 2 - `Instantiation`:
   - Phase 3 - `Evaluation`:

2. #### Read-only live bindings

   Another fundamental characteristic of ES modules, which helps with **cyclic/rotational dependencies**, is the idea that imported modules are effectively **_`read-only live bindings`_** to their `exported` values.

3. #### Circular dependency resolution

   - **_Phase 1: Parsing_**: The code is explored starting from the entry point. The `interpreter` looks only for `import statements` to find all the necessary modules and to load the source code from the module files. The `dependency graph` is explored in a depth-first fashion, and every module is visited only once. This way the interpreter builds a view of the dependencies that looks like a **tree structure**, as
   - **_Phase 2: Instantiation_**: In the instantiation phase, the **interpreter walks** the `tree view` obtained from the previous phase from the **bottom to the top** ⬆️. For every module, the `interpreter` will look for all the **_exported properties_** e.i: `export let loaded = false;` first and build out a map of the exported names in memory. After this sequence of steps, the `interpreter` will do another pass to `link` the `exported names` to the modules importing them.

   - **_Phase 3: Evaluation_**: In this phase, all the code in every file is finally executed. The execution order is again bottom-up respecting the post-order depth-first visit of our original dependency graph. With this approach, `main.js` is the last file to be executed. This way, we can be sure that all the exported values have been initialized before we start executing our main business logic.
