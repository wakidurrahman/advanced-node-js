const { error } = require("winston");
const TaskModel = require("../models/task");

const AT_LEAST_ONE_UPDATE_REQUIRED_CODE = 0;
const INVALID_STATUS_CODE = 1;
const INVALID_STATUS_TRANSITION_CODE = 2;
const TASK_NOT_FOUND_CODE = 3;
const CONCURRENCY_ERROR_CODE = 4;

// Available status transitions  "new", "active", "completed", "cancelled"
const availableUpdates = {
  new: ["active", "cancelled"],
  active: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

/**
 * Get Task By Task Id
 * @param {*} id
 * @returns
 */
const getTaskById = (id) => TaskModel.findById(id);

/**
 * Create Task with name and description
 * @param {*} name
 * @param {*} description
 * @returns
 */
const createTask = (name, description) =>
  TaskModel.create({ name, description });
/**
 * This is an example of a task update
 * @param {*} id 
 * @param {*} param1 
 * @returns 
 * 
 * The most exciting part is saving the model after the update. 
 * I’m using an optimistic lock to fight against the race condition problem.
 * 
 * Imagine in two concurrent requests, you’re trying to `complete` and `cancel` the same task. 
 * Race conditions might occur when they both get a task with the status ‘active’ and save the model. 
 * The first task status might be changed to ‘completed’ and then to ‘canceled’ (or vice versa). 
 * This is wrong because the transition ‘completed’-’canceled’ and ‘canceled’-’completed’ is prohibited.
 */
const updateTaskById = async (id, { name, description, status }) => {
  if (!name && !description && !status) {
    return {
      error: "at least one update required",
      code: AT_LEAST_ONE_UPDATE_REQUIRED_CODE,
    };
  }
  /**
   * LearnME: (in) operator
   * The (in) operator determines whether an object has a given property.
   */
  if (status && !(status in availableUpdates)) {
    return {
      error: "invalid status",
      code: INVALID_STATUS_CODE,
    };
  }

  for (let retry = 0; retry < 3; retry += 1) {
    const task = await TaskModel.findById(id);
    if (!task) {
      return {
        error: "task not found",
        code: INVALID_STATUS_TRANSITION_CODE,
      };
    }
    if (status) {
      const allowedStatuses = availableUpdates[task.status];
      if (!allowedStatuses.includes(status)) {
        return {
          error: `cannot update from '${task.status}' to '${status}'`,
          code: TASK_NOT_FOUND_CODE,
        };
      }
    }

    /**
     * LearnME: (??) operator
     * The nullish coalescing (??) operator is a logical operator that returns its right-hand side operand
     * when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
     */

    task.status = status ?? task.status;
    task.name = name ?? task.name;
    task.description = description ?? task.description;
    task.updatedAt = Date.now();

    try {
      await task.save();
    } catch (error) {
      if (error.name === "VersionError") {
        continue;
      }
    }
    return task;
  }
  return {
    error: "concurrency error",
    code: CONCURRENCY_ERROR_CODE,
  };
};

module.exports = {
  getTaskById,
  createTask,
  updateTaskById,

  errorCodes: {
    AT_LEAST_ONE_UPDATE_REQUIRED_CODE,
    INVALID_STATUS_CODE,
    INVALID_STATUS_TRANSITION_CODE,
    TASK_NOT_FOUND_CODE,
    CONCURRENCY_ERROR_CODE,
  },
};
