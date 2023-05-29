const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./api/routes/userRoutes');
const todoRoutes = require('./api/routes/todoRoutes');

const db = mongoose.connect('mongodb+srv://rizwan:rizwan@todo.nss4qbi.mongodb.net/?retryWrites=true&w=majority')
if (db) {
    console.log('success');
} else {
    console.log('DB not Connected');
}

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use('/user', userRoutes);
app.use('/todos', todoRoutes);
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 400;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;