
import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter both username and password.');
      return;
    }
    // In a real app, you'd have actual authentication logic.
    // For this demo, any non-empty credentials will work.
    setError('');
    onLoginSuccess();
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-brand-blue/50 rounded-lg shadow-2xl shadow-brand-blue/20 p-8 border border-brand-gold/20">
      <h2 className="text-2xl font-bold text-center text-white mb-2">Marketing Team Login</h2>
      <p className="text-center text-gray-400 mb-6">Access the AI Video Generation Suite</p>
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-brand-gold/90">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full bg-brand-dark border border-brand-gold/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
            placeholder="e.g., marketing.user"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-brand-gold/90">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full bg-brand-dark border border-brand-gold/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
            placeholder="••••••••"
          />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-brand-dark bg-brand-gold hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-gold transition-colors duration-300"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
