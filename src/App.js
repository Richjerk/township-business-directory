import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BusinessForm from './components/BusinessForm';
import UserForm from './components/UserForm';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot'; // Import the Chatbot

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const userLoggedIn = true; // This could be replaced with a real auth check
      setIsAuthenticated(userLoggedIn);
    };

    checkAuth();
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Township Business Directory</h1>

        {/* Routes for various pages */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register-business" element={<BusinessForm />} />
          <Route path="/register-user" element={<UserForm />} />
          {isAuthenticated && (
            <Route path="/dashboard" element={<Dashboard />} />
          )}
        </Routes>

        {/* Add the chatbot at the bottom of the app, so it's visible on every page */}
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
