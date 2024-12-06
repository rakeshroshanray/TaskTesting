import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
      
        navigate('/login');
      } else {
        
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-lg w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <input
          type="email"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
