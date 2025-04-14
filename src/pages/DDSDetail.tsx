
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import StarRating from '@/components/StarRating';
import { DDSStatus } from '@/types';

const DDSDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getDdsById, markDdsAsConfirmed } = useData();
  const [comment, setComment] = React.useState('');
  const [rating, setRating] = React.useState(0);
  
  const dds = getDdsById(id || '');
  
  if (!dds) {
    return <div>DDS não encontrado.</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    markDdsAsConfirmed(dds.id);
    navigate('/home', { state: { message: 'DDS confirmado com sucesso!' } });
  };

  const isPending = dds.status === DDSStatus.PENDING;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pb-16">
      <Header title="AVALIAÇÃO DE DDS" showBack />
      
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <h2 className="text-primary text-xl font-bold">Diálogo de Segurança - {dds.code}</h2>
          
          <div className="flex justify-between my-4">
            <div>
              <p className="text-sm text-gray-600">Data do DDS</p>
              <p className="text-md text-accent-foreground font-medium">{dds.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <span className={`${
                dds.status === DDSStatus.CONFIRMED ? 'bg-accent' : 'bg-destructive'
              } text-white px-3 py-1 rounded-md text-sm font-bold`}>
                {dds.status}
              </span>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600">Tema</p>
            <p className="text-md text-accent-foreground">{dds.theme}</p>
          </div>
          
          <p className="text-gray-700">{dds.description}</p>
        </div>
        
        {isPending && (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <StarRating onChange={(value) => setRating(value)} />
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
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default DDSDetail;
