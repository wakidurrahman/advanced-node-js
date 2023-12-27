const { Router } = require('express');
const {
  getTasks,
  createTask,
  getTaskById,
  updateTaskByID,
} = require('../../../controllers/task');

const router = Router();

router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.put('/:id', updateTaskByID);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Tasks
 *  description: Task management and retrieval
 * /v1/tasks/{id}:
 *  get:
 *   summary: Get a task by id
 *   tags: [Tasks]
 *   description: Get a task by id
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *       required: true
 *       description: Task id
 *       example: 5f0a3d9a3e06e52f3c7a6d5c
 *   responses:
 *    200:
 *     description: Task Retrieved
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/TaskResult'
 *    404:
 *     description: Task not found
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/TaskResult'
 *    500:
 *     description: Internal Server Error
 *  post:
 *   summary: Update a task by id
 *   tags: [Tasks]
 *   description: Update a task by id
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *       required: true
 *       description: Task id
 *       example: 5f0a3d9a3e06e52f3c7a6d5c
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UpdateTask'
 *   responses:
 *    200:
 *     description: Task Updated
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/TaskResult'
 *     404:
 *      description: Task not found
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/TaskResult'
 *     500:
 *      description: Internal Server Error
 * /v1/tasks:
 *  put:
 *   summary: Create a task
 *   tags: [Tasks]
 *   description: Create a task
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/CreateTask'
 *   responses:
 *    201:
 *     description: Task Created
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/TaskResult'
 *    500:
 *     description: Internal Server Error
 */
