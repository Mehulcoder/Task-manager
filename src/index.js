var express = require("express");
var mongoose = require("mongoose");
var User = require("./db/models/users");
var Task = require('./db/models/tasks');
require('../src/db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//
// ─── GET ROUTE ──────────────────────────────────────────────────────────────────
//


app.get('/users',async (req, res)=>{
    try {
        var users = await User.find({});
        res.send(users);
    } catch (error) {
        return res.status(500).send(e);
    }
});

app.get('/users/:id', async (req, res)=>{
    var _id = req.params.id;

    try {
        var user = await User.findById(_id);
        //if user is empty
        if(!user){
            return res.status(404).send();
        }
        //if things go fine
        res.send(user);

    } catch (error) {
        res.status(500).send();
    }
});

app.get('/tasks', async (req, res)=>{
    try {
        var tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get('/tasks/:id', async (req, res)=>{
    var _id = req.params.id;
    try {
        var task = await Task.findById(_id);
        //if task is empty
        if(!task){
            return res.status(404).send();
        }
        //if things go fine
        res.send(task);
        
    } catch (e) {
        res.status(500).send(e);
    }
});
// ────────────────────────────────────────────────────────────────────────────────


//
// ─── POST ROUTE  ────────────────────────────────────────────────────
//

app.post("/users",async (req, res)=>{
    var user = new User(req.body);
    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((err)=>{
        res.send(err)
    });
});

app.post("/tasks", async (req, res)=>{
    var task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.send(error);
    }

});

// ────────────────────────────────────────────────────────────────────────────────

//
// ─── PATCH ROUTE ────────────────────────────────────────────────────────────────
//

app.patch('/users/:id', async (req, res) => {
    var updates = Object.keys(req.body);
    var allowedUpdates = ["age","name","email","password"];
    var isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({
            error: "Invalid updates!"
        });
    }

    var id = req.params.id
    try {
        var user = await User.findByIdAndUpdate(id, req.body, {new:true, runValidators:true});
        
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.patch('/tasks/:id', async (req, res) => {
    var updates = Object.keys(req.body);
    var allowedUpdates = ["description","completed"];
    var isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({
            error: "Invalid updates!"
        });
    }

    var id = req.params.id
    try {
        var task = await Task.findByIdAndUpdate(id, req.body, {new:true, runValidators:true});
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

// ────────────────────────────────────────────────────────────────────────────────


//
// ─── DELETE ROUTE ───────────────────────────────────────────────────────────────
//

app.delete('/users/:id', async (req, res) => {
    var _id = req.params.id;

    try {
        var user = await User.findByIdAndDelete(_id);
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
})

app.delete('/tasks/:id', async (req, res) => {
    var _id = req.params.id;

    try {
        var task = await Task.findByIdAndDelete(_id);
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
})

// ────────────────────────────────────────────────────────────────────────────────

app.listen(port,()=>{
    console.log("Server is on port "+port);
});

