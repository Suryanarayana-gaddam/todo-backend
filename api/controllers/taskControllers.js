const Task = require("../models/tasks");
const User = require ("../models/users");
const { ObjectId } = require("mongodb");

const AddTask = async (req,res) => {
    const {taskTitle,dateScheduled,description} = req.body;
    const username = req.params.username;
    try {
        console.log(username)
        const result = await Task.create({username:username,taskTitle,dateScheduled,description})
        const newTask = await Task.findOne({username});
        console.log(result)
        await User.updateOne(
            {username},
            {$addToSet:{tasks:newTask}},
            {new : true}
        )
        if(!result){
            return res.status(501).json("Error in adding task");
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json("Internal server error!")
    }
}

const GetTaskByUsername = async (req,res) => {
    try {
        const username = req.params.username;
        const tasksByUsername = await Task.find({ username : username});
        console.log("re :",tasksByUsername)
        if(!tasksByUsername){
            return res.status(501).json("Error in adding task");
        }
        res.status(200).json(tasksByUsername);
    } catch (error) {
        res.status(500).json("Internal server error!")
    }
}

const DeleteTaskById = async (req,res) =>{
    const id = req.params.id;
    const {username} = req.body;
    try {
        const deletedOne = await Task.findOne({_id:new ObjectId(id)})
        const deletedTask = await Task.deleteOne({_id:new ObjectId(id)});
        const responses = await User.findOneAndUpdate(
            {username : username},
            {$pull : {tasks : {_id :new ObjectId(id)}}},
            {new : true}
        );
        if(!deletedTask){
            return res.status(501).json("Error in adding task");
        }
        res.status(200).json({ message: "Task deleted successfully", deletedTask: deletedOne });
    } catch (error) {
        res.status(500).json("Internal server error!")
    }
}

const GetTaskById = async (req,res) =>{
    const id = req.params.id;
    try {
        const reqTask = await Task.findOne({_id:new ObjectId(id)})
        
        if(!reqTask){
            return res.status(501).json("Error in adding task");
        }
        res.send(reqTask);
    } catch (error) {
        res.status(500).json("Internal server error!")
    }
}

const UpdateTaskById = async (req,res) => {
    const taskData = req.body;
    const id = req.params.id;
    try {
        const updatedTask = await Task.findOneAndUpdate(
            {_id : new ObjectId(id)},
            {$set : {...taskData}},
            {upsert : true}
        )
        if(!updatedTask){
            return res.status(501).json("Error in adding task");
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json("Internal server error!")
    }
}

module.exports = {AddTask,GetTaskByUsername,DeleteTaskById,GetTaskById,UpdateTaskById}