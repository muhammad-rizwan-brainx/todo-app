const express = require('express');

const checkAuth = require('../middlewares/auth');
const todoController = require('../controllers/todoController');


const Router = express.Router()

Router.post('/', checkAuth, todoController.addTodo);
Router.get('/', checkAuth, todoController.getAllTodo);
Router.get('/:todoID', checkAuth, todoController.getTodoWithID);
Router.patch('/:todoID', checkAuth, todoController.updateTodo);
Router.delete('/:todoID', checkAuth, todoController.deleteTodo);

module.exports = Router;
