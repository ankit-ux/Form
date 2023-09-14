const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send('User saved successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
