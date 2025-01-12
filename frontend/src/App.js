import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Dash from './components/Dash'
import StockList from './components/StockList'

const App = () => {
  return (
    <div>
      <Navbar/>
       
      <Routes>
        <Route path="/" element={<Dash/>} />
        <Route path="/stock-list" element={<StockList />} />
      </Routes>
      
      
  
    </div>
  )
}

export default App