let mongoose = require('mongoose');

let todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

let TodoModel = mongoose.model('Todo', todoSchema);

module.exports = TodoModel;