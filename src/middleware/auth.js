var jwt = require('jsonwebtoken');
var User = require('../models/users');

var auth = async (req,res, next) => {
    try {
        var token = req.header('Authorization').replace('Bearer ','');
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        var user = await User.findOne({_id:decoded._id, 'tokens.token':token});

        if (!user) {
            throw new Error("Token is invalid");
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({error:"Please validate authentication!"});
    }
}

module.exports = auth;