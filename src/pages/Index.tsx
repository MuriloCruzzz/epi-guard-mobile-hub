
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the login screen
    navigate('/login');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">E-EPI</h1>
        <p className="text-xl text-white">Carregando sistema...</p>
      </div>
    </div>
  );
};

export default Index;
