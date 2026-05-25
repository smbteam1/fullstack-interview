const router = require('express').Router()
const taskController = require('../controllers/task.controller')

router.post('/', taskController.createTask)

router.get('/',  taskController.getTasks)

router.get('/:id', taskController.getTaskById)

router.patch('/:id', taskController.editTask)

router.delete('/:id', taskController.deleteTask)

router.get('/stats', taskController.getTaskStats)

module.exports= router