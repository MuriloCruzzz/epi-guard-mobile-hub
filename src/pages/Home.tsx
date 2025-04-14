import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { HardHat, FileText, ChevronRight, Bell, Package, Menu } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import NotificationCard from '@/components/NotificationCard';
import SideMenu from '@/components/SideMenu';

interface LocationState {
  message?: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { notifications, ddsList, requests, epis } = useData();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  
  useEffect(() => {
    const state = location.state as LocationState;
    if (state?.message) {
      setMessage(state.message);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      // Clear location state
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const pendingDds = ddsList.filter(dds => dds.status === 'PENDENTE');
  const pendingNotifications = notifications.filter(n => !n.read).slice(0, 2);
  const latestRequest = requests[0];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pb-16">
      <div className="flex items-center justify-between bg-primary p-4 text-white w-full sticky top-0 z-10">
        <button
          onClick={() => setIsSideMenuOpen(true)}
          className="text-white"
        >
          <Menu size={32} strokeWidth={2.5} />
        </button>
        
        <button 
          onClick={() => navigate('/notifications')}
          className="relative"
        >
          <Bell size={24} />
          {pendingNotifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {pendingNotifications.length}
            </span>
          )}
        </button>
      </div>
      
      <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />
      
      {showMessage && (
        <div className="bg-accent text-white p-4 text-center">
          {message}
        </div>
      )}
      
      <div className="p-4 bg-primary text-white">
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-full w-12 h-12 overflow-hidden">
            {user?.profileImage ? (
              <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <img 
                src="/lovable-uploads/photo_user.png" 
                alt={user?.name || 'Usuário'}
                className="w-full h-full object-cover" 
              />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold">Bom dia {user?.name}</h2>
            <p className="text-sm">Segurança do trabalho, não basta falar tem que praticar!</p>
          </div>
        </div>
        
        {latestRequest && (
          <div className="mt-6 bg-white rounded-lg p-4 text-black">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Package className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-primary font-bold">Solicitações de EPI realizadas</h3>
                  <p className="text-xs text-gray-500">N° {latestRequest.id}</p>
                </div>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>
            <div className="mt-3 flex justify-between">
              <div>
                <p className="text-xs text-gray-500">Data da Solicitação</p>
                <p className="text-accent">{latestRequest.requestDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <p className="text-accent">{latestRequest.status}</p>
              </div>
            </div>
            {latestRequest.deliveryDate && (
              <div className="mt-2 flex justify-between">
                <div>
                  <p className="text-xs text-gray-500">Data da Entrega</p>
                  <p className="text-accent">{latestRequest.deliveryDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">ID do Responsável</p>
                  <p className="text-accent">{latestRequest.responsibleId}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-4">Escolha uma opção</h3>
        <div className="grid grid-cols-5 gap-2">
          <button 
            className="flex flex-col items-center justify-center p-2"
            onClick={() => navigate('/request-epi')}
          >
            <div className="bg-primary p-3 rounded w-14 h-14 flex items-center justify-center">
              <HardHat className="text-white" size={24} />
            </div>
            <span className="text-xs mt-2 text-center">EPI</span>
          </button>
          
          <button 
            className="flex flex-col items-center justify-center p-2"
            onClick={() => navigate('/dds')}
          >
            <div className="bg-primary p-3 rounded w-14 h-14 flex items-center justify-center">
              <FileText className="text-white" size={24} />
            </div>
            <span className="text-xs mt-2 text-center">DDS</span>
          </button>
          
          <button 
            className="flex flex-col items-center justify-center p-2"
            onClick={() => navigate('/deliveries')}
          >
            <div className="bg-blue-200 p-3 rounded w-14 h-14 flex items-center justify-center">
              <Package className="text-primary" size={24} />
            </div>
            <span className="text-xs mt-2 text-center">Entregas</span>
          </button>
          
          <button 
            className="flex flex-col items-center justify-center p-2"
            onClick={() => navigate('/consumption')}
          >
            <div className="bg-blue-200 p-3 rounded w-14 h-14 flex items-center justify-center">
              <HardHat className="text-primary" size={24} />
            </div>
            <span className="text-xs mt-2 text-center">Consumo</span>
          </button>
          
          <button 
            className="flex flex-col items-center justify-center p-2"
            onClick={() => navigate('/evaluation')}
          >
            <div className="bg-primary p-3 rounded w-14 h-14 flex items-center justify-center">
              <FileText className="text-white" size={24} />
            </div>
            <span className="text-xs mt-2 text-center">Avaliação</span>
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Atualizações e Notificações</h3>
          <button 
            className="text-primary text-sm"
            onClick={() => navigate('/notifications')}
          >
            Veja mais
          </button>
        </div>
        
        {pendingNotifications.length > 0 ? (
          pendingNotifications.map(notification => (
            <NotificationCard key={notification.id} notification={notification} />
          ))
        ) : (
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <Bell className="mx-auto text-gray-400" size={32} />
            <p className="text-gray-500 mt-2">Nenhuma notificação pendente</p>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Home;
