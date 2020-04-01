var auth = async (req,res, next) => {
    console.log("AUth middleware");
    next();
}

module.exports = auth;