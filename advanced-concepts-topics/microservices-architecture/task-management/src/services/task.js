const TaskModel = require('../models/task');
const responseTo = require('../utils/response-to');
const logger = require('../config/logger');

// Available status transitions  "new", "active", "completed", "cancelled"
const availableUpdates = {
  new: ['active', 'cancelled'],
  active: ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
};

const getTasks = () => TaskModel.find();

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
      error: responseTo.AT_LEAST_ONE_UPDATE_REQUIRED,
      code: responseTo.AT_LEAST_ONE_UPDATE_REQUIRED_CODE,
    };
  }
  /**
   * LearnME: (in) operator
   * The (in) operator determines whether an object has a given property.
   */
  if (status && !(status in availableUpdates)) {
    return {
      error: responseTo.INVALID_STATUS,
      code: responseTo.INVALID_STATUS_CODE,
    };
  }

  for (let retry = 0; retry < 3; retry += 1) {
    const task = await TaskModel.findById(id);
    if (!task) {
      return {
        error: responseTo.TASK_NOT_FOUND,
        code: responseTo.INVALID_STATUS_TRANSITION_CODE,
      };
    }
    if (status) {
      const allowedStatuses = availableUpdates[task.status];
      console.log('Status', allowedStatuses);
      if (!allowedStatuses.includes(status)) {
        return {
          error: `cannot update from '${task.status}' to '${status}'`,
          code: responseTo.TASK_NOT_FOUND_CODE,
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
      logger.warn('error during save', { error });
      if (error.name === 'VersionError') {
        continue;
      }
    }
    return task;
  }
  return {
    error: responseTo.CONCURRENCY_ERROR,
    code: responseTo.CONCURRENCY_ERROR_CODE,
  };
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTaskById,
};
