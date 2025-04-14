import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { X } from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className={`absolute left-0 top-0 bottom-0 w-64 bg-[#0066BB] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-white"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col p-4 text-white mt-12">
          <button 
            onClick={() => handleNavigation('/')}
            className="py-3 text-left text-lg font-medium hover:bg-blue-600 rounded px-2"
          >
            Início
          </button>
          <button 
            onClick={() => handleNavigation('/meus-pedidos')}
            className="py-3 text-left text-lg font-medium hover:bg-blue-600 rounded px-2"
          >
            Meus Pedidos
          </button>
          <button 
            onClick={() => handleNavigation('/notifications')}
            className="py-3 text-left text-lg font-medium hover:bg-blue-600 rounded px-2"
          >
            Notificações
          </button>
          <button 
            onClick={() => handleNavigation('/profile')}
            className="py-3 text-left text-lg font-medium hover:bg-blue-600 rounded px-2"
          >
            Perfil
          </button>
          <button 
            onClick={() => handleNavigation('/avaliar-epis')}
            className="py-3 text-left text-lg font-medium hover:bg-blue-600 rounded px-2"
          >
            Avaliar EPI's
          </button>
          <button 
            onClick={() => handleNavigation('/politica')}
            className="py-3 text-left text-lg font-medium hover:bg-blue-600 rounded px-2"
          >
            Política
          </button>
          <button 
            onClick={() => handleNavigation('/configuracoes')}
            className="py-3 text-left text-lg font-medium hover:bg-blue-600 rounded px-2"
          >
            Configurações
          </button>
          <button 
            onClick={handleLogout}
            className="py-3 text-left text-lg font-medium hover:bg-blue-600 rounded px-2 mt-auto border-t border-blue-400 pt-4"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideMenu; 