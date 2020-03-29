var mongoose = require('mongoose');
var validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-app-api', {useNewUrlParser: true, useUnifiedTopology:true} );



//
// ─── TASK MODEL ─────────────────────────────────────────────────────────────────
//

var Task = new mongoose.model('Task',{
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
});

// ────────────────────────────────────────────────────────────────────────────────




//
// ─── SAVE USER ──────────────────────────────────────────────────────────────────
//

    
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

// ────────────────────────────────────────────────────────────────────────────────

