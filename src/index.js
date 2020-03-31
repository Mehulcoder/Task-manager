var express = require("express");
var mongoose = require("mongoose");
var User = require("./db/models/users");
var Task = require('./db/models/tasks');
var userRouter = require('./routers/user');
var taskRouter = require('./routers/task');
require('../src/db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port,()=>{
    console.log("Server is on port "+port);
});

