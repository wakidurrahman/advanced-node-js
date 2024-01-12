const fs = require("fs/promises");
const path = require("path");

const filepath = path.join(process.cwd(), "async-await.txt");

async function runAsyncAwait(params) {
  try {
    const contents = await fs.readFile(filepath, "utf8");
    console.log("File Contents: ", contents);
  } catch (err) {
    console.error(err);
  }
}

runAsyncAwait()
