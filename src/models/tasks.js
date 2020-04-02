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
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})


//
// ─── PRE HOOKS ──────────────────────────────────────────────────────────────────
//

taskSchema.pre('save',async function (next) {  
    console.log("This is before the save!");
    next();
})

//
// ─── MODEL THE USER SCHEMA ───────────────────────────────────────────────────────
//
    
var Task = mongoose.model('Task', taskSchema);

//
// ─── EXPORT THE SCHEMA ──────────────────────────────────────────────────────────
//

module.exports = Task;

// ────────────────────────────────────────────────────────────────────────────────
