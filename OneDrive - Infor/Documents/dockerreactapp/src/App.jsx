import React, { useState } from 'react'
import Register from './Register'
import Home from './Home'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
const App = () => {
  
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Register/>}/>
                <Route path='/home/:username' element={<Home/>}/>
                    
</Routes>
        </Router>
    )
}

export default App