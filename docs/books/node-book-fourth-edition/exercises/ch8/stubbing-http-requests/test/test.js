const test = require("tape");
const getGitHubUser = require("../src/github.js");

test("Get GitHub user by username", async (t) => {
  t.plan(3);

  const githubUser = await getGitHubUser("octokit");

  t.equal(githubUser.id, 3430433);
  t.equal(githubUser.login, "octokit");
  t.equal(githubUser.name, "Octokit");
});
