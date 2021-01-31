/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */

// Creating MongoClient variable and ObjectID
const { MongoClient, ObjectID } = require('mongodb');

// Creating MongoDB connection properties. (URL and DB Name)
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// Here we connect and insert to the MongoDB Database (2 parameters for the callback. Error and Client)
MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database.');
  }
  // Use db function to connect the specific database.
  const db = client.db(databaseName);

  db.collection('users').updateOne(
    {
      _id: new ObjectID('600b89547aade449f4a1c7db'),
    },

    {
      $inc: {
        age: -1,
      },
    },
  ).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });

)};



