// models/Hall.js
const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
    hallName: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    }
});

const Hall = mongoose.model('Hall', hallSchema);
module.exports = Hall;
