var mongoose = require('mongoose');
var validator = require('validator');
mongoose.connect('mongodb://127.0.0.1:27017/task-app-api', {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex:true} );
