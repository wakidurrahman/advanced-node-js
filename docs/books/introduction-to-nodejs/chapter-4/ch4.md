# Chapter 4. Building CLI Tools

## Working with CLI Tools

```bash
#!/usr/bin/env node
```

This above line is a `unix` and `unix-like` system(e.g. `Linux`, `MacOS`) directive known as the `shebang` or the `hashbang`(as per the two leading characters of its syntax, where `bang` is a synonym for exclamation point).

When a non-binary file has executable permissions and is run from the command line, the `hashbang` is checked so that the Operating System knows what interpreter to execute the text of the file with.

The command we instruct the `OS` to use is `/usr/bin/env node`. The path to `env` is typical across `unix` and `unix-like` systems. Passing the `node` as an argument to `/usr/bin/env` results in the full path to wherever `node` is installed being output.

This full path to the node binary then becomes what the `OS` uses to execute the text. On Windows systems, `npm` wraps the file referenced from the bin field of `my-cli/package.json` in a `.cmd` file.

Note that Top-Level Await syntax is supported from Node 14.3.0.

To complete the step of creating a node module executable file, we have to set the file permissions so the file is an executable. This can be done using the `chmod` command in the following way:

```bash
 $ chmod u+x bin/cmd.js
```

Let's run the following commands from the cli-tools folder to setup tool.

1. `chmod u+x bin/cmd.js`.⬇️
2. `sudo npm link` ⬇️
3. `npm link cli-tools`⬇️
4. `cli-tools`

CLI Tools command

```bash

$ cli-tools --help
$ cli-tools -h
$ cli-tools --version
$ cli-tools -V

UpdateProduct
$ cli-tools updateProduct --help
$ cli-tools updateProduct E2 40
$ cli-tools updateProduct E1 4
$ cli-tools updateProduct E1 30

AddProduct 
$ cli-tools addProduct --help 
$ cli-tools addProduct electronics A3 Laptop 599 "Best mid-priced laptop money can buy"
```
