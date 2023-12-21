const asyncHandler = require('../middlewares/catch-async');
const { isMongoDBObjectID } = require('../services/common-service');
const taskService = require('../services/task');
const ErrorResponse = require('../utils/error-response');
const responseTo = require('../utils/response-to');

const toDoTo = (task) => {
  const { id, name, description, status, createdAt, updatedAt } = task;
  return {
    id,
    name,
    description,
    status,
    createdAt,
    updatedAt,
  };
};

/**
 * @desc Get Task By Task ID.
 * @route   get /api/v1/task/:id
 */

const getTaskById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  // 1 Check request parameter is valid mongodb id or not
  const isValidID = await isMongoDBObjectID(id);
  // 1.1 It isn't valid mongodb id
  if (!isValidID) {
    return next(
      new ErrorResponse(
        `${responseTo.THIS_IN_VALID_MONGODB_ID}`,
        responseTo.FOUR_HUNDRED
      )
    );
  }

  // 2. Find Particular task id
  const task = await taskService.getTaskById(id);
  // 2.1 This task id is not found
  if (!task) {
    return next(
      new ErrorResponse(responseTo.TASK_NOT_FOUND, responseTo.FOUR_HUNDRED_FOUR)
    );
  }

  // 3. Final response
  res.status(200).json({
    success: true,
    message: responseTo.TASK_FOUND,
    data: toDoTo(task),
  });
});

const createTask = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;
  // 1. Create task base on name and description property
  const task = await taskService.createTask(name, description);

  // Final response
  res.status(responseTo.TWO_HUNDRED_ONE).json({
    success: true,
    message: responseTo.TASK_CREATE,
    data: toDoTo(task),
  });
});

const updateTaskByID = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  // 1. Update Particular Task.
  const task = await taskService.updateTaskById(id, req.body);
  // 1.1 This id found an error
  if (task.error) {
    switch (task.code) {
      // Code: 0
      case responseTo.AT_LEAST_ONE_UPDATE_REQUIRED_CODE:
        res.status(responseTo.FOUR_HUNDRED).json({
          success: false,
          message: responseTo.AT_LEAST_ONE_UPDATE_REQUIRED,
          date: null,
        });
        return;
      // Code: 1
      case responseTo.INVALID_STATUS_CODE:
        res.status(responseTo.FOUR_HUNDRED).json({
          success: false,
          message: responseTo.INVALID_STATUS,
          date: null,
        });
        return;
      // Code: 2
      case responseTo.INVALID_STATUS_TRANSITION_CODE:
        res.status(responseTo.FOUR_HUNDRED).json({
          success: false,
          message: responseTo.TASK_NOT_FOUND,
          date: null,
        });
        return;
      // Code: 3
      case responseTo.TASK_NOT_FOUND_CODE:
        res.status(responseTo.FOUR_HUNDRED).json({
          success: false,
          message: task.error,
          date: null,
        });
        return;
      // Code: 4
      case responseTo.CONCURRENCY_ERROR_CODE:
        res.status(responseTo.FOUR_HUNDRED).json({
          success: false,
          message: responseTo.CONCURRENCY_ERROR,
          date: null,
        });
        return;

      default:
        res.status(responseTo.FIVE_HUNDRED).json({
          success: false,
          message: responseTo.INTERNAL_SERVER_ERROR,
          date: null,
        });
        return;
    }
  }

  // Final response
  res.status(responseTo.TWO_HUNDRED).json({
    success: true,
    message: responseTo.TASK_UPDATE,
    data: toDoTo(task),
  });
});

module.exports = {
  getTaskById,
  createTask,
  updateTaskByID,
};
