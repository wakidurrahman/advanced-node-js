const mongoose = require("mongoose");
/**
 * Validate MongoDB ObjectId
 * You can use .isValid() method on ObjectId, try in mongoose:
 */

async function isMongoDBObjectID(mongodbID) {
  return await mongoose.Types.ObjectId.isValid(mongodbID);
}

module.exports = {
  isMongoDBObjectID,
};
