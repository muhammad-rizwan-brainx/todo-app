const { text } = require('body-parser');
const mongoose = require('mongoose');


const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Todo', todoSchema);