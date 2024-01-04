#!/usr/bin/env node

/**
 * This first line is a unix and unix-like system
 * (e.g. Linux, MacOS) directive known as the ”shebang” or the “hashbang”
 * (as per the two leading characters of its syntax,
 * where "bang" is a synonym for exclamation point).
 *
 * When a non-binary file has executable permissions and is run from the command line, the "hashbang" is checked so that the Operating System knows what interpreter to execute the text of the file with.
 */

import got from "got"; // we have opted into ESM modules

const API = "http://localhost:3000";

// Usage

const usage = (meg = "Back office for my App") => {
  console.log(`\n${msg}\n`);
  console.log("Usage: cmd <ID> <AMOUNT>");
};
