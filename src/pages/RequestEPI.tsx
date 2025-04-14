
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { Search } from 'lucide-react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import EPICard from '@/components/EPICard';
import { EPIStatus } from '@/types';

const RequestEPI: React.FC = () => {
  const navigate = useNavigate();
  const { epis } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter available EPIs
  const availableEpis = epis.filter(epi => epi.status === EPIStatus.AVAILABLE);

  // Filter based on search query
  const filteredEpis = searchQuery
    ? availableEpis.filter(epi => 
        epi.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        epi.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : availableEpis;

  const handleRequestEpi = (epiId: string) => {
    navigate(`/request-details/${epiId}`);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pb-16">
      <Header title="SOLICITAR EPI" showBack />
      
      <div className="p-4">
        <div className="relative mb-4">
          <input 
            type="text" 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Ex.: CA12345" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        
        <div className="mb-4 flex justify-between">
          <button 
            className="flex-1 py-2 text-gray-500"
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
            className="tab-active flex-1 py-2"
            onClick={() => navigate('/request-epi')}
          >
            Solicitar EPI
          </button>
        </div>
        
        <div className="space-y-4">
          {filteredEpis.length > 0 ? (
            filteredEpis.map(epi => (
              <EPICard 
                key={epi.id} 
                epi={epi} 
                showActions
                onRequest={handleRequestEpi}
              />
            ))
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-gray-500">
                {searchQuery ? 'Nenhum EPI encontrado com este termo.' : 'Nenhum EPI disponível para solicitação.'}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default RequestEPI;
