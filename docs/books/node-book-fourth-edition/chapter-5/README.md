# Developing NodeJS Modules

Node.js modules are `libraries` or a `set of functions` we want to include in our application. Most modules will provide an API to expose their functionality.
The `npm` registry is where most Node.js modules are stored, where there are over a `million` Node.js modules available.

📒 **_Important note_** : It is recommended to install Node.js with **Node Version Manager (nvm)**. It is a tool that enables you to easily switch Node.js versions on most Unix-like platforms.

📒 **_Important note_** : `npm` is the name of the Command-Line Interface tool (CLI) bundled with Node.js as the default package manager.

📒 **_Important note_** : `Yarn` is a popular alternative package manager for JavaScript and was created as an alternative to the npm CLI in 2016.

## #️⃣ Consuming Node.js modules

We are going to learn how to consume npm modules from the public `npm` registry using the `npm` **CLI**.

To install the `express module`, type the following command while in your project directory:

`$ npm install express`

After this command run.

- the module has been added to a `dependencies` field inside `package.json`

```js
{
    "dependencies": {
        "express": "^4.17.1"
    }
}
```

- Both a `node_modules` directory and a `package-lock.json` file have now been created inside project directory.
