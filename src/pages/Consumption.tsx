import React from 'react';
import BottomNavigation from '@/components/BottomNavigation';
import { ConsumptionItem } from '@/types';
import { ChevronRight, ArrowLeft, Bell, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Consumption: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = React.useState('consumo');

  // Mock consumption data
  const consumptionData: ConsumptionItem[] = [
    { name: 'Capacete', requestedQuantity: 2, evaluationCount: 2 },
    { name: 'Botina', requestedQuantity: 1, evaluationCount: 1 },
    { name: 'Luva', requestedQuantity: 5, evaluationCount: 6 },
    { name: 'Protetor Auricular', requestedQuantity: 25, evaluationCount: 24 },
    { name: 'Óculos de Proteção', requestedQuantity: 8, evaluationCount: 8 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pb-16">
      <div className="flex items-center justify-between bg-primary p-4 text-white w-full sticky top-0 z-10">
        <button onClick={() => navigate('/home')} className="text-white">
          <ArrowLeft size={28} />
        </button>

        <div className="flex items-center gap-3 flex-1 px-3">
          <h1 className="text-xl font-bold">Consumo</h1>
        </div>

        <div className="bg-white/20 rounded-full p-1.5">
          {user?.profileImage ? (
            <img src={user.profileImage} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <img
              src="/lovable-uploads/photo_user.png"
              alt={user?.name || 'Usuário'}
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
        </div>
      </div>

      <div className="bg-primary text-white px-4 pb-2">
        <div className="flex mt-2 border-b border-white/20">
          <button
            className={`flex-1 py-2 ${activeTab === 'entregas' ? 'border-b-2 border-white font-bold' : ''}`}
            onClick={() => setActiveTab('entregas')}
          >
            Entregas
          </button>
          <button
            className={`flex-1 py-2 ${activeTab === 'consumo' ? 'border-b-2 border-white font-bold' : ''}`}
            onClick={() => setActiveTab('consumo')}
          >
            Consumo
          </button>
          <button
            className={`flex-1 py-2 ${activeTab === 'solicitar' ? 'border-b-2 border-white font-bold' : ''}`}
            onClick={() => navigate('/request-epi')}
          >
            Solicitar EPI
          </button>
        </div>
      </div>

      <div className="p-4">
        {consumptionData.map((item, index) => (
          <div key={index} className="border-b border-gray-200 py-4">
            <h3 className="text-[#35378B] text-lg font-bold">{item.name}</h3>
            <div className="flex justify-between mt-2">
              <div>
                <p className="text-sm text-gray-600">Quantidade Solicitada</p>
                <p className={`text-lg font-medium ${item.requestedQuantity > 10 ? 'text-destructive' : 'text-primary'}`}>
                  {String(item.requestedQuantity).padStart(2, '0')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Avaliações de uso</p>
                <p className={`text-lg font-medium ${item.evaluationCount < item.requestedQuantity ? 'text-destructive' :
                  item.evaluationCount > item.requestedQuantity ? 'text-destructive' : 'text-primary'
                  }`}>
                  {String(item.evaluationCount).padStart(2, '0')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Consumption;
