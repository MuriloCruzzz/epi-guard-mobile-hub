
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EPI } from '@/types';
import { useData } from '@/contexts/DataContext';

interface RequestFormProps {
  epi: EPI;
}

const RequestForm: React.FC<RequestFormProps> = ({ epi }) => {
  const [reason, setReason] = useState('');
  const navigate = useNavigate();
  const { addEpiRequest } = useData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addEpiRequest({
      userId: '12345', // Assuming current user
      userName: 'Ricardo Paixão', // Assuming current user
      epiId: epi.id,
      epiName: epi.name,
      epiCode: epi.code,
      status: 'PENDENTE' as any,
      reason
    });
    
    navigate('/request-success', { state: { epi } });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-6">
        <h3 className="text-primary text-xl font-bold mb-4">Qual motivo da solicitação?</h3>
        <textarea
          className="w-full border border-gray-300 rounded-md p-3 h-40"
          placeholder="Insira um comentário"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
      </div>
      
      <button 
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-md font-bold"
      >
        SOLICITAR
      </button>
    </form>
  );
};

export default RequestForm;
