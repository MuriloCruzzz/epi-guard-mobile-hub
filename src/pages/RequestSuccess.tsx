
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { EPI } from '@/types';
import { CheckCircle } from 'lucide-react';

interface LocationState {
  epi: EPI;
}

const RequestSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  if (!state?.epi) {
    navigate('/home');
    return null;
  }
  
  const { epi } = state;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pb-16">
      <Header title="PENDENTE" showBack />
      
      <div className="p-4">
        <div className="bg-white rounded-lg p-6 shadow-sm mb-4 text-center">
          <CheckCircle size={60} className="text-accent mx-auto mb-4" />
          
          <h2 className="text-accent text-xl font-bold uppercase mb-4">ITEM SOLICITADO COM SUCESSO!</h2>
          <p className="text-accent font-medium mb-6">
            POR FAVOR AGUARDE LOGO RECEBERÁ UMA NOTIFICAÇÃO PARA RETIRADA.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-primary text-lg font-bold mb-2">{epi.name} | {epi.code}</h3>
            
            <div className="flex justify-between mb-2">
              <div className="text-left">
                <p className="text-sm text-gray-600">Data da Aquisição</p>
                <p className="text-md text-accent-foreground font-medium">{epi.acquisitionDate}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-md text-accent font-medium">{epi.status}</p>
              </div>
            </div>
            
            <p className="text-gray-700 text-sm text-left mt-2">{epi.description}</p>
          </div>
        </div>
        
        <button 
          className="w-full bg-primary text-white py-3 rounded-md font-bold"
          onClick={() => navigate('/home')}
        >
          VOLTAR PARA O INÍCIO
        </button>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default RequestSuccess;
