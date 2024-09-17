// src/components/UserForm.js
import React, { useState } from 'react';
import axios from 'axios';

function UserForm() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users', user);
      alert('User registered!');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username" required />
      <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" required />
      <button type="submit">Register User</button>
    </form>
  );
}

export default UserForm;

