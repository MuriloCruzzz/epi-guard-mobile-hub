import React from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { ConsumptionItem } from '@/types';
import { ChevronRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const Consumption: React.FC = () => {
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
      <PageHeader title="CONSUMO" />

      <div className="bg-primary p-4 text-white">
        <h2 className="text-xl font-bold">Ricardo Paixão</h2>
        <p className="text-sm">CONSERVAÇÃO DE VEÍCULOS TAUBATÉ</p>
        <p className="text-sm">ID Sistema Sênior: 123456789</p>

        <div className="flex mt-4 border-b border-white/20">
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
            onClick={() => setActiveTab('solicitar')}
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
