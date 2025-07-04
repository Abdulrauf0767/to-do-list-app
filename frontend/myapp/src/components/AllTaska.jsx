import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, deleteTodo } from '../features/TodoListSlice';
import { Link } from 'react-router-dom';
import { CircularProgress, Button } from '@mui/material';

const AllTaska = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const totalPages = useSelector((state) => state.todos.totalPages);
  const loading = useSelector((state) => state.todos.loading);

  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    dispatch(getTodos({ page, limit }));
  }, [dispatch, page]);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id)).then(() => {
      dispatch(getTodos({ page, limit }));
    });
  };

  return (
    <>
      <div className="flex justify-center items-center w-[90%] mt-20 md:w-[60%] mx-auto"> 
        <div className="w-full flex flex-col gap-4">
          {todos.length === 0 ? (
            <h2 className="text-center text-xl">No tasks available</h2>
          ) : (
            todos.map((todo) => (
              <div key={todo._id} className="w-full p-4 shadow-sm shadow-gray-400 rounded-2xl flex flex-col gap-4 hover:shadow-md transition-all duration-300 hover:scale-[102%]">
                <h3 className="font-bold">{todo.title}</h3>
                <h5>{todo.description}</h5>
                <div className="flex justify-end gap-4">
                  <Link to={`/edit/${todo._id}`} state={todo}>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(todo._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <Button variant="outlined" onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
          Previous
        </Button>
        <span>Page {page} of {totalPages}</span>
        <Button variant="outlined" onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Next
        </Button>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default AllTaska;
