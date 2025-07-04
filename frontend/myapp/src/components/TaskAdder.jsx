import React from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/TodoListSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {ChevronLeft} from '@mui/icons-material'
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const TaskAdder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    let handleNavigate = () => {
    navigate(-1);
    }
  // Validation Schema
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  // Formik Hook
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addTodo(values));
      resetForm();
    },
  });

  return (
    <>
    <div>
      <div className="flex justify-center items-center mt-10">
        <form
          onSubmit={formik.handleSubmit}
          className="w-[90%] md:w-[600px] shadow-md p-10 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-center">Add Task</h2>

          <div className="flex flex-col gap-4 mt-10">
            
            {/* Title Input */}
            <input
              name="title"
              id="title"
              type="text"
              placeholder="Enter Task"
              className={`border p-2 rounded-md w-full ${
                  formik.touched.title && formik.errors.title
                  ? 'border-red-500'
                  : 'border-gray-300'
                }`}
                value={formik.values.title}
                onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
                <p className="text-red-500 text-sm">{formik.errors.title}</p>
            )}

            {/* Description Input */}
            <input
              name="description"
              id="description"
              type="text"
              placeholder="Enter Description"
              className={`border p-2 rounded-md w-full ${
                  formik.touched.description && formik.errors.description
                  ? 'border-red-500'
                  : 'border-gray-300'
                }`}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-sm">{formik.errors.description}</p>
            )}

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
              >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
    <IconButton onClick={() => handleNavigate()} sx={{
        position: 'absolute',
        top: 40,
        left: 40
    }}>
        <ChevronLeft/>
    </IconButton>
    </>
  );
};

export default TaskAdder;
