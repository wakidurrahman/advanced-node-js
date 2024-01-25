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

- The module has been added to a `dependencies` field inside `package.json` file.

```js
{
    "dependencies": {
        "express": "^4.17.1"
    }
}
```

- Both a `node_modules` directory and a `package-lock.json` file have now been created inside project directory.

> We used of both `npm` the `command-line interface` bundled with Node.js, and The `npm public registry` to download the third-party module.

The first command was `$ npm init`. This command initializes a new project in the current working directory.

Using `npm init` to Initialize a Project.

### 📝 [The Basics: Getting started with npm](https://nodesource.com/blog/the-basics-getting-started-with-npm/)

Today, `npm` is a cornerstone of modern web development, whether used exclusively with Node.js as a package manager or as a build tool for the front end.

1. The Essential npm Commands

   - Using `npm init` to initialize a project
   - Using `npm init --yes` to instantly initialize a project
   - Install modules with `npm install`
   - Install modules and save them to your `package.json` as a dependency
   - Install modules and save them to your `package.json` as a developer dependency
   - Install modules globally on your system

2. The Basics of package.json

   2.1. Identifying Metadata Inside package.json

   - The `name` property
   - The `version` property
   - The `license` property
   - The `description` property
   - The `keywords` property

     2.2. functional metadata inside package.json

   - The `main` property
   - The `repository` property
   - The `script` property
   - The `dependencies` property
   - The `devDependencies` property

3. Understanding the different types of dependencies and other host Specs inside package.json

- PeerDependencies
- PeerDependenciesMeta
- OptionalDependencies
- BundledDependencies
- engines
- os
- cpu

**_The Essential npm Commands_**

When using npm, you're most likely using the command-line tool for most of your interactions.

The `npm init` command is a step-by-step tool to build out the scaffolding for your project. It will prompt for input on a few aspects in the following order:

1. `name:` Defaults to the containing directory name.
2. `initial version:` 1.0.0 by default.
3. `description:` An overview of what it is and why you're doing the project.
4. `entry point:` Meaning the `main` file is to be executed when run.
5. `test command:` To trigger testing with something like Standard.
6. `git repository:` Where the source code can be found.
7. `keywords:` Tags related to the project.
8. `license:` This defaults to ISC. Most open-source Node.js projects are MIT.

> **The only properties that are mandatory are the package `name` and `version`.**

It's worth noting that if you're content with the suggestion that the `npm init` command provides next to the prompt, you can hit or keys to accept it and move on to the following prompt.

Once you run through the `npm init` steps above, a `package.json` file will be generated and placed in the current directory.

```bash
$ npm init # This will trigger the initialization
```

```bash
$ npm init --yes # This will trigger automatically populated initialization
```

````bash
$ npm install <module>

$ npm install <module> # Where <module> is the name of the module  you want to install
$ npm i <module> # Where <module> is the name of the module you  want to install - using the i alias for installation

$ npm install <module> --save # Where <module> is the name of the  module you want to install - Kept for compatibility
$ npm install <module> --no-save # Where <module> is the name of the  module you want to install - To avoid adding it as a dependency

$ npm install <module> --save-dev # Where <module> is the name of  the  module you want to install

$ npm install <module> --global # Where <module> is the name of  the module you want to install globally```
$ npm install <module> -g # Where <module> is the name of the  module you want to install globally, using the -g alias
````

```bash
$ npm install express
```

It is also possible to configure default answers using the `npm config` command.

```bash
$ npm config set init.author.name "Your Name"
```

📒 **_Important note_** :By default, when passed a name, the npm install command will look for a module with that name and download it from the public npm registry. But it is also possible to pass the `npm install` command other parameters, such as a `GitHub URL`, and the command will install the content of the `URL`.
