const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Note = model('Note', noteSchema);

module.exports = Note;
    