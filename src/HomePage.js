import React, { useState } from 'react';

const HomePage = () => {
  // States to store form data
  const [businesses, setBusinesses] = useState([]);
  const [users, setUsers] = useState([]);
  const [businessForm, setBusinessForm] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    image: ''
  });
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    phone: ''
  });

  // Handle form submissions
  const handleBusinessSubmit = (e) => {
    e.preventDefault();
    setBusinesses([...businesses, businessForm]);
    setBusinessForm({
      name: '',
      description: '',
      address: '',
      phone: '',
      image: ''
    });
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    setUsers([...users, userForm]);
    setUserForm({
      username: '',
      email: '',
      phone: ''
    });
  };

  return (
    <div>
      <h1>Welcome to the Township Business Directory</h1>
      <p>Connecting local businesses with their community.</p>

      {/* Business Form */}
      <section>
        <h2>List Your Business</h2>
        <form onSubmit={handleBusinessSubmit}>
          <input
            type="text"
            placeholder="Business Name"
            value={businessForm.name}
            onChange={(e) => setBusinessForm({ ...businessForm, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Business Description"
            value={businessForm.description}
            onChange={(e) => setBusinessForm({ ...businessForm, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Business Address"
            value={businessForm.address}
            onChange={(e) => setBusinessForm({ ...businessForm, address: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Business Phone"
            value={businessForm.phone}
            onChange={(e) => setBusinessForm({ ...businessForm, phone: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={businessForm.image}
            onChange={(e) => setBusinessForm({ ...businessForm, image: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
      </section>

      {/* User Form */}
      <section>
        <h2>Register as a User</h2>
        <form onSubmit={handleUserSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={userForm.username}
            onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={userForm.email}
            onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={userForm.phone}
            onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </section>

      {/* List of Businesses */}
      <section>
        <h2>Businesses</h2>
        {businesses.length > 0 ? (
          <ul>
            {businesses.map((business, index) => (
              <li key={index}>
                <h3>{business.name}</h3>
                <p>{business.description}</p>
                <p>{business.address}</p>
                <p>{business.phone}</p>
                {business.image && <img src={business.image} alt={business.name} style={{ maxWidth: '200px' }} />}
              </li>
            ))}
          </ul>
        ) : (
          <p>No businesses listed yet.</p>
        )}
      </section>

      {/* Advertisement Space */}
      <section>
        <h2>Advertise Here</h2>
        <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px 0' }}>
          <p>Your advertisement could be here. Contact us for more details.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
