// src/components/Footer.js
import React from 'react';
import './Footer.css'; // Optional: if you want to style the footer

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Designed by Mafisa Tech Affiliate</p>
    </footer>
  );
};

export default Footer;
