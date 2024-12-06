import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './Register.js';
import Login from './Login.js';
import Home from './Home.js';
//testing

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
