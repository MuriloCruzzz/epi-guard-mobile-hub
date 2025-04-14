
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EPI } from '@/types';
import { useData } from '@/contexts/DataContext';
import StarRating from './StarRating';

interface EvaluationFormProps {
  epi: EPI;
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({ epi }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const { evaluateEpi } = useData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    evaluateEpi(epi.id, rating, comment);
    navigate('/home', { state: { message: 'Avaliação enviada com sucesso!' } });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-6">
        <StarRating 
          onChange={(value) => setRating(value)} 
        />
        <p className="text-center mt-2 text-gray-600">
          {rating === 1 && 'Ruim'}
          {rating === 2 && 'Bom'}
          {rating === 3 && 'Ótimo'}
        </p>
      </div>
      
      <div className="mb-6">
        <textarea
          className="w-full border border-gray-300 rounded-md p-3 h-40"
          placeholder="Insira um comentário"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      
      <button 
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-md font-bold"
      >
        SALVAR
      </button>
    </form>
  );
};

export default EvaluationForm;
