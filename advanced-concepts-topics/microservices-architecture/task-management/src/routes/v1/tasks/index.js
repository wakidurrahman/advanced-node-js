const { Router } = require('express');
const {
  createTask,
  getTaskById,
  updateTaskByID,
} = require('../../../controllers/task');

const router = Router();

router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTaskByID);

module.exports = router;
