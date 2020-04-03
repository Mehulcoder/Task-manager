var mongoose = require('mongoose');
var validator = require('validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var sharp = require('sharp');
var Task = require('./tasks');

//
// ─── USER MODEL SCHEMA─────────────────────────────────────────────────────────────────
//

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required:true
    },
    email:{
        type: String,
        unique: true,
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
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
});

//
// ─── VIRTUAL PROPERTY ───────────────────────────────────────────────────────────
//

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id', //the localField(of the User)=>_id is related to the 
    foreignField:'owner' //foreignField 'owner' of the Tasks
})

//
// ─── DELETE ALL RELATED TASKS ───────────────────────────────────────────────────
//

userSchema.pre('remove', async function (next) {  
    var user = this;
    await Task.deleteMany({owner:user._id});
    next();
})

//
// ─── GENERATEAUTHTOKEN ──────────────────────────────────────────────────────────
//

userSchema.methods.generateAuthToken = async function () {  
    var user = this;
    var token = await jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;

}

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
// ─── HIDING THE PRIVATE INFO ────────────────────────────────────────────────────
//

userSchema.methods.toJSON = function () {  
    const user = this;
    var userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject
};

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
