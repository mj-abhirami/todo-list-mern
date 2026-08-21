const asyncHandler = require("express-async-handler");
const ToDoList = require("../model/todolistModel");

const todolistController = {
    createToDoList: asyncHandler(
        async (req, res) => {
            const { TaskTitle, Description, DueDate, Priority, Status } = req.body;
            if (!TaskTitle || !Description || !DueDate || !Priority || !Status) {
                res.status(404).send("all these fields are required fields")
            }
            const createToDoList = await ToDoList.create({
                TaskTitle, Description, DueDate, Priority, Status
            })
            res.status(200).send("Tasks entered successfully")
        }
    ),
    getToDoList: asyncHandler(async (req, res) => {
        const getToDoList = await ToDoList.find();
        res.status(201).json({
            message: "student found",
            getToDoList
        })
    }),
    getSingleToDo: asyncHandler(async (req, res) => {
        const task = await ToDoList.findById(req.params.id);

        res.status(200).json(task);
    }),
    updateToDoList: asyncHandler(async (req, res) => {
        const updateToDoList = await ToDoList.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json({
            message: "Task updated successfully",
            updateToDoList
        })
    }),
    deleteToDoList: asyncHandler(async (req, res) => {
        const deleteToDoList = await ToDoList.findByIdAndDelete(req.params.id);
        res.status(201).json({
            message: "Task deleted successfully",
            deleteToDoList
        })
    })
}

module.exports = todolistController