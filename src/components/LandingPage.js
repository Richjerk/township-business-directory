import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LandingPage = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    axios.get('/businesses').then(res => setBusinesses(res.data));
  }, []);

  return (
    <div>
       <h1>Welcome to the Township Business Directory</h1>
      <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" />
      <div>
        {businesses.map(business => (
          <div key={business._id}>
            <h2>{business.name}</h2>
            <p>{business.description}</p>
            <p>{business.address}</p>
            <p>{business.phone}</p>
          </div>
        ))}
      </div>
      <div className="advertising-space">
        <h2>Advertising Space</h2>
        <p>Place your advertisement here!</p>
      </div>
    </div>
  );
};

export default LandingPage;
