
import React from 'react';
import { useData } from '@/contexts/DataContext';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import NotificationCard from '@/components/NotificationCard';

const Notifications: React.FC = () => {
  const { notifications, markNotificationAsRead } = useData();
  
  // Mark all notifications as read when viewing this page
  React.useEffect(() => {
    notifications.forEach(notification => {
      if (!notification.read) {
        markNotificationAsRead(notification.id);
      }
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pb-16">
      <Header title="NOTIFICAÇÕES" showBack />
      
      <div className="p-4">
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map(notification => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-500">Nenhuma notificação disponível.</p>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Notifications;
