import React from 'react'
import Header from '../components/Header'
import AddTask from './AddTask'
import AllTaska from '../components/AllTaska'

const Home = () => {
  return (
    <div>
      <Header/>
      <AddTask/>
      <AllTaska/>
    </div>
  )
}

export default Home
