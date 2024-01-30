/**
 * we'll learn how to test a web page using Puppeteer.
 *
 * We're going to verify that we receive the expected content from https://example.com.
 * We'll use the Node.js core `assert` library for the assertion logic:
 */

const assert = require("assert");
const puppeteer = require("puppeteer");

const webURL = "https://example.com";

// We'll create an asynchronous function named runTest(), which will hold all of our test logic:
async function runTest(params) {
  //need to launch Puppeteer
  const browser = await puppeteer.launch();
  // need to create a new Puppeteer browser page
  const page = await browser.newPage();
  // instruct Puppeteer to load a URL. We do this by calling the goto() function on the page object
  await page.goto(webURL);
}
