# An introduction to the npm package manager

1. npm
2. yarn
3. pnpm

## Packages

`npm` manages downloads of dependencies of your project.

- It will install everything the project needs. `npm install`
- Installing a single package. `npm install <package-name>`
- `--save-dev` installs and adds the entry to the `package.json` file `devDependencies`
- `--no-save` installs but does not add the entry to the `package.json` file dependencies
- `--save-optional` installs and adds the entry to the `package.json` file `optionalDependencies`
- `--no-optional` will prevent optional dependencies from being installed
- Updating packages `npm update`
- Newer version that satisfies `npm update <package-name>`
- `npm install <package-name>@<version>`
- Running tasks `npm run <task-name>`

The difference between `devDependencies` and `dependencies` is that the former
