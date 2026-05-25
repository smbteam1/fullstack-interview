const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type:String,
        maxLenght: 150
    },
    category:{
        type: String,
        required: [true, 'Provide a valid category'],
        enum: ['work', 'personal', 'shopping', 'other']
    },
    status:{
        type: String,
        required: [true, 'provide a valid status'],
        enum: ['pending', 'in-progress', 'completed']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Task', TaskSchema)