
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Fingerprint } from 'lucide-react';

const Splash: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        navigate(isAuthenticated ? '/home' : '/login');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated, loading]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-6">
      <div className="mb-20">
        <img 
          src="/lovable-uploads/507a83d4-90b4-44a6-bd2f-50ae7bb88fb9.png" 
          alt="E-EPI Logo" 
          className="w-64"
        />
      </div>
      
      <div className="mt-20 w-64 h-64 bg-primary-light/20 rounded-lg flex items-center justify-center">
        <Fingerprint size={180} className="fingerprint-scanner text-white" />
      </div>
      
      <h2 className="mt-8 text-2xl font-bold">Conectando....</h2>
      <p className="mt-2 text-center">
        Por favor aguarde a leitura da sua digital
      </p>
    </div>
  );
};

export default Splash;
