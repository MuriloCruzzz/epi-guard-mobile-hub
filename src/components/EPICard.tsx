
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EPI, EPIStatus } from '@/types';

interface EPICardProps {
  epi: EPI;
  showActions?: boolean;
  onRequest?: (epiId: string) => void;
}

const EPICard: React.FC<EPICardProps> = ({ epi, showActions = false, onRequest }) => {
  const navigate = useNavigate();
  
  const getStatusColor = (status: EPIStatus): string => {
    switch (status) {
      case EPIStatus.AVAILABLE:
        return 'bg-accent text-white';
      case EPIStatus.UNAVAILABLE:
        return 'bg-destructive text-white';
      case EPIStatus.VALIDATED:
        return 'bg-accent text-white';
      case EPIStatus.INVALID:
        return 'bg-destructive text-white';
      case EPIStatus.PENDING:
        return 'bg-warning text-black';
      case EPIStatus.EVALUATE:
        return 'bg-destructive text-white';
      case EPIStatus.RETURN:
        return 'bg-amber-500 text-white';
      default:
        return 'bg-gray-300 text-gray-800';
    }
  };

  const handleClick = () => {
    if (!showActions) {
      navigate(`/epi/${epi.id}`);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4" onClick={handleClick}>
      <div className="flex items-center">
        {epi.imageUrl && (
          <img src={epi.imageUrl} alt={epi.name} className="w-14 h-14 object-contain mr-4" />
        )}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-primary text-lg font-bold">{epi.name} | {epi.code}</h3>
          </div>
          <div className="flex justify-between items-center mt-1">
            <div>
              <p className="text-sm text-gray-600">Data da Aquisição</p>
              <p className="text-md text-accent-foreground font-medium">{epi.acquisitionDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <span className={`${getStatusColor(epi.status)} px-3 py-1 rounded-md text-sm font-bold`}>
                {epi.status}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{epi.description}</p>
        </div>
      </div>
      
      {showActions && epi.status === EPIStatus.AVAILABLE && (
        <div className="mt-4">
          <button 
            className="bg-primary text-white py-2 px-4 rounded w-full"
            onClick={() => onRequest && onRequest(epi.id)}
          >
            Solicitar
          </button>
        </div>
      )}
    </div>
  );
};

export default EPICard;
