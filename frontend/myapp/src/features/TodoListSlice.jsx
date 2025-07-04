import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const response = await axios.post('http://localhost:5001/api/todo/add', todo, {
    headers: { 'Content-Type': 'application/json', apikey: import.meta.env.VITE_API_KEY },
  });
  return response.data;
});

export const getTodos = createAsyncThunk('todos/getTodos', async ({ page = 1, limit = 5 }) => {
  const response = await axios.get(`http://localhost:5001/api/todo/get?page=${page}&limit=${limit}`, {
    headers: { 'Content-Type': 'application/json', apikey: import.meta.env.VITE_API_KEY },
  });
  return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`http://localhost:5001/api/todo/delete/${id}`, {
    headers: { 'Content-Type': 'application/json', apikey: import.meta.env.VITE_API_KEY },
  });
  return { id };
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo) => {
  const response = await axios.patch(`http://localhost:5001/api/todo/edit/${todo._id}`, todo, {
    headers: { 'Content-Type': 'application/json', apikey: import.meta.env.VITE_API_KEY },
  });
  return response.data;
});

const TodoListSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    totalPages: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
      })
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todos = action.payload.todos;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
      })
      .addCase(getTodos.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo._id !== action.payload.id);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map(todo =>
          todo._id === action.payload._id ? action.payload : todo
        );
      });
  },
});

export default TodoListSlice.reducer;
