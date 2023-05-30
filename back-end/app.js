const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./api/routes/userRoutes');
const todoRoutes = require('./api/routes/todoRoutes');
const dotenv = require("dotenv")
dotenv.config()
const mongoUri = process.env.MONGO_URI;
const db = mongoose.connect(mongoUri)
if (db) {
    console.log('success');
} else {
    console.log('DB not Connected');
}

const app = express();
app.use(express.json())
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