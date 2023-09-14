const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Country = require('./models/Country'); // Adjust the path as per your project structure
const State = require('./models/State'); // Adjust the path as per your project structure
const City = require('./models/City'); // Adjust the path as per your project structure


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/myDB', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// Event listener for successful database connection
db.once('open', () => {
  console.log('Connected to the database');
});

// Event listener for database connection errors
db.on('error', (error) => {
  console.error('Database connection error:', error);
  process.exit(1); // Exit the application on database connection error
});

const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

const submitRoutes = require('./routes/submit'); 
app.use('/submit', submitRoutes);



app.post('/submit', (req, res) => {
  const { firstName, lastName, email, country, state, city, gender, dob, age } = req.body;

  // Assuming you're using EJS for rendering
  res.render('submitted', { firstName, lastName, email, country, state, city, gender, dob, age });
});




app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set the views directory
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', async (req, res) => {
  try {
      const countries = await Country.find({}, 'name');
      const states = await State.find({}, 'name');
      const cities = await City.find({}, 'name');

      res.render('form', { countries, states, cities }); // Render the EJS template with data
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});
// Add these routes to your server

app.get('/states', async (req, res) => {
  const country = req.query.country;

  try {
      const states = await State.find({ country: country }, 'name');
      res.json({ states });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
  }
});

app.get('/cities', async (req, res) => {
  const country = req.query.country;
  const state = req.query.state;

  try {
      const cities = await City.find({ country: country, state: state }, 'name');
      res.json({ cities });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
