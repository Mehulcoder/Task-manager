require('../src/db/mongoose');
var User = require('../src/db/models/users');

var updateAgeAndCount = async (id,age) => {
    var user = await User.findByIdAndUpdate(id, {age});
    var count = await User.countDocuments({age});
    return count;
}

updateAgeAndCount('5e7f402c8cb8af45a603b49b', 16).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log("e: ",e);
})