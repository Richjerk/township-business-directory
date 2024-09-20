import React, { useState } from 'react';

// This is the Cloudinary component that uses the custom hook
const CloudinaryImage = () => {
  const [imageURL, setImageURL] = useState('');

  // Function to handle image upload to Cloudinary
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setImageURL(data.secure_url); // Get the uploaded image URL
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h2>Upload Business Image</h2>
      <input type="file" onChange={handleImageUpload} />
      {imageURL && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageURL} alt="Uploaded Business" style={{ width: '300px', height: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default CloudinaryImage;

