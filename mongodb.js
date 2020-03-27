var mongodb = require('mongodb');
// var MongoClient = mongodb.MongoClient; var ObjectID = mongodb.ObjectID;
var {MongoClient, ObjectID} = require('mongodb');

var connectionURL = 'mongodb://127.0.0.1:27017';
var databaseName = 'task-manager';

var id = new ObjectID();
console.log(id.getTimestamp());

MongoClient.connect(connectionURL,{useNewUrlParser:true, useUnifiedTopology: true},(error, client)=>{
    if(error){
        return console.log("Unable to connect");
    }

    //The database that we are trying to maniplulate
    const db = client.db(databaseName);

    db.collection('tasks').find({completed:true}).toArray((err, array)=>{
        if (err) {
            return console.log(err);
        }

        console.log(array);
    });
});
