var mongoose = require('mongoose');
var validator = require('validator');

//
// ─── USER MODEL ─────────────────────────────────────────────────────────────────
//

var Task = mongoose.model('Task', {
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

module.exports = Task;