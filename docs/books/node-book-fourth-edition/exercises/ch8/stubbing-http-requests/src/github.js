const fetch = require("node-fetch");

const api = "https://api.github.com/users/";
const getGitHubUser = (username) => {
  return fetch(`${api}${username}`)
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};

module.exports = getGitHubUser;
