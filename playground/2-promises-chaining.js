/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
require('../src/db/mongoose');
const { response } = require('express');
const { findOneAndDelete } = require('../src/models/task');
const Task = require('../src/models/task');

/* Task.findByIdAndDelete('600ceb8000370f1a6c7c7f5a').then((task) => {
  console.log(task);
  return Task.countDocuments({ completed: false });
}).then((result) => {
  console.log('Number of uncompleted tasks: ', result);
}); */

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount('600e2354aa65b81d2831f35a').then((result) => {
  console.log('Number of uncompleted tasks: ', result);
}).catch((e) => {
  console.log('Error: ', e);
});
