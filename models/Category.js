const mongoose = require('mongoose')

const Category = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Category entering is required'],
    },
})

module.exports = mongoose.model('Category', Category)
