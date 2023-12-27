const mongoose = require('mongoose');

const healthCheck = () => mongoose.connection.readyState === 1;

module.exports = {
  healthCheck,
};
