import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import AddTask from './pages/AddTask'
import TaskAdder from './components/TaskAdder'
import Edit from './components/Edit'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/add' element = {<TaskAdder/>} />
        <Route path='/edit/:id' element = {<Edit/>} />
      </Routes>
    </div>
  )
}

export default App
