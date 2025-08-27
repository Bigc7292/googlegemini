
import React, { useState } from 'react';
import Login from './components/Login';
import VideoGenerator from './components/VideoGenerator';
import Header from './components/Header';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-brand-light font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {!isLoggedIn ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <VideoGenerator />
        )}
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Seek Beyond Realty. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
