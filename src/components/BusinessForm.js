// src/components/BusinessForm.js
import React, { useState } from 'react';
import axios from 'axios';

function BusinessForm() {
  const [business, setBusiness] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    image: ''
  });

  const handleChange = (e) => {
    setBusiness({ ...business, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/businesses', business);
      alert('Business registered!');
    } catch (error) {
      console.error('Error registering business:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={business.name} onChange={handleChange} placeholder="Business Name" required />
      <textarea name="description" value={business.description} onChange={handleChange} placeholder="Business Description" required />
      <input type="text" name="address" value={business.address} onChange={handleChange} placeholder="Business Address" required />
      <input type="text" name="phone" value={business.phone} onChange={handleChange} placeholder="Business Phone" required />
      <input type="text" name="image" value={business.image} onChange={handleChange} placeholder="Business Image URL" />
      <button type="submit">Register Business</button>
    </form>
  );
}

export default BusinessForm;
