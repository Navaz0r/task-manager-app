const express = require('express');
const User = require('../models/user');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = new express.Router();

// Read all Tasks by GET request
router.get('/tasks', auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === 'true';
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    const user = await User.findById(req.user._id);
    await user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,

      },
    }).execPopulate();
    res.send(user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

// Read Task by id with GET request
router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(400).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

// Create Task by POST request
router.post('/tasks', auth, async (req, res) => {
  // const task = await new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send();
  }
});

// Update Task by PATCH request
router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdateCols = ['description', 'completed'];
  const isValidOperation = updates.every((update) => allowedUpdateCols.includes(update));
  const _id = req.params.id;

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid update!' });
  }

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(400).send();
    }

    updates.forEach((update) => { task[update] = req.body[update]; });
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    // await Task.findByIdAndDelete(_id);
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
    if (!task) {
      res.status(404).send();
    }

    res.send({ success: `Task that owns the "${_id}" id number has been deleted.` });
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
