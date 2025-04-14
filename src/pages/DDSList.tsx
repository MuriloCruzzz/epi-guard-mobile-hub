
import React from 'react';
import { useData } from '@/contexts/DataContext';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import DDSCard from '@/components/DDSCard';

const DDSList: React.FC = () => {
  const { ddsList } = useData();
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pb-16">
      <Header title="CONFIRMAÇÃO DE DDS" showBack />
      
      <div className="p-4">
        {ddsList.length > 0 ? (
          <div className="space-y-4">
            {ddsList.map(dds => (
              <DDSCard key={dds.id} dds={dds} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-500">Nenhum DDS disponível.</p>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default DDSList;
