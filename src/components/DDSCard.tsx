
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DDS, DDSStatus } from '@/types';
import { FileText } from 'lucide-react';

interface DDSCardProps {
  dds: DDS;
  showFull?: boolean;
}

const DDSCard: React.FC<DDSCardProps> = ({ dds, showFull = false }) => {
  const navigate = useNavigate();
  
  const getStatusColor = (status: DDSStatus): string => {
    switch (status) {
      case DDSStatus.CONFIRMED:
        return 'bg-accent text-white';
      case DDSStatus.PENDING:
        return 'bg-destructive text-white';
      default:
        return 'bg-gray-300 text-gray-800';
    }
  };

  const handleClick = () => {
    if (!showFull) {
      navigate(`/dds/${dds.id}`);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4" onClick={handleClick}>
      <div className="flex items-start">
        <div className="bg-primary/10 p-3 rounded-full mr-4">
          <FileText size={24} className="text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-primary text-lg font-bold">
              Confirmar Diálogo de Segurança
              <br />
              {dds.code}
            </h3>
          </div>
          <div className="flex justify-between items-center mt-1">
            <div>
              <p className="text-sm text-gray-600">Data do DDS</p>
              <p className="text-md text-accent-foreground font-medium">{dds.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <span className={`${getStatusColor(dds.status)} px-3 py-1 rounded-md text-sm font-bold`}>
                {dds.status}
              </span>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600">Tema</p>
            <p className="text-md text-accent-foreground">{dds.theme}</p>
          </div>
          
          {showFull && (
            <div className="mt-4">
              <p className="text-sm text-gray-800">{dds.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DDSCard;
