const express = require('express');
const router = express.Router();

// Handle form submission
router.post('/', (req, res) => {
  // Extract form data from the request body
  const { firstName, lastName, email, country, state, city, gender, dob } = req.body;



  // Calculate the age
  const birthDate = new Date(dob);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();

  // Render a page to display the submitted information
  res.render('submitted', {
    firstName,
    lastName,
    email,
    country,
    state,
    city,
    gender,
    dob,
    age,
  });
});

module.exports = router;
