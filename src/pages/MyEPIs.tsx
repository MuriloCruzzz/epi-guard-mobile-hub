
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { Search } from 'lucide-react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import EPICard from '@/components/EPICard';

const MyEPIs: React.FC = () => {
  const navigate = useNavigate();
  const { epis } = useData();
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pb-16">
      <Header title="MEUS ITENS" showBack />
      
      <div className="p-4">
        <div className="relative mb-4">
          <input 
            type="text" 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Ex.: CA12345" 
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        
        <div className="mb-4 flex justify-between">
          <button 
            className="tab-active flex-1 py-2"
            onClick={() => navigate('/my-epis')}
          >
            Meus Itens
          </button>
          <button 
            className="flex-1 py-2 text-gray-500"
            onClick={() => navigate('/pending-epis')}
          >
            Pendente
          </button>
          <button 
            className="flex-1 py-2 text-gray-500"
            onClick={() => navigate('/request-epi')}
          >
            Solicitar EPI
          </button>
        </div>
        
        <div className="space-y-4">
          {epis.map(epi => (
            <EPICard key={epi.id} epi={epi} />
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default MyEPIs;
