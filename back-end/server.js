const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello mf!')
})

app.listen(port, () => {
  console.log(`Note app listening on port ${port}`)
})


const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:5000/Cluster0', {
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

module.exports = connectDB;