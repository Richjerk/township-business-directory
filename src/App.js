import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BusinessForm from './components/BusinessForm';
import UserForm from './components/UserForm';
import LandingPage from './components/LandingPage';

function App() {
  // Example of using useState hook to manage authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Example of using useEffect hook to simulate checking authentication when the app loads
  useEffect(() => {
    const checkAuth = () => {
      // Simulate checking if user is logged in
      const userLoggedIn = true; // This could be replaced with a real auth check
      setIsAuthenticated(userLoggedIn);
    };

    checkAuth();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register-business" element={<BusinessForm />} />
        <Route path="/register-user" element={<UserForm />} />
        {/* Conditional route rendering based on authentication */}
        {isAuthenticated && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;


