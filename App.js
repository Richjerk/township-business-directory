import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BusinessForm from './components/BusinessForm';
import UserForm from './components/UserForm';
import LandingPage from './components/LandingPage';
import CloudinaryImage from './components/CloudinaryImage';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Township Small Business Directory</h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/add-business">Add Business</Link></li>
              <li><Link to="/register-user">Register User</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/add-business" element={<BusinessForm />} />
            <Route path="/register-user" element={<UserForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;


