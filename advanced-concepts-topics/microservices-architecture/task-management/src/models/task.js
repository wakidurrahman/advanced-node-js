const mongoose = require("mongoose");
const { Schema } = mongoose;

// Models are responsible for creating and reading documents from the underlying MongoDB database
// An instance of a model is called a document. Creating them and saving to the database is easy.
// instantiate Schema
const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["new", "active", "completed", "cancelled"],
      default: "new",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: Date,
  },
  {
    /**
     * Mongoose has the solution for this issue implemented with optimistic locks. 
     * Optimistic lock is a strategy used in databases to handle concurrent requests. 
     * Each document has an additional version property. 
     * When the transaction tries to save/update the model, it checks the version. 
     * If the version differs from the version received during the get query, somebody has already updated the document concurrently. 
     * The transaction is aborted (an error is thrown).
     */
    optimisticConcurrency: true,
  }
);
// When you call mongoose.model() on a schema, Mongoose compiles a model for you.
module.exports = mongoose.model("task", TaskSchema);
