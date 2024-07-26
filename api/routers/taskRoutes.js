const express = require("express");
const router = express.Router();

const {GetTaskById,GetTaskByUsername,UpdateTaskById,DeleteTaskById,AddTask} = require("../controllers/taskControllers");

router.get("/get/task/:id",GetTaskById);
router.get("/get-tasks/:username",GetTaskByUsername);
router.post("/addtask/:username",AddTask);
router.patch("/update/task/:id",UpdateTaskById);
router.delete("/delete-task/:id",DeleteTaskById);