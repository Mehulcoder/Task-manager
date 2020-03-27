var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var connectionURL = 'mongodb://127.0.0.1:27017';
var databaseName = 'task-manager';

MongoClient.connect(connectionURL,{useNewUrlParser:true, useUnifiedTopology: true},(error, client)=>{
    if(error){
        return console.log("Unable to connect");
    }

    //The database that we are trying to maniplulate
    const db = client.db(databaseName);

    db.collection('tasks').insertMany([{
        description: "Task 1", 
        completed: true,
    },{
        description: "Task 2", 
        completed: true,
    },{
        description: "Task 3", 
        completed: false,
    }],(err, result)=>{
        if (err) {
            return console.log("Unable to insert");
        }
        console.log(result.ops);
    });
});
