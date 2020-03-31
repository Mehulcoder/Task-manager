var mongoose = require('mongoose');
var validator = require('validator');
var bcrypt = require('bcryptjs');

//
// ─── USER MODEL SCHEMA─────────────────────────────────────────────────────────────────
//

var taskSchema = mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required:true
    },
    completed:{
        type:Boolean,
        required: false,
        default: false
    }
})


//
// ─── PRE HOOKS ──────────────────────────────────────────────────────────────────
//

taskSchema.pre('save',async function (next) {  
    console.log("This is before the save!");
    next();
})

//
// ─── MODEL THE USER SCHEM ───────────────────────────────────────────────────────
//
    
var Task = mongoose.model('Task', taskSchema);

module.exports = Task;