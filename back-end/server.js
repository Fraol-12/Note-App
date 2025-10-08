const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express')
const app = express();
const port = process.env.PORT || 5000;
const protect = require('./middleware/authMiddleware');

app.use(express.json()); // Middleware to parse JSON bodies in POST requests


const authRoutes = require('./routes/auth');

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Recommended for the new MongoDB driver
      // Other options can be added here if needed
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit the process with a failure code
  }
};

connectDB();


  // Example protected route
  app.get('/api/protected', protect, (req, res) => {
      res.json({ message: `Welcome, user ${req.user.id}! This is a protected route.` });
  });

  // Other routes
  app.get('/api/public', (req, res) => {
      res.json({ message: 'This is a public route.' });
  });

app.get('/', (req, res) => {
  res.send('Hello mf!');
});

app.listen(port, () => {
  console.log(`🚀 Note app listening on port ${port}`);
});