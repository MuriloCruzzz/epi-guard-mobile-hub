
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Shield, MessageSquare, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <div className="flex justify-around items-center bg-white border-t border-gray-200 h-16 fixed bottom-0 left-0 right-0 z-10">
      <button
        onClick={() => navigate('/home')}
        className={`flex flex-col items-center justify-center w-1/4 ${
          isActive('/home') ? 'text-primary' : 'text-gray-400'
        }`}
      >
        <Home size={24} />
        <span className="text-xs mt-1">Início</span>
      </button>
      
      <button
        onClick={() => navigate('/my-epis')}
        className={`flex flex-col items-center justify-center w-1/4 ${
          isActive('/my-epis') ? 'text-primary' : 'text-gray-400'
        }`}
      >
        <Shield size={24} />
        <span className="text-xs mt-1">Meus EPIs</span>
      </button>
      
      <button
        onClick={() => navigate('/notifications')}
        className={`flex flex-col items-center justify-center w-1/4 ${
          isActive('/notifications') ? 'text-primary' : 'text-gray-400'
        }`}
      >
        <MessageSquare size={24} />
        <span className="text-xs mt-1">Notificações</span>
      </button>
      
      <button
        onClick={() => navigate('/profile')}
        className={`flex flex-col items-center justify-center w-1/4 ${
          isActive('/profile') ? 'text-primary' : 'text-gray-400'
        }`}
      >
        <User size={24} />
        <span className="text-xs mt-1">Perfil</span>
      </button>
    </div>
  );
};

export default BottomNavigation;
