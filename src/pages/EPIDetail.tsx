
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { EPIStatus } from '@/types';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';

const EPIDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEpiById, returnEpi, requestNewEpi } = useData();
  
  const epi = getEpiById(id || '');
  
  if (!epi) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <p>EPI não encontrado.</p>
        <button 
          className="mt-4 bg-primary text-white px-4 py-2 rounded"
          onClick={() => navigate('/my-epis')}
        >
          Voltar para Meus EPIs
        </button>
      </div>
    );
  }

  const handleEvaluate = () => {
    navigate(`/evaluate-epi/${epi.id}`);
  };

  const handleReturn = () => {
    returnEpi(epi.id);
    navigate('/home', { state: { message: 'EPI marcado para devolução!' } });
  };

  const handleRequestNew = () => {
    requestNewEpi(epi.id);
    navigate('/home', { state: { message: 'Nova solicitação de EPI enviada!' } });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pb-16">
      <Header title="MEU EPI" showBack />
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-primary text-xl font-bold">{epi.name} | {epi.code}</h2>
          {epi.imageUrl && (
            <img src={epi.imageUrl} alt={epi.name} className="w-20 h-20 object-contain" />
          )}
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Data da Aquisição</p>
              <p className="text-md text-accent-foreground font-medium">{epi.acquisitionDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <span className={`
                ${epi.status === EPIStatus.VALIDATED ? 'bg-accent' : 
                  epi.status === EPIStatus.INVALID ? 'bg-destructive' : 
                  epi.status === EPIStatus.RETURN ? 'bg-amber-500' : 'bg-warning'} 
                text-white px-3 py-1 rounded-md text-sm font-bold
              `}>
                {epi.status}
              </span>
            </div>
          </div>
          
          <p className="text-gray-700">{epi.description}</p>
        </div>
        
        <div className="space-y-4">
          {epi.status === EPIStatus.EVALUATE && (
            <button 
              className="w-full bg-primary text-white py-3 rounded-md font-bold"
              onClick={handleEvaluate}
            >
              Avaliar
            </button>
          )}
          
          {epi.status !== EPIStatus.RETURN && (
            <button 
              className={`w-full ${epi.status === EPIStatus.INVALID ? 'bg-gray-300 text-gray-500' : 'bg-destructive text-white'} py-3 rounded-md font-bold`}
              onClick={handleReturn}
              disabled={epi.status === EPIStatus.INVALID}
            >
              Devolver
            </button>
          )}
          
          {epi.status === EPIStatus.INVALID && (
            <button 
              className="w-full bg-accent text-white py-3 rounded-md font-bold"
              onClick={handleRequestNew}
            >
              Solicitar Novo
            </button>
          )}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default EPIDetail;
