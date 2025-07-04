let express = require('express');
const ApiKeyMiddleware = require('../middleware/ApiKeyMiddleware');
const { addTask, getTasks, deleteTask, editTask } = require('../controller/ToDoController');
const validatorMiddleware = require('../middleware/validatormiddleware');
let TodoRoutes = express.Router();

TodoRoutes.post('/add', ApiKeyMiddleware,validatorMiddleware,addTask);
TodoRoutes.get('/get',ApiKeyMiddleware,validatorMiddleware,getTasks);
TodoRoutes.delete('/delete/:id',ApiKeyMiddleware,deleteTask);
TodoRoutes.patch('/edit/:id',ApiKeyMiddleware,validatorMiddleware,editTask);

module.exports = TodoRoutes;