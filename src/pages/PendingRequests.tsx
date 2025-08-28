import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { Search } from 'lucide-react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import PageHeader from '@/components/PageHeader';
import { getEpiImageUrl } from '@/lib/utils';

const PendingRequests: React.FC = () => {
  const navigate = useNavigate();
  const { epis, requests } = useData();

  // Filter pending requests
  const pendingRequests = requests.filter(request => request.status === 'PENDENTE');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pb-16">
      <PageHeader title="PENDENTE" />

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
                      <img
                        src={epi ? getEpiImageUrl(epi.name, epi.type, epi.imageUrl) : '/lovable-uploads/placeholder.svg'}
                        alt={epi?.name || 'EPI'}
                        className="w-16 h-16 mr-3 object-contain"
                      />
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
          <div className="text-center text-gray-500 py-8">
            Nenhuma solicitação pendente
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default PendingRequests;
