
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Notification, NotificationType } from '@/types';
import { Bell, FileText, HardHat, AlertCircle } from 'lucide-react';

interface NotificationCardProps {
  notification: Notification;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  const navigate = useNavigate();
  
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "EPI_REQUEST":
        return <HardHat size={24} className="text-primary" />;
      case "DDS":
        return <FileText size={24} className="text-primary" />;
      case "EPI_EXPIRY":
        return <AlertCircle size={24} className="text-primary" />;
      case "EPI_EVALUATION":
        return <HardHat size={24} className="text-primary" />;
      default:
        return <Bell size={24} className="text-primary" />;
    }
  };

  const handleClick = () => {
    // Navigate to the related item
    if (notification.relatedType === "EPI" && notification.relatedId) {
      navigate(`/epi/${notification.relatedId}`);
    } else if (notification.relatedType === "DDS" && notification.relatedId) {
      navigate(`/dds/${notification.relatedId}`);
    } else if (notification.relatedType === "REQUEST" && notification.relatedId) {
      navigate(`/request/${notification.relatedId}`);
    }
  };

  return (
    <div 
      className={`bg-white p-4 rounded-lg shadow-sm mb-4 ${notification.read ? '' : 'border-l-4 border-primary'}`}
      onClick={handleClick}
    >
      <div className="flex items-start">
        <div className="bg-primary/10 p-3 rounded-full mr-4">
          {getIcon(notification.type)}
        </div>
        <div className="flex-1">
          <h3 className="text-primary text-lg font-bold">{notification.title}</h3>
          <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
          <p className="text-xs text-gray-500 mt-2">{notification.date}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
