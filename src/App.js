// src/App.js
import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import DogSearch from './components/DogSearch';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the token exists in cookies
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('fetch-access-token='));

    setIsLoggedIn(!!token); // If token exists, user is logged in
  }, []);

  return (
    <div className="App">
      {isLoggedIn ? <DogSearch onLoginSuccess={(data) => setIsLoggedIn(data)} /> : <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />}
    </div>
  );
}

export default App;
