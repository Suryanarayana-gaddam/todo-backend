const mongoose = require("mongoose")
const {Schema} = mongoose;

const userSchema = new Schema({
    taskTitle :
        { 
            String,
            required : true
        },
    dateScheduled :
        {
            type : String,
            require : true
        },
    description : 
        {
            type : String,
            required : true
        },
    
});

const Task = mongoose.model('Task', userSchema );
module.exports = Task;