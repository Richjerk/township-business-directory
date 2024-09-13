import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: '', email: '', phone: '', location: {}
  });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleGeoLocation = () => navigator.geolocation.getCurrentPosition(
    (position) => setFormData({ ...formData, location: { type: "Point", coordinates: [position.coords.longitude, position.coords.latitude] } })
  );

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('/users', formData);
    alert('User added!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
      <button type="button" onClick={handleGeoLocation}>Use Geo-location</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
