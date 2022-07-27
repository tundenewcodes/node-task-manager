const mongoose = require('mongoose')



const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: [20, 'name not more than 20 characters'],
        required: [true, 'name  required please']
    },
    completed: { type: Boolean, default: false }

})

module.exports = mongoose.model('Task', TaskSchema)