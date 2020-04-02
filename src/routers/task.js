var express = require('express');
var router = new express.Router();
var auth = require('../middleware/auth');
var Task = require('../models/tasks');
var User = require('../models/users');

//
// ─── GET ROUTE ──────────────────────────────────────────────────────────────────
//

// Get /tasks?completed = true
// GET /tasks?limit=10&skip=10
// GET /tasks?sortBy=createdAt:asc
router.get('/tasks',auth, async (req, res)=>{
    try {
        var match = {};
        var sort = {};

        if (req.query.completed) {
            match.completed = req.query.completed === 'true'
        }
        if (req.query.sortBy) {
            var parts = req.query.sortBy.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }

        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }

        }).execPopulate();
        res.send(req.user.tasks);
    } catch (error) {
        return res.status(500).send(error);
    }
})

router.get('/tasks/:id',auth, async (req, res)=>{
    var _id = req.params.id;
    try {
        var task = await Task.findOne({_id, owner: req.user._id});
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

router.post("/tasks",auth, async (req, res)=>{
    var task = new Task({
        ...req.body,
        owner:req.user._id
    });
    
    try {
        await task.save();
        res.status(201).send(task);
    } catch (err) {
        res.status(400).send(err)
    }
});

//
// ─── PATCH ROUTE ────────────────────────────────────────────────────────────────
//

router.patch('/tasks/:id', auth, async (req, res) => {
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
        // The below bypasses the middleware. Therefore not good
        // var task = await Task.findByIdAndUpdate(id, req.body, {new:true, runValidators:true});
        console.log("I'm atleast here",req.user._id,id);
        var task = await Task.findOne({_id:id,owner:req.user._id});

        if (!task) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            //since update is a variable therefore square bracket
            task[update] = req.body[update];
        })

        //Now we have the acces to middleware before the save
        await task.save();

        
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

//
// ─── DELETE ROUTE ───────────────────────────────────────────────────────────────
//

router.delete('/tasks/:id', auth, async (req, res) => {
    var _id = req.params.id;

    try {
        var task = await Task.findOne({_id, owner:req.user._id});
        
        if(!task){
            return res.status(404).send();
        }

        await task.remove();
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
})

// ────────────────────────────────────────────────────────────────────────────────

module.exports = router;

// ────────────────────────────────────────────────────────────────────────────────
