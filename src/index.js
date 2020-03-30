var express = require("express");
var mongoose = require("mongoose");
var User = require("./db/models/users");
var Task = require('./db/models/tasks');
require('../src/db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//
// ─── POST ROUTE  ────────────────────────────────────────────────────
//
app.post("/users",(req, res)=>{
    var user = new User(req.body);
    user.save().then(()=>{
        res.send(user)
    }).catch((err)=>{
        console.log(err)
    });
});

app.post("/tasks", (req, res)=>{
    var task = new Task(req.body);
    task.save().then(()=>{
        res.send(task);
    }).catch((e)=>{
        console.log(e);
    });

});

// ────────────────────────────────────────────────────────────────────────────────


app.listen(port,()=>{
    console.log("Server is on port "+port);
});

