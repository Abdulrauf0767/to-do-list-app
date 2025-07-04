import TodoListReducer from '../features/TodoListSlice';
import { configureStore } from '@reduxjs/toolkit';

let Store = configureStore({
    reducer: {
        todos: TodoListReducer
    }
});

export default Store