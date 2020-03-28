var mongoose = require('mongoose');
var validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-app-api', {useNewUrlParser: true, useUnifiedTopology:true} );

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

var Task = new mongoose.model('Task',{
    description: {
        type: String,
        trim: true,
        
    }
});

// var task = new Task({
//     description:"Learn about the mongoose library",
//     completed:false
// });

// task.save().then((result)=>{
//     console.log("result: ",result);
//     console.log("task: ",task)
// }).catch(()=>{
//     console.log("Task not saved")
// })

// var me = new User({
//     name: "Sarthak Chaturvedi",
//     email: "sarthak355180@gmail.com",
//     age: "17",
//     password:"sarthaPassword"
// });

// me.save().then(()=>{
//     console.log("User ",me);
// }).catch((err)=>{
//     console.log("Invalid input: ", err);
// })
