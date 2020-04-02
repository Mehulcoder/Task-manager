var express = require('express');
var router = new express.Router();
var multer = require('multer');
var User = require("../models/users");
var auth = require('../middleware/auth');

//
// ─── VIEW ROUTE ──────────────────────────────────────────────────────────────────
//

//We've changed the route below to prevent access of data of other users
router.get('/users/me',auth,async (req, res)=>{
    res.send(req.user);
});

// ────────────────────────────────────────────────────────────────────────────────

router.get('/users/:id', async (req, res)=>{
    var _id = req.params.id;

    try {
        var user = await User.findById(_id);
        //if user is empty
        if(!user){
            return res.status(404).send();
        }
        //if things go fine
        res.send(user);

    } catch (error) {
        res.status(500).send();
    }
});


//
// ─── SIGN UP ─────────────────────────────────────────────────────────────────
//

router.post("/users", async (req, res)=>{
    var user = new User(req.body);
    try {
        await user.save();
        var token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }

});

//
// ─── LOGIN ──────────────────────────────────────────────────────────────────────
//

router.post('/users/login',async (req, res) => {
    try {
        var user = await User.findByCredentials(req.body.email, req.body.password);
        var token = await user.generateAuthToken();
        res.send({user,token});
    } catch (e) {
        res.status(400).send(e);
    }
})

//
// ─── UPLOAD A PICTURE ───────────────────────────────────────────────────────────
//

var upload = multer({ 
    dest: 'avatar',
    limits:{
        fileSize: 2000000
    },
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
           return cb(new Error('File must be an image of .jpg/.jpeg format'));
        }

        cb(undefined,true);
    }
})

router.post('/users/me/avatar',upload.single('avatar'),(req, res) => {
    res.send();
})

//
// ─── LOG OUT OF CURRENT SESSION ────────────────────────────────────────────────────────────────────
//

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token!=req.token;
        })

        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

//
// ─── LOG OUT OF ALL SESSIONS ────────────────────────────────────────────────────
//

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        var user = req.user;
        user.tokens = [];
        await user.save();
        res.status(200).send("Logged out of all sessions!");
    } catch (e) {
        res.status(400).send(e);
    }
})

//
// ─── PATCH ROUTE ────────────────────────────────────────────────────────────────
//

router.patch('/users/me', auth, async (req, res) => {
    var updates = Object.keys(req.body);
    var allowedUpdates = ["age","name","email","password"];
    var isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({
            error: "Invalid updates!"
        });
    }

    //No need of getting id as we'll update only us
    // var id = req.params.id
    try {
        var user = req.user;
        updates.forEach((update) => {
            
            //since update is a variable therefore square bracket
            user[update] = req.body[update];
        })

        //Now we have the acces to middleware before the save
        await user.save();

        // The below bypasses the middleware. Therefore not good
        // var user = await User.findByIdAndUpdate(id, req.body, {new:true, runValidators:true});
        
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

//
// ─── DELETE ROUTE ───────────────────────────────────────────────────────────────
//

//We change it. We should only be able to delete us and not anyone
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
})

// ────────────────────────────────────────────────────────────────────────────────

module.exports = router;

// ────────────────────────────────────────────────────────────────────────────────
