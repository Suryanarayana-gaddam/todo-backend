const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    taskTitle: { 
        type: String,
        required: true
    },
    username: { 
        type: String,
        required: true
    },
    dateScheduled: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Task = mongoose.model('Task', userSchema);
module.exports = Task;
