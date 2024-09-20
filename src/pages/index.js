import { useState, useEffect } from 'react';

export default function Home() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    // Fetch data from an API or perform side effects here
    const fetchBusinesses = async () => {
      const response = await fetch('/api/businesses'); // Example API endpoint
      const data = await response.json();
      setBusinesses(data);
    };

    fetchBusinesses();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div>
      <h1>Welcome to Township Business Directory!</h1>
      <p>Get started by exploring local businesses.</p>
      <ul>
        {businesses.map((business) => (
          <li key={business.id}>{business.name}</li>
        ))}
      </ul>
    </div>
  );
}
