const express =require('express')
const connectDB = require('./config/connectDB')
const errorHandler = require('./middlewares/error')
const cors = require('cors')
const taskRouter = require('./routes/task.routes')
require('dotenv').config()

const app = express()

app.use(cors())

app.use(express.json())

connectDB()

app.use('/tasks', taskRouter)

app.use(errorHandler)

app.listen(process.env.PORT, ()=>{
    console.log("SERVER STARTED ON PORT:", process.env.PORT);
})