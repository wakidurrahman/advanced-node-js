const { healthCheck } = require('../services/health');

const health = (req, res) => {
  const status = healthCheck() ? 200 : 500;
  res.status(status).send(`Health status code ${status}`).end();
};

module.exports = {
  health,
};
