# 💁‍♂️ Securing NodeJS Application.

As with all software, you must take certain precautions to ensure the application you're building is secure.

Cross-Site Scripting (XSS)
Cross-Site Request Forgery (CSRF) .

## #️⃣ Detecting known dependency vulnerabilities

This ecosystem is key to Node.js's success. But it does lead to large, nested dependency trees within our applications.

Not only must we be concerned with the security of the application code that we write ourselves, but we must also consider the security of the code included in the modules in our dependency tree.

### 📝 `vulnerabilities`

We've intentionally chosen an old version with known `vulnerabilities` to demonstrate how to audit our dependencies. This version of `Express.js` is not recommended for use in production applications:

```sh
$ npm i express@4.15.0

added 46 packages, and audited 47 packages in 1s

8 vulnerabilities (1 moderate, 7 high)

To address all issues, run:
  npm audit fix --force

Run `npm audit` for details.
```

Observe that the npm output detects nine known `vulnerabilities` in this version of `Express.js`.

### 📝 `$ npm audit`

Run the `$ npm audit` command for more details:

```sh
$ npm audit

```

![npm audit report](./npm-audit-report.png)

### 📝 `$ npm audit fix`

We can try to automatically fix the vulnerabilities by using the `$ npm audit fix` command.

```sh
$ npm audit fix

// or
$ npm audit fix --force
```

`$ npm audit` to scan for known `vulnerabilities` in our dependencies.

> [!TIP]
> The `$ npm audit` command has been available since npm version 6. The command submits a report of the dependencies in our application and compares it with a database of known vulnerabilities.

- 👉The `$ npm audit` command will `audit` `direct`, `development`, `bundled`, and `optional dependencies`.
- 👉The command requires both a `package.json` and a `package-lock.json` file to be present; otherwise, it will fail.
- 👉 The audit automatically runs when a package is installed with the $ npm install command.

> [!NOTE]
> Many organizations consider `$ npm audit` a precautionary measure to protect their applications against known security `vulnerabilities`. For this reason, it is common to add the `$ npm audit` command to your **Continuous Integration (CI)** testing. The `$ npm audit` command reports an error code of `1` when a `vulnerability` is `found`; this error code can be leveraged to indicate a `failed` `test`.

> [!TIP]
> It is possible to override this behavior and force `npm` to update all dependencies, even if they include breaking changes, using the `$ npm audit fix --force` command.

## #️⃣ Authentication with Express.js

Many web applications require a `login` system. Users of a website have different privileges, and to identify which resources they're able to access, they must first be identified via authentication.

The `express-session` module and explained how we can use it to build a simple login functionality.

```js
const session = require("express-session");
// Register the express-session middleware.
app.use(
  session({
    name: "SESSIONID",
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true },
  })
);
```

This middleware injects a `session` object into every request object (`req`). Before the user is authenticated, the session value will be an `empty` object.

- `name`: The name of the cookie for the session.
- `secret`: The secret used to sign the session cookie. This is a required configuration option.
- `resave`: Forces the session to be resaved back in the session store, which is where the session information is stored. In the recipe, this value was set to false, indicating that we do not wish to save the session data in the session store.
- `saveUninitialized`: Forces unsaved sessions to be saved to the session store.

### 📝 Secure session cookies

Session cookies can be marked with a `Secure` attribute. The Secure attribute forces the browser to not use HTTP to send cookies back to the server.

It's typical for a `production` environment to apply the `SSL` encryption at the load balancer layer.

A `load balancer` is a technology in an application architecture that is responsible for boosting the efficiency of the application by distributing a set of tasks over a set of resources – for example, distributing login requests to servers.

### 📝 Hashing with bcrypt

Passwords should never be stored in plain text and should instead be stored in a hashed form. Passwords are transformed into a hashed form using a hashing function. Hashing functions use an algorithm to transform a value into unrecognizable data.

Hashing is typically combined with a technique called `salting`. Salting is where a unique value, referred to as the `salt`, is appended to the password before the hash is generated.

This helps to protect against `brute-force` attacks and makes it more difficult to `crack` the password.

bcrypt (https://www.npmjs.com/package/bcrypt) is a popular module that is used to hash passwords in Node.js.

`$ npm i bcrypt`

## #️⃣ Setting HTTP headers with Helmet

One of the precautionary measures we can take is to set certain security-related HTTP headers on requests.
Sometimes, this is referred to as `"hardening"` the headers of our HTTP requests.

The `Helmet` module (https://github.com/helmetjs/helmet) provides a middleware to set security-related headers on our `HTTP requests`, saving time on manual configuration.

```js
// server.js
const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
```

- 👉 First start the web server

```sh
$ node server.js
```

- 👉 inspect the headers that our Express.js application returns. We can do this using the cURL tool.

```sh
$ curl -I http://localhost:3000

output 👇👇👇

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 12
ETag: W/"c-Lve95gjOVATpfV8EL5X4nxwjKHE"
Date: Wed, 31 Jan 2024 07:47:09 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

> [!NOTE]
> The `X-Powered-By: Express` header.

let's start hardening these headers with the helmet module.

```js
app.use(helmet());
```

```sh
$ curl -I http://localhost:3000

output 👇👇👇

HTTP/1.1 200 OK
Content-Security-Policy:
    default-src 'self';
    base-uri 'self';
    font-src 'self' https: data:;
    form-action 'self';
    frame-ancestors 'self';
    img-src 'self' data:;
    object-src 'none';
    script-src 'self';
    script-src-attr 'none';
    style-src 'self' https: 'unsafe-inline';
    upgrade-insecure-requests
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Origin-Agent-Cluster: ?1
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-XSS-Protection: 0
Content-Type: text/html; charset=utf-8
Content-Length: 12
ETag: W/"c-Lve95gjOVATpfV8EL5X4nxwjKHE"
Date: Wed, 31 Jan 2024 07:50:48 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

> [!NOTE]
> The  X-Powered-By header has been removed.

The `helmet` module configures some of the HTTP headers on our requests based on its `secure` defaults.


`helmet` removes the `X-Powered-By: Express` header so that discovering the server is Express-based becomes more difficult.
The reason to obfuscate this is to protect against attackers trying to exploit `Express.js-oriented` security vulnerabilities, slowing them down in determining the type of server being used in the application.

The `helmet` module sets the injected HTTP headers to sensible secure defaults.


The `helmet` middleware simply modifies the `response` `headers` to appropriate defaults. 
To demonstrate what `helmet` is doing under the covers, we can try `injecting` the same `HTTP headers` using the Node.js core `http` module:

## #️⃣ Protecting against HTTP parameter pollution attacks

## #️⃣ Preventing JSON pollution

## #️⃣ Preventing cross-site scripting attacks

## #️⃣ Guarding against cross-site request forgery attacks
