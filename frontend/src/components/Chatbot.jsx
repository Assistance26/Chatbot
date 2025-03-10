import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useSentiment from '../hooks/useSentiment';

const Chatbot = () => {
  const { user, login, logout } = useAuth();
  const { sentiment, loading, analyzeText } = useSentiment();
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleLogin = () => {
    login({ username: 'test', password: 'password' });
  };

  const handleLogout = () => {
    logout();
  };

  const handleSendMessage = async () => {
    analyzeText(message);
    // Logic to send message to the chatbot and receive response
    setResponse("AI Chatbot Response: " + message); // This is a placeholder
  };

  return (
    <div className="chatbot-container">
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}

      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>

      {loading ? (
        <p>Analyzing sentiment...</p>
      ) : (
        sentiment && <p>Sentiment: {sentiment}</p>
      )}

      <p>{response}</p>
    </div>
  );
};

export default Chatbot;
