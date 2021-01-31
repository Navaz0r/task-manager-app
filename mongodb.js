/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable max-len */

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

  /* --> Find and print values with find method
     db.collection('users').findOne({ _id: new ObjectID('600b8683c2c02824c87a5cac') }, (err, user) => {
    if (err) {
      return console.log('Failed to find user.');
    }
    console.log(user);
  });

  db.collection('users').find({ name: 'Serdar' }).toArray((err, foundUsers) => {
    if (err) {
      return console.log('Failed to find users.');
    }
    console.log(foundUsers);
  });

  db.collection('users').find({ name: 'Serdar' }).count((err, count) => {
    if (err) {
      return console.log('Failed to find users.');
    }
    console.log(count);
  }); */

  /* db.collection('tasks').findOne({ _id: new ObjectID('600b8f6dd644383d5ce5ff54') }, (error, result) => {
    if (error) {
      return console.log('Failed to find task.');
    }
    console.log(result);
  });
  db.collection('tasks').find({ completed: true }).toArray((err, result) => {
    console.log('Completed tasks.');
    if (err) {
      return console.log('Failed to find tasks.');
    }
    console.log(result);
  }); */

  /* --> Update data by set function in mongodb
  db.collection('users').updateOne({
    _id: new ObjectID('600b89547aade449f4a1c7db'),
  }, {
    $set: {
      name: 'Navarin',
    },
  }).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  }); */

  /* --> Update data by inc function in mongodb
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
  }); */

  /* db.collection('users').updateMany({
    age: 30,
  },
  {
    $set: {
      age: 26,
    },
  }).then((result) => {
    console.log('Updated records: ', result.modifiedCount);
  }).catch((error) => {
    console.log(error);
  }); */

  /* db.collection('tasks').deleteOne({ _id: new ObjectID('600b8f6dd644383d5ce5ff53') }).then((result) => {
    console.log('Deleted records: ', result.deletedCount);
  }).catch(() => {
    console.log(error);
  }); */
});
