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

app.get('/users', (req, res)=>{
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((e)=>{
        res.status(500).send(e);
    });
});

app.get('/users/:id', (req, res)=>{
    var _id = req.params.id;
    var user = User.findById(_id).then((user)=>{
        //if user is empty
        if(!user){
            return res.status(404).send();
        }
        //if things go fine
        res.send(user);
    }).catch(()=>{
        res.status(500).send();
    });
});

app.get('/tasks', (req, res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks);
    }).catch((e)=>{
        res.status(500).send(e);
    });
})

app.get('/tasks/:id', (req, res)=>{
    var _id = req.params.id;
    var user = Task.findById(_id).then((task)=>{
        //if user is empty
        if(!task){
            return res.status(404).send();
        }
        //if things go fine
        res.send(task);
    }).catch(()=>{
        res.status(500).send();
    });
});
// ────────────────────────────────────────────────────────────────────────────────


//
// ─── POST ROUTE  ────────────────────────────────────────────────────
//

app.post("/users",(req, res)=>{
    var user = new User(req.body);
    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((err)=>{
        res.send(err)
    });
});

app.post("/tasks", (req, res)=>{
    var task = new Task(req.body);
    task.save().then(()=>{
        res.status(201).send(task);
    }).catch((e)=>{
        res.send(e);
    });

});

// ────────────────────────────────────────────────────────────────────────────────


app.listen(port,()=>{
    console.log("Server is on port "+port);
});

