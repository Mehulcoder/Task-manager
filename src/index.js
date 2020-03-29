var express = require("express");
var mongoose = require("mongoose");
require("./db/mongoose");
var User = require("./db/models/users")

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users",(req, res)=>{
    console.log(req.body)
    var user = new User(req.body);
    user.save().then(()=>{
        res.send(user)
    }).catch((err)=>{
        console.log(err)
    });
});


app.listen(port,()=>{
    console.log("Server is on port "+port);
});

