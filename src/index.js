const express = require('express');
require('./db/mongoose');
const { ObjectID } = require('mongodb');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

// Create express and port
const app = express();
const port = process.env.PORT;

// Use json automatically by express
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up and running. ${port}`);
});
