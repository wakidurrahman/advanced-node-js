const test = require("tape");
// Used Sinon.JS to stub a request to GitHub's API.
const sinon = require("sinon");

const github = require("../src/github.js");
const octokitUserData = require('./octokitUserData.js');

test("Get GitHub user by username with stubbing", async (t) => {
  t.plan(3);

  /**
   * 
   * Stub replaces a real response from the GitHub API with a fixed response.
   * The fixed response should always represent what a real response should look like.
   * 
   * The stub()
   * 
   * The stub() method instructs Sinon.JS to create an anonymous stub function. 
   * We pass the stub() method two parameters, which are the object and method we wish to stub.
   * we wanted to stub github.getGitHubUser().
   * 
   * The returns()
   * 
   * We then call the returns method. 
   * The returns method instructs Sinon.JS to respond with the value provided as a parameter.
   * In my case, it responds with my static response for the Octokit user, which we import from `octokitUserData.js`.
   */
  sinon.stub(github, "getGitHubUser").returns(octokitUserData);

  /**
   * When we call the `github.getGitHubUser()` function later in the file, `Sinon.JS` will override it and return the stubbed value instead.
   */
  const githubUser = await github.getGitHubUser("octokit");

  t.equal(githubUser.id, 3430433);
  t.equal(githubUser.login, "octokit");
  t.equal(githubUser.name, "Octokit");
});
