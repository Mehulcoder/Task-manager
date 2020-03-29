var mongoose = require('mongoose');
var validator = require('validator');

//
// ─── USER MODEL ─────────────────────────────────────────────────────────────────
//
var User = mongoose.model('user',{
    name: {
        type: String,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter a valid email address!");
            }
        }
    },
    age:{
        type: Number,
        required:true,
        default: 0,
        validate(value){
            if(value<=0){
                throw Error("Age must be a positive number");
            }
        }
    },
    password:{
        type:String,
        required: true,
        validate(value){
            if(!validator.isLength(value,{min:6,max:1000}))
            {
                throw Error("Minimum length of the password must be 6");
            }

            if(value.toLowerCase().includes('password')){
                throw Error('The password should not contain the keyword "password"!');
            }
        }
    }
});
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── MODULE EXPORT ──────────────────────────────────────────────────────────────
//

module.exports = User;


//
// ─── SAVE TASK ──────────────────────────────────────────────────────────────────
//

// var task = new Task({
//     description:"Eat lunch",
//     completed:"true"
// });

// task.save().then(()=>{
//     console.log("task: ",task)
// }).catch((err)=>{
//     console.log("Task not saved: ", err)
// })