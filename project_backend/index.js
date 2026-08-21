const express = require("express");
const cors = require("cors");
const router = require("./routes");
const {default:mongoose} = require("mongoose");
require("dotenv").config();
const app = express();

app.use(cors());

const connectDB = async() => {
    await mongoose.connect(process.env.URI);
    console.log("DB connected successfully");
}

connectDB()

app.use(express.json())

app.use("/api/v1", router);

app.listen(3000,() => {
    console.log("Server is running on port 3000")
});