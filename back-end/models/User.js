const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required: true,
        unique: true,
        trim: true // Remove whitespace
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, // Store email in lowercase
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now // Set default value to current date
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }   
});

// create a mongoose model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;