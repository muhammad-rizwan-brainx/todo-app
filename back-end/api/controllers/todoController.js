const mongoose = require("mongoose");
const Todo = require("../models/todoModel");
const dotenv = require("dotenv")
dotenv.config()
const root = process.env.ROOT;
exports.getAllTodo = (re, res, next) => {
    Todo.find().select('title description').exec()
        .then(docs => {
            const response = {
                count: docs.length,
                todos: docs.map(doc => {
                    return {
                        title: doc.title,
                        description: doc.description,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: root + '/todos/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.addTodo = (req, res, next) => {
    console.log(req.file);
    const detailsTodo = new
        Todo({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
        });
    console.log(detailsTodo)
    detailsTodo.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Todo Added",
            Todo: {
                title: result.title,
                description: result.description,
                id: result._id,
                request: {
                    type: 'GET',
                    url: root + '/todos/' + result._id
                }
            }
        });
    }).catch(err => console.log(err));

}


exports.getTodoWithID = (req, res, next) => {
    const id = req.params.todoID;
    Todo.findById(id).select('title description').exec().then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}


exports.updateTodo = (req, res, next) => {
    const id = req.params.todoID;
    const payload = req.body;
    Todo.updateOne({ id }, { $set: payload })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}


exports.deleteTodo = (req, res, next) => {
    const _id = req.params.todoID;
    Todo.deleteOne({ _id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Todo deleted",
                request: {
                    type: "POST",
                    url: root + "/todos",
                    body: { title: "String", description: "Number" }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};