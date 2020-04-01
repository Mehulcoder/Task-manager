var express = require('express');
var router = new express.Router();
var auth = require('../middleware/auth');
var Task = require('../models/tasks');


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

//
// ─── POST ROUTE  ────────────────────────────────────────────────────
//

router.post("/tasks",async (req, res)=>{
    var task = new Task({
        ...req.body,
        owner:req.user._id
    });
    
    task.save().then(()=>{
        res.status(201).send(task);
    }).catch((err)=>{
        res.send(err)
    });
});

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
        var task = await Task.findById(id);

        updates.forEach((update) => {
            
            //since update is a variable therefore square bracket
            task[update] = req.body[update];
        })

        //Now we have the acces to middleware before the save
        await task.save();

        // The below bypasses the middleware. Therefore not good
        // var task = await Task.findByIdAndUpdate(id, req.body, {new:true, runValidators:true});
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

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
