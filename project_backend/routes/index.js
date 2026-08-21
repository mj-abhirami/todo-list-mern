const todolistRouter = require("./todolistRouter");
const express = require("express");
const router = express.Router();

router.use("/todolist",todolistRouter);

module.exports = router;