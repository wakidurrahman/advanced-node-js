/**
 * Global message Object
 * Global Response Status code
 * Read-only properties are not super common,
 * but they can be created using Object.defineProperty() or Object.freeze()
 */
module.exports = Object.freeze({
  // Code
  AT_LEAST_ONE_UPDATE_REQUIRED_CODE: 0,
  INVALID_STATUS_CODE: 1,
  INVALID_STATUS_TRANSITION_CODE: 2,
  TASK_NOT_FOUND_CODE: 3,
  CONCURRENCY_ERROR_CODE: 4,
  // Status Code
  TWO_HUNDRED: 200,
  TWO_HUNDRED_ONE: 201,
  TWO_HUNDRED_THREE: 203,
  FOUR_HUNDRED: 400,
  FOUR_HUNDRED_ONE: 401,
  FOUR_HUNDRED_FOUR: 404,
  FIVE_HUNDRED: 500,
  // Task Management
  TASK_NOT_FOUND: "task not found",
  TASK_CREATE: "task create successfully!",
  TASK_FOUND: "task found successfully!",
  TASK_UPDATE: "task update successfully!",
  INVALID_STATUS: "invalid status",
  INVALID_STATUS_TRANSITION: "task not found",

  // Common Message
  CONCURRENCY_ERROR: "concurrency error",
  AT_LEAST_ONE_UPDATE_REQUIRED: "at least one update required",
  INTERNAL_SERVER_ERROR: "internal server error",

  IS_NOT_FOUND_WITH_ID_OF: "is not found with id of",
  THIS_IN_VALID_MONGODB_ID: "this is not valid mongodb _id",
  REQUEST_BODY_IS_EMPTY: "request body is empty!",
  DATA_FETCH: "all data fetching successful!",
  CREATE_SUCCESSFUL: "particular data create successfully!",
  PARTICULAR_DATA_FETCH: "particular data fetch successfully!",
  UPDATE_PARTICULAR_DOCUMENT: "particular document update successfully!",
  DELETE_PARTICULAR_DOCUMENT: "particular document delete successfully!",
});
