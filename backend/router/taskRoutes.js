const express = require('express');
const router = express.Router();
const {getTask, createTask, deleteTask} = require('../controllers/task')

router.get('/', getTask);
router.post('/', createTask);
router.delete('/:id', deleteTask);

module.exports = router;