var express = require("express");
var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
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

