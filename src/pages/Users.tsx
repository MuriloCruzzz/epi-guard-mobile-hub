import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Users as UsersIcon, Filter, Edit, User, ArrowLeft } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import PageHeader from '@/components/PageHeader';
import { useAuth } from '@/contexts/AuthContext';

interface User {
    id: number;
    name: string;
    birthDate: string;
    phone: string;
    cpf: string;
    userGroup: string;
}

const Users: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGroup, setSelectedGroup] = useState<string>('all');
    const [showFilters, setShowFilters] = useState(false);

    // Dados mockados para exemplo
    const users: User[] = [
        {
            id: 1,
            name: 'João Silva',
            birthDate: '15/05/1990',
            phone: '(11) 98765-4321',
            cpf: '123.456.789-00',
            userGroup: 'Operacional'
        },
        {
            id: 2,
            name: 'Maria Santos',
            birthDate: '20/08/1985',
            phone: '(11) 91234-5678',
            cpf: '987.654.321-00',
            userGroup: 'Administrativo'
        },
        {
            id: 3,
            name: 'Pedro Oliveira',
            birthDate: '10/03/1992',
            phone: '(11) 99876-5432',
            cpf: '456.789.123-00',
            userGroup: 'Supervisor'
        },
        {
            id: 4,
            name: 'Ana Costa',
            birthDate: '25/11/1988',
            phone: '(11) 98765-1234',
            cpf: '789.123.456-00',
            userGroup: 'Operacional'
        },
        {
            id: 5,
            name: 'Carlos Mendes',
            birthDate: '05/07/1995',
            phone: '(11) 91234-9876',
            cpf: '321.654.987-00',
            userGroup: 'Gerente'
        },
        {
            id: 6,
            name: 'Juliana Lima',
            birthDate: '18/09/1991',
            phone: '(11) 99876-1234',
            cpf: '654.321.987-00',
            userGroup: 'Administrativo'
        },
        {
            id: 7,
            name: 'Roberto Alves',
            birthDate: '30/01/1987',
            phone: '(11) 98765-9876',
            cpf: '987.321.654-00',
            userGroup: 'Supervisor'
        },
        {
            id: 8,
            name: 'Fernanda Souza',
            birthDate: '12/04/1993',
            phone: '(11) 91234-5432',
            cpf: '321.987.654-00',
            userGroup: 'Operacional'
        }
    ];

    const userGroups = ['Operacional', 'Administrativo', 'Supervisor', 'Gerente'];

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.cpf.includes(searchTerm) ||
            user.phone.includes(searchTerm);
        const matchesGroup = selectedGroup === 'all' || user.userGroup === selectedGroup;
        return matchesSearch && matchesGroup;
    });

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 pb-16">
            <div className="bg-primary p-4 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigate('/home')}
                            className="hover:opacity-80 transition-opacity"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl font-bold">Usuários</h1>
                    </div>
                    <button
                        onClick={() => navigate('/profile')}
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

            <div className="p-4 space-y-4">
                {/* Barra de busca e filtros */}
                <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Buscar por nome, CPF ou telefone..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="p-2 bg-white rounded-lg border border-gray-300"
                    >
                        <Filter className="text-gray-600" size={20} />
                    </button>
                </div>

                {/* Filtros */}
                {showFilters && (
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="font-semibold mb-2">Filtrar por Grupo</h3>
                        <select
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={selectedGroup}
                            onChange={(e) => setSelectedGroup(e.target.value)}
                        >
                            <option value="all">Todos os Grupos</option>
                            {userGroups.map(group => (
                                <option key={group} value={group}>{group}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Botões de ação */}
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate('/users/new')}
                        className="flex-1 bg-primary text-white py-2 rounded-lg flex items-center justify-center gap-2"
                    >
                        <Plus size={20} />
                        Novo Usuário
                    </button>
                    <button
                        onClick={() => navigate('/users/groups')}
                        className="flex-1 bg-white text-primary border border-primary py-2 rounded-lg flex items-center justify-center gap-2"
                    >
                        <UsersIcon size={20} />
                        Grupos
                    </button>
                </div>

                {/* Lista de usuários */}
                <div className="bg-white rounded-lg shadow divide-y max-h-[calc(100vh-280px)] overflow-y-auto">
                    {filteredUsers.map(user => (
                        <div key={user.id} className="p-2">
                            <div className="flex justify-between items-center">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold truncate text-sm">{user.name}</h3>
                                        <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded-full whitespace-nowrap">
                                            {user.userGroup}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 mt-0.5">
                                        <div className="text-xs text-gray-600">
                                            <span className="text-gray-500">CPF:</span> {user.cpf}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            <span className="text-gray-500">Tel:</span> {user.phone}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            <span className="text-gray-500">Nasc:</span> {user.birthDate}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate(`/users/edit/${user.id}`)}
                                    className="ml-1.5 p-1.5 text-primary hover:bg-primary/10 rounded-lg flex-shrink-0"
                                >
                                    <Edit size={16} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {filteredUsers.length === 0 && (
                        <div className="p-4 text-center text-gray-500">
                            Nenhum usuário encontrado
                        </div>
                    )}
                </div>
            </div>

            <BottomNavigation />
        </div>
    );
};

export default Users; 