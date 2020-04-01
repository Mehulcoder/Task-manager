var express = require("express");
var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var userRouter = require('./routers/user');
var taskRouter = require('./routers/task');
var auth = require('./middleware/auth');
require('../src/db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

//
// ─── MIDDLEWARE ─────────────────────────────────────────────────────────────────
//

// app.use((req, res, next) => {
//     res.status(503).send("The site is under maintainance!");
// })

// ────────────────────────────────────────────────────────────────────────────────

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port,()=>{
    console.log("Server is on port "+port);
});

