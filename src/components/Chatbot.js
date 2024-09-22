import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSend = async () => {
    try {
      const response = await axios.post('/api/chat', { userInput });
      setChatResponse(response.data);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    }
  };

  return (
    <div>
      <textarea 
        value={userInput} 
        onChange={handleInputChange} 
        placeholder="Type your message..." 
      />
      <button onClick={handleSend}>Send</button>
      <div>
        <h3>Chatbot Response:</h3>
        <p>{chatResponse}</p>
      </div>
    </div>
  );
};

export default Chatbot;
