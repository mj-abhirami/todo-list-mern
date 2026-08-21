const todolistController = require("../controller/todolistController");

const express = require("express");
const todolistRouter = express.Router();

todolistRouter.post("/create", todolistController.createToDoList);
todolistRouter.get("/get", todolistController.getToDoList);
todolistRouter.get("/get/:id", todolistController.getSingleToDo);
todolistRouter.put("/update/:id", todolistController.updateToDoList);
todolistRouter.delete("/delete/:id", todolistController.deleteToDoList);

module.exports = todolistRouter;