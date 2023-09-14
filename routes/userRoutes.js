const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', function (req, res, next) {
  return res.render('form.ejs');
});

// Create a new user
router.post('/users', async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message); // Sending error message as response
  }
});

module.exports = router;
