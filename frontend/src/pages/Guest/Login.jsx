import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // This is just for testing - in a real app you would make an API call
      // Mock users for testing
      const mockUsers = [
        { username: 'admin', email: 'admin@example.com', password: 'password123', role: 'admin' },
        { username: 'student', email: 'student@example.com', password: 'password123', role: 'student' },
        { username: 'professor', email: 'professor@example.com', password: 'password123', role: 'professor' }
      ];

      const { identifier, password } = credentials;
      const user = mockUsers.find(
        (u) => (u.username === identifier || u.email === identifier) && u.password === password
      );

      if (user) {
        const mockToken = 'mock-jwt-token-12345';
        login(mockToken, user.username, user.role);
        
        // Redirect based on user role
        if (user.role === 'student') {
          console.log('Student login successful, redirecting to dashboard');
          navigate('/dashboard');
        } else if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (user.role === 'professor') {
          navigate('/professor/dashboard');
        }
      } else {
        setError('Invalid username/email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">TechnoMatch Login Test</h2>
        
        {error && (
          <div className="bg-red-500 bg-opacity-20 text-red-100 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Username or Email</label>
            <input
              type="text"
              name="identifier"
              value={credentials.identifier}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="username or email"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            className={`w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>Test Credentials:</p>
          <ul className="mt-2 space-y-1">
            <li><strong>Student:</strong> student@example.com / password123</li>
            <li><strong>Professor:</strong> professor@example.com / password123</li>
            <li><strong>Admin:</strong> admin@example.com / password123</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
