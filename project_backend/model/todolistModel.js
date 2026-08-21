const mongoose = require("mongoose");

const todolistSchema = new mongoose.Schema({
    TaskTitle:{
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    DueDate:{
        type: Date,
        required: true
    },
    Priority:{
        type: String,
        required: true
    },
    Status:{
        type: String,
        required: true
    }
})

const ToDoList = mongoose.model("todolist", todolistSchema);

module.exports = ToDoList;