import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StaticRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simple redirect without authentication
    console.log('Redirecting to student dashboard...');
    navigate('/student-dashboard');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Redirecting to Student Dashboard...</h1>
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default StaticRedirect; 