
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
      <div className="mb-12">
        <img 
          src="/lovable-uploads/507a83d4-90b4-44a6-bd2f-50ae7bb88fb9.png" 
          alt="E-EPI Logo" 
          className="w-56"
        />
      </div>
      
      <div className="mt-12 w-44 h-44 bg-primary-light/20 rounded-lg flex items-center justify-center">
        <Fingerprint size={120} className="fingerprint-scanner text-white" />
      </div>
      
      <h2 className="mt-6 text-xl font-bold">Conectando....</h2>
      <p className="mt-2 text-center text-sm">
        Por favor aguarde a leitura da sua digital
      </p>
    </div>
  );
};

export default Splash;
