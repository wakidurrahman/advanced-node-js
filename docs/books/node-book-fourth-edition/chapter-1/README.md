# 📖 Introduction.

Long-Term Support(LTS).
The NodeJS release schedule is based on the [`Semantic Versioning`](https://semver.org/) standard.

**_Semantic Versioning 2.0.0_**

Given a version number `MAJOR`.`MINOR`.PATCH, increment the:

1. `MAJOR` version when you **make incompatible API changes**
2. `MINOR` version when you **add functionality in a backward compatible manner**
3. `PATCH` version when you **make backward compatible bug fixes**

Additional labels for pre-release and build metadata are available as extensions to the `MAJOR`.`MINOR`.`PATCH` format.

The NodeJS release policy stats that there are two major releases of NodeJS per year.
One in `April` and one in `October`.

- Even-numbered major releases of Node.js are promoted to LTS after 6 months. Even-numbered releases are scheduled for release in April and promoted to LTS in October. LTS releases are supported for 30 months. It is recommended to use LTS
  versions of Node.js for production applications.

- Odd-numbered major releases are released in October and are only supported for 6 months. Odd-numbered releases are expected to be used to try out new features and test the migration path, **_but are not generally recommended for use in production applications._**

All LTS versions of Node.js are given `codenames`, named after elements. Node.js `18.x` has the LTS codename **`Hydrogen`** (18.x 2022).

**List of codenames of LTS releases.**

- Fermium (14.x 2020)
- Gallium (16.x 2021)
- Hydrogen (18.x 2022)
- Iron (20.x 2023)
- Jod (22.x 2024)

## #️⃣  NodeJS Installing

1. fnm [Fast Node Manager](https://github.com/Schniz/fnm)
2. nvm [Node Version Manager](https://github.com/nvm-sh/nvm)
3. n [Interactively Manage Your Node.js Versions](https://github.com/tj/n)
4. You can install Node.js manually from Node.js [downloads page](https://nodejs.org/en/download/)

## #️⃣ Accessing the Node.js API documentation

The Node.js documentation also describes how to interact with APIs, including which arguments a method accepts and the method's return value.

### [Node.js v18.19.0 documentation](https://nodejs.org/docs/latest-v18.x/api/documentation.html)

**Node.js is a JavaScript runtime built on the V8 JavaScript engine.**

#### Stability index

Throughout the documentation are indications of a section's stability. Some APIs are so proven and so relied upon that they are unlikely to ever change at all. Others are brand new and experimental, or known to be hazardous.

1. Stability: `0 - Deprecated`. The feature may emit warnings. Backward compatibility is not guaranteed.
2. Stability: `1 - Experimental`. The feature is not subject to semantic versioning rules. Non-backward compatible changes or removal may occur in any future release. Use of the feature is not recommended in production environments.
3. Stability: `2 - Stable`. Compatibility with the npm ecosystem is a high priority.
4. Stability: `3 - Legacy`. Although this feature is unlikely to be removed and is still covered by semantic versioning guarantees, it is no longer actively maintained, and other alternatives are available.

```bash
node --help
Usage: node [options] [ script.js ] [arguments]
       node inspect [options] [ script.js | host:port ] [arguments]
```

The API documentation also details the stability of APIs. The Node.js project defines and
uses the following three stability indices:

1. 0 – Deprecated: Usage of these APIs is discouraged. Warnings may be emitted upon
   the usage of these APIs.
2. 1 – Experimental: These APIs are not considered stable and may be subject to
   some non-backward-compatible changes.
3. 2 – Stable: With stable APIs, the Node.js project will try to ensure compatibility.

## #️⃣ Adopting new JavaScript syntax in NodeJS

```bash
$ npm version

{
  npm: '10.2.3',
  node: '18.19.0',
  acorn: '8.10.0',
  ada: '2.7.2',
  ares: '1.20.1',
  base64: '0.5.0',
  brotli: '1.0.9',
  cjs_module_lexer: '1.2.2',
  cldr: '43.1',
  icu: '73.2',
  llhttp: '6.0.11',
  modules: '108',
  napi: '9',
  nghttp2: '1.57.0',
  nghttp3: '0.7.0',
  ngtcp2: '0.8.1',
  openssl: '3.0.12+quic',
  simdutf: '3.2.18',
  tz: '2023c',
  undici: '5.26.4',
  unicode: '15.0',
  uv: '1.44.2',
  uvwasi: '0.0.19',
  v8: '10.2.154.26-node.28',
  zlib: '1.2.13.1-motley'
}
```

### Read Eval Print Loop (REPL)

```bash
$ node
> .help
.break    Sometimes you get stuck, this gets you out
.clear    Alias for .break
.editor   Enter editor mode
.exit     Exit the REPL
.help     Print this help message
.load     Load JS from a file into the REPL session
.save     Save all evaluated commands in this REPL session to a file

```

### The optional chaining operator `?.`

90

The optional chaining operator is denoted by the `?.` syntax. The optional chaining operator allows you to read the value of a nested property without having to check whether each preceding reference is valid.

```js
const person = {
  id: 1,
  name: "Jog",
  occupation: "Doctor",
  cat: { name: "Tome" },
};


> person.dob.name
Uncaught TypeError: Cannot read properties of undefined (reading 'name')

// let's use the optional chaining operator
> person.dog?.name
undefined
```

The optional chaining operator should be used in cases where you wish to check the value of a nested property but do not want to throw an error if a preceding property is not defined.

### The nullish coalescing operator, which is denoted by ??.

The nullish coalescing operator is a logical operator that returns the right operand when the left operand is either `null` or `undefined`.

The **nullish coalescing operator** is a logical operator that returns the `right operand` when the left operand is either `null` or `undefined`.
This differs from the logical OR operator (||).
The logical `OR` operator returns the right operand when the left operand is any falsy value.
A `falsy` value is a value that is `false` when encountered in a Boolean context.

**_Falsy values in JavaScript include_**

- `false`,
- `0`,
- `-0`,
- `0n (BigInt)` ,
- `"" (empty string)`,
- `null`,
- `undefined`,
- `NaN`.

> A JavaScript engine `parses` and `executes` JavaScript code. The embedding of the Google Chrome V8 engine in Node.js is what enables the execution of JavaScript outside of the browser.

> The V8 JavaScript engine internally compiles JavaScript using **`Just-In-Time (JIT)`** compilation. V8 জাভাস্ক্রিপ্ট ইঞ্জিন অভ্যন্তরীণভাবে জাস্ট-ইন-টাইম (JIT) সংকলন ব্যবহার করে জাভাস্ক্রিপ্ট কম্পাইল করে।

> JIT compilation speeds up the execution of JavaScript. While V8 is executing JavaScript, it obtains data about the code that is being executed. From this data, the V8 engine can make speculative optimizations. Speculative optimizations anticipate the upcoming code based on the code that has recently been executed. This allows the V8 engine to optimize for the upcoming code.  জেআইটি সংকলন জাভাস্ক্রিপ্ট কার্যকর করার গতি বাড়ায়। V8 জাভাস্ক্রিপ্ট চালানোর সময়, এটি কার্যকর করা কোড সম্পর্কে ডেটা প্রাপ্ত করে। এই তথ্য থেকে, V8 ইঞ্জিন অনুমানমূলক অপ্টিমাইজেশন করতে পারে। অনুমানমূলক অপ্টিমাইজেশানগুলি সম্প্রতি কার্যকর করা কোডের উপর ভিত্তি করে আসন্ন কোডের প্রত্যাশা করে। এটি V8 ইঞ্জিনকে আসন্ন কোডের জন্য অপ্টিমাইজ করার অনুমতি দেয়।
