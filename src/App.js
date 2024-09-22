import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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

        {/* Navigation Links */}
        <nav>
          <Link to="/about">About Us</Link>
          <Link to="/businesses">Our Businesses</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>

        {/* Routes for various pages */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register-business" element={<BusinessForm />} />
          <Route path="/register-user" element={<UserForm />} />
          {isAuthenticated && (
            <Route path="/dashboard" element={<Dashboard />} />
          )}
          <Route path="/about" element={() => {
            window.location.href = '/about.html'; // Redirect to the static HTML
            return null;
          }} />
          <Route path="/businesses" element={() => {
            window.location.href = '/businesses.html'; // Redirect to the static HTML
            return null;
          }} />
          <Route path="/contact" element={() => {
            window.location.href = '/contact.html'; // Redirect to the static HTML
            return null;
          }} />
        </Routes>

        {/* Add the chatbot at the bottom of the app, so it's visible on every page */}
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;

