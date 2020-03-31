var express = require('express');
var router = new express.Router();
var Task = require('../db/models/tasks');


//
// ─── GET ROUTE ──────────────────────────────────────────────────────────────────
//

router.get('/tasks', async (req, res)=>{
    try {
        var tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        return res.status(500).send(error);
    }
})

router.get('/tasks/:id', async (req, res)=>{
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

router.post("/users",async (req, res)=>{
    var user = new User(req.body);
    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((err)=>{
        res.send(err)
    });
});

// ────────────────────────────────────────────────────────────────────────────────

//
// ─── PATCH ROUTE ────────────────────────────────────────────────────────────────
//

router.patch('/tasks/:id', async (req, res) => {
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

router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router;

// ────────────────────────────────────────────────────────────────────────────────
