
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { Search } from 'lucide-react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';

const PendingRequests: React.FC = () => {
  const navigate = useNavigate();
  const { epis, requests } = useData();
  
  // Filter pending requests
  const pendingRequests = requests.filter(request => request.status === 'PENDENTE');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pb-16">
      <Header title="PENDENTE" showBack />
      
      <div className="bg-primary p-4 text-white">
        <div className="p-3 bg-white/10 rounded-lg flex items-center gap-3">
          <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
            <img 
              src="/lovable-uploads/2be3b675-1dae-44e1-9e29-7f197581dc6f.png" 
              alt="User" 
              className="w-8 h-8 rounded-full"
            />
          </div>
          <h2 className="text-lg font-bold">Solicitação: Ricardo Paixão</h2>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-4 flex justify-between">
          <button 
            className="flex-1 py-2 text-gray-500"
            onClick={() => navigate('/my-epis')}
          >
            Meus Itens
          </button>
          <button 
            className="tab-active flex-1 py-2"
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
        
        {pendingRequests.length > 0 ? (
          <div className="space-y-4">
            {pendingRequests.map((request) => {
              const epi = epis.find(e => e.id === request.epiId);
              
              return (
                <div key={request.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <h3 className="text-primary font-bold">{request.epiName} | {request.epiCode}</h3>
                    <span className="bg-warning text-black px-3 py-1 rounded-md text-xs font-bold">
                      {request.status}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      {epi?.imageUrl && (
                        <img src={epi.imageUrl} alt={epi.name} className="w-16 h-16 mr-3 object-contain" />
                      )}
                      <div>
                        <p className="text-sm">{epi?.description?.substring(0, 100)}...</p>
                        <p className="text-xs text-gray-500 mt-1">{request.requestDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-gray-500">Nenhuma solicitação pendente.</p>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default PendingRequests;
