const mongoose = require('mongoose');

const libraryBookSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,'A book must have a name'],
        unique: true,
        trim: true
    },
    category: {
        type: Number,
        required: [true, 'A book must belong to a Semester']
    }
});

const libraryBook = mongoose.model('Library', libraryBookSchema);

module.exports = libraryBook;