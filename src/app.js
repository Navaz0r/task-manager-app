const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

// Create express and port
const app = express();

// Use json automatically by express
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
