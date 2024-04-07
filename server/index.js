const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model');

const app = express();

//setting up middlewares
app.use(cors());
app.use(express.json());

//connecting to backend
mongoose.connect('mongodb://localhost:27017/cs_miniProject', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//sending fetched data to backend
app.post('/api/register', async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(400).json({ status: 'error', error: 'Duplicate Email' });
  }
});

//sending fetched data to backend
app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      res.json({ status: 'ok', user: true });
    } else {
      res.json({ status: 'ok', user: false });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', error: 'Server Error' });
  }
});

app.post('/api/passwordChange', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      user.password = req.body.password;
      await user.save(); // Save the updated password to the database

      res.json({ status: 'ok', password: 'deleted' });
      console.log("Password Deleted");
    } else {
      res.json({ status: 'ok', password: '!deleted' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', error: 'Server Error' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, 'name'); // Fetch all users and only include the 'name' field
    const usernames = users.map(user => user.name); // Extract usernames from user objects
    res.json(usernames);
  } catch (err) {
    res.status(500).json({ status: 'error', error: 'Server Error' });
  }
});


//starting server
app.listen(1337, () => {
  console.log('Server running on port 1337');
});
