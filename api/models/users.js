const mongoose = require("mongoose")
const {Schema} = mongoose;

const userSchema = new Schema({
    username :
        { 
            String,
            required : true
        },
    password :
        {
            type : String,
            require : true
        },
    email : 
        {
            type : String,
            required : true
        },
    tasks :
        [{
            _id : mongoose.Schema.Types.ObjectId,
            taskTitle : String,
            dateScheduled : String,
            description : String
        }]
    
});

const User = mongoose.model('User', userSchema );
module.exports = User;