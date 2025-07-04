import React from 'react'
import TaskAdder from '../components/TaskAdder'
import {Button} from '@mui/material'
import { Link } from 'react-router-dom'
const AddTask = () => {
  return (
    <div>
        <div className='flex justify-center items-center mt-10'>
            <Link to={'/add'} >
            <Button variant="contained" color="primary">Add Task</Button>
            </Link>
        </div>
    </div>
  )
}

export default AddTask
