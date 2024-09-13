import React, { useState } from 'react';
import axios from 'axios';

const BusinessForm = () => {
  const [formData, setFormData] = useState({
    name: '', description: '', address: '', phone: '', image: '', location: {}
  });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleGeoLocation = () => navigator.geolocation.getCurrentPosition(
    (position) => setFormData({ ...formData, location: { type: "Point", coordinates: [position.coords.longitude, position.coords.latitude] } })
  );

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('/businesses', formData);
    alert('Business added!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Business Name" onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
      <input type="file" name="image" onChange={handleChange} required />
      <button type="button" onClick={handleGeoLocation}>Use Geo-location</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BusinessForm;
