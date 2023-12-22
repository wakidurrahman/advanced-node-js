const mongoose = require('mongoose');
const logger = require('../config/logger');

let mongoUrl;

async function dbInit({ mongo: { url } }) {
  mongoUrl = url;

  try {
    await mongoose.connect(mongoUrl);
  } catch (error) {
    logger.error('error in mongo connection', { error });
    setTimeout(dbInit, 5000);
  }
}

// Establish DB connection;
const db = mongoose.connection;

function destroy() {
  db.removeAllListeners();
  return mongoose.disconnect();
}

// MONGO Connected
db.on('connected', () => {
  logger.info('mongo connected');
});

// MONGO error
db.on('error', () => {
  logger.error('error in mongo connection', { error });
  mongoose.disconnect();
});

// MONGO disconnected
db.on('disconnected', () => {
  logger.info('mongo disconnected');
  dbInit({ mongo: { url: mongoUrl } });
});

module.exports = {
  dbInit,
  destroy,
};
