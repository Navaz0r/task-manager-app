const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();

// Read all users by GET request
router.get('/users/me', auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Read user by id with GET request
router.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).send();
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Create User by POST request
router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Update User by PATCH request
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdateCols = ['name', 'password', 'email', 'age'];
  const isValidOperation = updates.every((update) => allowedUpdateCols.includes(update));
  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid update!' });
  }

  try {
    updates.forEach((update) => { req.user[update] = req.body[update]; });
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete User by DELETE request
router.delete('/users/me', auth, async (req, res) => {
  try {
    req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Upload file settings
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload JPG,JPEG,PNG files only.'));
    }
    cb(undefined, true);
  },
});

// Upload profile picture
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ height: 250, width: 250 }).png().toBuffer();
  req.user.avatar = buffer;
  await req.user.save();
  res.send();
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message });
});

// Delete profile picture
router.delete('/users/me/avatar', auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(400).send();
  }
});

// Set profile picture binary data to image
router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set('Content-Type', 'image/jpg');
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

// Login user
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByData(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Logout from a device
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();
    console.log('logged out');
    res.status(200).send({ success: 'Successfully logged out.' });
  } catch (e) {
    res.status(500).send(e);
  }
});

// Logout from all devices
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send({ success: 'Successfully logged out from all accounts.' });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
