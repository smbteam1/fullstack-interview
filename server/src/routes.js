const express=require('express')
const { createTask, getTasks, updateTask, deleteTask, getStats } = require('./controller')

const router=express.Router()

router.post('/tasks',createTask)
router.get('/tasks',getTasks)
router.put('/tasks/:id',updateTask)
router.delete('/tasks/:id',deleteTask)
router.get('/tasks/stats',getStats)


module.exports=router