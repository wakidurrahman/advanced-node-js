const mongoose = require('mongoose');

let mongoUrl;

async function dbInit({ mongo: { url } }) {
  mongoUrl = url;

  try {
    await mongoose.connect(mongoUrl);
  } catch (error) {
    console.log(`Could not connect to the database. Exiting now... ${error}`);
  }
}

const db = mongoose.connection;

function destroy() {
  db.removeAllListeners();
  return mongoose.disconnect();
}

db.on('connected', () =>
  console.log('MongoDB database connection established successfully!')
);
db.on('error', () => {
  console.error('error in mongo connection');
  mongoose.disconnect();
});
db.on('disconnected', () => console.info('mongo disconnected'));

module.exports = {
  dbInit,
  destroy,
};
