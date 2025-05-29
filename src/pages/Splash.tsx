import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface LocationState {
  destination?: string;
}

const Splash: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();
  const state = location.state as LocationState;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        if (state?.destination) {
          navigate(state.destination);
        } else {
          navigate('/login');
        }
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, loading, state]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-6 overflow-hidden">
      <div className="animate-slide-in">
        <img
          src="/favicon.ico"
          alt="E-EPI Logo"
          className="w-52 animate-fade-out"
        />
      </div>
    </div>
  );
};

export default Splash;
