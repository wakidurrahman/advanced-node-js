/**
 * we'll learn how to test a web page using Puppeteer.
 *
 * We're going to verify that we receive the expected content from https://example.com.
 * We'll use the Node.js core `assert` library for the assertion logic:
 */

const assert = require("assert");
const puppeteer = require("puppeteer");

const webDomainURL = "https://example.com";

// We'll create an asynchronous function named runTest(), which will hold all of our test logic:
async function runTest(domain) {
  //need to launch Puppeteer
  const browser = await puppeteer.launch({ headless: true });
  // need to create a new Puppeteer browser page
  const page = await browser.newPage();
  // instruct Puppeteer to load a URL. We do this by calling the goto() function on the page object
  await page.goto(domain);

  // we can extract values from the web page by calling Puppeteer's $eval() function
  const title = await page.$eval("h1", (el) => el.innerHTML);
  const paragraph = await page.$eval("p", (el) => el.innerHTML);
  console.log("Title value: ", title);
  console.log("paragraph value: ", paragraph);
  assert.equal(title, "Example Domain");
  assert.equal(
    paragraph,
    "This domain is for use in illustrative examples in documents. You may use this\n" +
      "    domain in literature without prior coordination or asking for permission."
  );

  /**
   * call browser.close(),
   * otherwise Puppeteer will continue emulating and the Node.js process will never exit.
   */
  browser.close();
}

runTest(webDomainURL);
