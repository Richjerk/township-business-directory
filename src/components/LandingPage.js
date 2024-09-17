// src/components/LandingPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LandingPage() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get('/api/businesses');
        setBusinesses(response.data);
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <div>
      <h1>Our Businesses</h1>
      <ul>
        {businesses.map((business) => (
          <li key={business._id}>
            <h2>{business.name}</h2>
            <p>{business.description}</p>
            <p>{business.address}</p>
            <p>{business.phone}</p>
            <img src={business.image} alt={business.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LandingPage;
