import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo } from '../features/TodoListSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ChevronLeft } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const todo = location.state;

  // Agar koi direct URL khol de bina state ke
  if (!todo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-bold">Invalid Access</h2>
      </div>
    );
  }

  const handleNavigate = () => {
    navigate(-1);
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  const formik = useFormik({
    initialValues: {
      _id: todo?._id || '',
      title: todo?.title || '',
      description: todo?.description || '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(updateTodo(values));
      navigate(-1);
    },
  });

  return (
    <>
      <div className="flex justify-center items-center mt-10">
        <form
          onSubmit={formik.handleSubmit}
          className="w-[90%] md:w-[600px] shadow-md p-10 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-center">Edit Task</h2>

          <div className="flex flex-col gap-4 mt-10">
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
              <p className="text-red-500 text-sm">
                {formik.errors.description}
              </p>
            )}

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>

      <IconButton
        onClick={handleNavigate}
        sx={{
          position: 'absolute',
          top: 40,
          left: 40,
        }}
      >
        <ChevronLeft />
      </IconButton>
    </>
  );
};

export default Edit;
