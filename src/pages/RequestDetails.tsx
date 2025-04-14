
import React from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import RequestForm from '@/components/RequestForm';

const RequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEpiById } = useData();
  
  const epi = getEpiById(id || '');
  
  if (!epi) {
    return <div>EPI não encontrado.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pb-16">
      <Header title="SOLICITAÇÃO MOTIVO" showBack />
      
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <h2 className="text-primary text-xl font-bold mb-2">{epi.name} | {epi.code}</h2>
          
          <div className="flex justify-between mb-2">
            <div>
              <p className="text-sm text-gray-600">Data da Aquisição</p>
              <p className="text-md text-accent-foreground font-medium">{epi.acquisitionDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <span className="bg-accent text-white px-3 py-1 rounded-md text-sm font-bold">
                {epi.status}
              </span>
            </div>
          </div>
          
          <p className="text-gray-700 text-sm">{epi.description}</p>
        </div>
        
        <RequestForm epi={epi} />
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default RequestDetails;
