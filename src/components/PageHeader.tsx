import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PageHeaderProps {
    title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <div className="bg-primary p-4 text-white">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">{title}</h1>
                <button
                    onClick={handleProfileClick}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                    <div className="text-right">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs opacity-80">{user?.email}</p>
                    </div>
                    <div className="bg-white/20 rounded-full p-2">
                        {user?.profileImage ? (
                            <img
                                src={user.profileImage}
                                alt={user.name}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        ) : (
                            <img
                                src="/lovable-uploads/photo_user.png"
                                alt={user?.name || 'Usuário'}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        )}
                    </div>
                </button>
            </div>
        </div>
    );
};

export default PageHeader; 