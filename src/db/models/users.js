var mongoose = require('mongoose');
var validator = require('validator');
var bcrypt = require('bcryptjs');


//
// ─── USER MODEL SCHEMA─────────────────────────────────────────────────────────────────
//

var userSchema = new mongoose.Schema({
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

//
// ─── DEFINE THE FUNCTION TO FIND USER ───────────────────────────────────────────
//

userSchema.statics.findByCredentials = async (email, password) => {
    var user = await User.findOne({email});
    if (!user) {
        throw new Error("Unable to login!");
    }

    var match = await bcrypt.compare(password,user.password);

    if(!match){
        throw new Error("Unable to login!");
    }

    return user;
}

//
// ─── PASSWORD HASHING ───────────────────────────────────────────────────────────
//

userSchema.pre('save', async function (next) {  
    
    //Check if the passoword is changed
    //If yes than hash it
    
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password,8);
    }
    next();
})

//
// ─── MODEL THE SCHEMA ─────────────────────────────────────────────────────────────
//    

var User = mongoose.model('User', userSchema);

//
// ─── MODULE EXPORT ──────────────────────────────────────────────────────────────
//

module.exports = User;

// ────────────────────────────────────────────────────────────────────────────────
