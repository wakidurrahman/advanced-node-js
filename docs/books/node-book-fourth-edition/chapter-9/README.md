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



## #️⃣ Setting HTTP headers with Helmet

## #️⃣ Protecting against HTTP parameter pollution attacks

## #️⃣ Preventing JSON pollution

## #️⃣ Preventing cross-site scripting attacks

## #️⃣ Guarding against cross-site request forgery attacks
