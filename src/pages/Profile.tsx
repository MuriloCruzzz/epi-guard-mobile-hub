
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { LogOut, FileText, User as UserIcon } from 'lucide-react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import DDSCard from '@/components/DDSCard';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { ddsList } = useData();
  
  const pendingDds = ddsList.filter(dds => dds.status === 'PENDENTE');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pb-16">
      <Header title="Meu Perfil" showBack showNotification />
      
      <div className="bg-primary p-6">
        <div className="bg-[#0066BB] rounded-lg p-4">
          <div className="flex justify-center mb-4">
            {user?.profileImage ? (
              <img 
                src={user.profileImage} 
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-white object-cover" 
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                <UserIcon size={40} className="text-primary" />
              </div>
            )}
          </div>
          
          <h2 className="text-white text-xl font-bold text-center">{user?.name}</h2>
          <p className="text-white text-center">{user?.position}</p>
          <p className="text-white text-center">{user?.phone}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <h3 className="text-xl text-center font-bold mb-4">0{pendingDds.length} Pendências</h3>
          
          {pendingDds.map(dds => (
            <DDSCard key={dds.id} dds={dds} />
          ))}

          <div className="mt-8 border-t pt-4">
            <p className="text-primary text-center font-bold">
              Segurança do trabalho, não basta falar tem que praticar.
            </p>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-destructive text-white py-3 rounded-md font-bold"
        >
          <LogOut size={20} />
          Sair da conta
        </button>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;
