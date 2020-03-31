var express = require('express');
var router = new express.Router();
var User = require("../db/models/users");


//
// ─── GET ROUTE ──────────────────────────────────────────────────────────────────
//

router.get('/users',async (req, res)=>{
    try {
        var users = await User.find({});
        res.send(users);
    } catch (error) {
        return res.status(500).send("Error: "+error);
    }
});

router.get('/users/:id', async (req, res)=>{
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

// ────────────────────────────────────────────────────────────────────────────────

//
// ─── POST ROUTE ─────────────────────────────────────────────────────────────────
//

router.post("/tasks", async (req, res)=>{
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


router.patch('/users/:id', async (req, res) => {
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

// ────────────────────────────────────────────────────────────────────────────────

//
// ─── DELETE ROUTE ───────────────────────────────────────────────────────────────
//

router.delete('/users/:id', async (req, res) => {
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

// ────────────────────────────────────────────────────────────────────────────────

module.exports = router;

// ────────────────────────────────────────────────────────────────────────────────