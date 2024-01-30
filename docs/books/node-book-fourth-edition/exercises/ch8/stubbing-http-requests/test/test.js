const test = require("tape");
const sinon = require("sinon");

const github = require("../src/github.js");
const octokitUserData = require('./octokitUserData.js');

// test("Get GitHub user by username", async (t) => {
//   t.plan(3);

//   const githubUser = await github.getGitHubUser("octokit");

//   t.equal(githubUser.id, 3430433);
//   t.equal(githubUser.login, "octokit");
//   t.equal(githubUser.name, "Octokit");
// });

test("Get GitHub user by username with stubbing", async (t) => {
  t.plan(3);

  sinon.stub(github, "getGitHubUser").returns(octokitUserData);
  const githubUser = await github.getGitHubUser("octokit");

  t.equal(githubUser.id, 3430433);
  t.equal(githubUser.login, "octokit");
  t.equal(githubUser.name, "Octokit");
});
