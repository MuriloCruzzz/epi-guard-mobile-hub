
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showNotification?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack = false, 
  showNotification = false
}) => {
  const navigate = useNavigate();
  const { notifications } = useData();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex items-center justify-between bg-primary p-4 text-white w-full sticky top-0 z-10">
      <div className="flex items-center">
        {showBack && (
          <button 
            className="mr-2" 
            onClick={() => navigate(-1)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5m7 7-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      
      {showNotification && (
        <button 
          className="relative" 
          onClick={() => navigate('/notifications')}
        >
          <Bell size={24} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
};

export default Header;
