// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BusinessForm from './components/BusinessForm';
import UserForm from './components/UserForm';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register-business" element={<BusinessForm />} />
        <Route path="/register-user" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;

