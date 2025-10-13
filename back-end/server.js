// back-end/server.js
const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const protect = require('./middleware/authMiddleware');

const app = express();
const port = process.env.PORT || 5000;


// 🌐 CORS Configuration
app.use(
  cors({
    origin: ['http://localhost:5173'], // React app (Vite default)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// 🧩 Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies in POST requests
app.use(morgan('dev')); // Log requests

// 🗺️ Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// 🧠 MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
connectDB();

// 🔒 Protected Route Example
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.id}! This is a protected route.` });
});

// 🌍 Public Route Example
app.get('/api/public', (req, res) => {
  res.json({ message: 'This is a public route.' });
});

// 🏠 Root Route
app.get('/', (req, res) => {
  res.send('Hello mf! am baack');

});

// 🧯 Global Error Handler (must be after all routes)
app.use((err, req, res, next) => {
  console.error(' Global Error:', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// 🚀 Start Server
app.listen(port, () => {
  console.log(`🚀 Note app listening on port ${port}`);
});
