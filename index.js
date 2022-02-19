// Status code reminders

// 200s => All good
// 400s => User input errors
// 500s => Server errors

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const postRouter = require("./routes/postRouter");
const userRouter = require("./routes/userRouter");

// Setting up MongoDB connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

// Configure the Express app
const app = express();
app.set("port", process.env.port || 3000);
app.use(express.json());
app.use(cors());

// API routes
app.get("/", (req, res, next) => {
  res.send("<h1>Hello world<h1>");
});
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(app.get("port"), (server) => {
  console.info(`Server listen on port ${app.get("port")}`);
  console.info("Press CTRL + C to close the server");
});
