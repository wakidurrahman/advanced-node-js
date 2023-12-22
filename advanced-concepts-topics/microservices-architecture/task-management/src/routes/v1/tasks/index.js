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
