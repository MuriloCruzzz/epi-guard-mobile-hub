import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2, Save, X, AlertTriangle, Search } from 'lucide-react';
import { toast } from 'sonner';
import BottomNavigation from '@/components/BottomNavigation';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { getEpiImageUrl } from '@/lib/utils';

interface UserGroup {
    id: number;
    name: string;
    description: string;
    permissions?: string[];
    epiIds?: string[];
}

const PERMISSION_MODULES: Record<string, string[]> = {
    Cadastro: [
        'Usuários - Criar',
        'Usuários - Editar',
        'Usuários - Excluir',
        'EPIs - Gerenciar',
        'DDS - Gerenciar',
    ],
    Relatórios: [
        'Relatório de EPIs',
        'Relatório de DDS',
        'Relatório de Consumo',
        'Relatório de Entregas',
        'Relatório de Avaliações',
    ],
    Funcionamento: [
        'Notificações',
        'Solicitações de EPI',
        'Avaliação de EPI',
        'Devolução de EPI',
        'Administração de Grupos',
    ],
};

const UserGroups: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { epis } = useData();
    const [groups, setGroups] = useState<UserGroup[]>([
        { id: 1, name: 'Operacional', description: 'Usuários operacionais', permissions: [], epiIds: [] },
        { id: 2, name: 'Administrativo', description: 'Usuários administrativos', permissions: [], epiIds: [] },
        { id: 3, name: 'Supervisor', description: 'Supervisores de equipe', permissions: [], epiIds: [] },
        { id: 4, name: 'Gerente', description: 'Gerentes e coordenadores', permissions: [], epiIds: [] }
    ]);

    const [isAddingGroup, setIsAddingGroup] = useState(false);
    const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [groupToDelete, setGroupToDelete] = useState<number | null>(null);
    const [newGroup, setNewGroup] = useState<UserGroup>({
        id: 0,
        name: '',
        description: '',
        permissions: [],
        epiIds: [],
    });

    const [epiModalOpen, setEpiModalOpen] = useState(false);
    const [epiSearch, setEpiSearch] = useState('');
    const [tempSelectedEpiIds, setTempSelectedEpiIds] = useState<string[]>([]);

    const filteredEpis = (epis || []).filter(e =>
        e.name.toLowerCase().includes(epiSearch.toLowerCase()) ||
        e.code.toLowerCase().includes(epiSearch.toLowerCase())
    );

    // Lista do modal: garantir até 20 itens para exibição (repete/monta mocks quando necessário)
    const modalEpis = React.useMemo(() => {
        const base = filteredEpis.map(e => ({ id: e.id, name: e.name, code: e.code, type: e.type, imageUrl: e.imageUrl }));
        const result = [...base];
        const patterns = [
            { baseName: 'Botina', type: 'Proteção para Pés' },
            { baseName: 'Luva', type: 'Proteção para Mãos' },
            { baseName: 'Protetor Facial', type: 'Proteção para Face' },
        ];
        let idx = 1;
        let patternIndex = 0;
        while (result.length < 20) {
            const p = patterns[patternIndex % patterns.length];
            const name = `${p.baseName} ${idx}`;
            const code = `CI-${String(idx).padStart(3, '0')}`;
            result.push({ id: `mock-${p.baseName.toLowerCase()}-${idx}`, name, code, type: p.type });
            patternIndex++;
            if (patternIndex % patterns.length === 0) idx++;
        }
        return result.slice(0, 20);
    }, [filteredEpis]);

    const togglePermission = (perm: string) => {
        setNewGroup(prev => {
            const has = prev.permissions?.includes(perm);
            const permissions = has
                ? (prev.permissions || []).filter(p => p !== perm)
                : [...(prev.permissions || []), perm];
            return { ...prev, permissions };
        });
    };

    const toggleModule = (moduleName: string) => {
        const perms = PERMISSION_MODULES[moduleName];
        const allChecked = perms.every(p => newGroup.permissions?.includes(p));
        setNewGroup(prev => {
            const current = new Set(prev.permissions || []);
            if (allChecked) {
                perms.forEach(p => current.delete(p));
            } else {
                perms.forEach(p => current.add(p));
            }
            return { ...prev, permissions: Array.from(current) };
        });
    };

    const handleAddGroup = () => {
        if (!newGroup.name.trim()) {
            toast.error('O nome do grupo é obrigatório', {
                style: {
                    background: '#FF3B30',
                    color: 'white',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '500'
                },
                duration: 3000
            });
            return;
        }

        const newId = Math.max(...groups.map(g => g.id)) + 1;
        setGroups([...groups, { ...newGroup, id: newId }]);
        setNewGroup({ id: 0, name: '', description: '', permissions: [], epiIds: [] });
        setIsAddingGroup(false);
        toast.success('Grupo criado com sucesso!', {
            style: {
                background: '#34C759',
                color: 'white',
                border: 'none',
                fontSize: '16px',
                fontWeight: '500'
            },
            duration: 3000
        });
    };

    const handleEditGroup = (groupId: number) => {
        const group = groups.find(g => g.id === groupId);
        if (group) {
            setNewGroup({ ...group, permissions: group.permissions || [], epiIds: group.epiIds || [] });
            setEditingGroupId(groupId);
            setIsAddingGroup(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSaveEdit = () => {
        if (!newGroup.name.trim()) {
            toast.error('O nome do grupo é obrigatório', {
                style: {
                    background: '#FF3B30',
                    color: 'white',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '500'
                },
                duration: 3000
            });
            return;
        }

        setGroups(groups.map(group =>
            group.id === editingGroupId ? { ...newGroup, id: editingGroupId! } : group
        ));
        setEditingGroupId(null);
        setNewGroup({ id: 0, name: '', description: '', permissions: [], epiIds: [] });
        toast.success('Grupo atualizado com sucesso!', {
            style: {
                background: '#34C759',
                color: 'white',
                border: 'none',
                fontSize: '16px',
                fontWeight: '500'
            },
            duration: 3000
        });
    };

    const handleDeleteClick = (groupId: number) => {
        setGroupToDelete(groupId);
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = () => {
        if (groupToDelete) {
            setGroups(groups.filter(group => group.id !== groupToDelete));
            toast.success('Grupo excluído com sucesso!', {
                style: {
                    background: '#34C759',
                    color: 'white',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '500'
                },
                duration: 3000
            });
        }
        setShowDeleteConfirm(false);
        setGroupToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false);
        setGroupToDelete(null);
    };

    const handleCancel = () => {
        setIsAddingGroup(false);
        setEditingGroupId(null);
        setNewGroup({ id: 0, name: '', description: '', permissions: [], epiIds: [] });
    };

    const openEpiModal = () => {
        setTempSelectedEpiIds([...(newGroup.epiIds || [])]);
        setEpiSearch('');
        setEpiModalOpen(true);
    };

    const confirmEpiSelection = () => {
        setNewGroup(prev => ({ ...prev, epiIds: [...tempSelectedEpiIds] }));
        setEpiModalOpen(false);
    };

    const toggleTempEpi = (id: string) => {
        setTempSelectedEpiIds(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
    };

    // Monta a lista exibida no carrossel (até 50 itens): começa pelos selecionados e completa com mocks "Luva N"
    const displayEpiCards = React.useMemo(() => {
        const selected = (newGroup.epiIds || [])
            .map(id => (epis || []).find(e => e.id === id))
            .filter(Boolean) as typeof epis;
        const result: Array<{ name: string; code: string; type: string; imageUrl?: string }> = [];
        selected.forEach(e => result.push({ name: e!.name, code: e!.code, type: e!.type, imageUrl: e!.imageUrl }));
        const toFill = Math.max(0, 50 - result.length);
        for (let i = 1; i <= toFill; i++) {
            result.push({ name: `Luva ${i}`, code: `CI-${i.toString().padStart(3, '0')}`, type: 'Proteção para Mãos' });
        }
        return result.slice(0, 50);
    }, [epis, newGroup.epiIds]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 pb-16">
            <div className="bg-primary p-4 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigate('/users')}
                            className="hover:opacity-80 transition-opacity"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl font-bold">Grupos de Usuários</h1>
                    </div>
                    <button
                        onClick={() => navigate('/profile')}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <div className="text-right">
                            <p className="text-sm font-medium">{user?.name}</p>
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
                {!isAddingGroup && editingGroupId === null && (
                    <button
                        onClick={() => setIsAddingGroup(true)}
                        className="w-full bg-primary text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                    >
                        <Plus size={20} />
                        Novo Grupo
                    </button>
                )}

                {(isAddingGroup || editingGroupId !== null) && (
                    <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto bg-primary/5 rounded-xl p-2">
                        <div className="bg-white rounded-xl shadow p-4 md:p-6 space-y-4 ring-1 ring-primary/10">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nome do Grupo
                                </label>
                                <input
                                    type="text"
                                    value={newGroup.name}
                                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                                    placeholder="Digite o nome do grupo"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Descrição
                                </label>
                                <textarea
                                    value={newGroup.description}
                                    onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                                    placeholder="Digite a descrição do grupo"
                                    rows={2}
                                />
                            </div>

                            {/* Seleção de EPIs do grupo */}
                            <div>
                                <h4 className="font-semibold text-sm text-gray-800">EPIs do Grupo</h4>
                                <p className="text-xs text-gray-500 mb-2">Defina EPIs exclusivos que pertencem a este grupo.</p>
                                <div className="flex items-center gap-2 mb-2">
                                    <button type="button" onClick={openEpiModal} className="px-3 py-2 rounded-md text-sm bg-white border border-primary text-primary hover:bg-primary/5">
                                        Selecionar EPIs
                                    </button>
                                    {newGroup.epiIds && newGroup.epiIds.length > 0 && (
                                        <span className="text-xs text-gray-600">{newGroup.epiIds.length} selecionado(s)</span>
                                    )}
                                </div>
                                {/* Removido o scrol lateral abaixo do botão conforme solicitado */}
                            </div>

                            {/* Permissões de Acesso */}
                            <div>
                                <h4 className="font-semibold text-sm text-gray-800">Permissões de Acesso</h4>
                                <p className="text-xs text-gray-500 mb-2">Selecione as permissões deste grupo por módulo.</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {Object.entries(PERMISSION_MODULES).map(([moduleName, perms]) => {
                                        const allChecked = perms.every(p => newGroup.permissions?.includes(p));
                                        const someChecked = !allChecked && perms.some(p => newGroup.permissions?.includes(p));
                                        return (
                                            <div key={moduleName} className="border rounded-lg p-3">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-sm">{moduleName}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleModule(moduleName)}
                                                        className={`text-xs px-2 py-0.5 rounded ${allChecked ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                                                    >
                                                        {allChecked ? 'Desmarcar' : 'Marcar todos'}
                                                    </button>
                                                </div>
                                                <div className="space-y-2">
                                                    {perms.map(perm => (
                                                        <label key={perm} className="flex items-center gap-2 text-sm">
                                                            <input
                                                                type="checkbox"
                                                                checked={!!newGroup.permissions?.includes(perm)}
                                                                onChange={() => togglePermission(perm)}
                                                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                            />
                                                            <span>{perm}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={isAddingGroup ? handleAddGroup : handleSaveEdit}
                                    className="flex-1 bg-primary text-white py-2 rounded-lg flex items-center justify-center gap-2"
                                >
                                    <Save size={20} />
                                    {isAddingGroup ? 'Criar Grupo' : 'Salvar Alterações'}
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg flex items-center justify-center gap-2"
                                >
                                    <X size={20} />
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow divide-y">
                    {groups.map(group => (
                        <div key={group.id} className="p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold">{group.name}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{group.description}</p>
                                    {group.epiIds && group.epiIds.length > 0 && (
                                        <p className="text-xs text-gray-500 mt-1">{group.epiIds.length} EPI(s) vinculados</p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEditGroup(group.id)}
                                        className="p-2 text-primary hover:bg-primary/10 rounded-lg"
                                    >
                                        <Edit2 size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(group.id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal seleção de EPIs */}
            {epiModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Selecionar EPIs</h3>
                            <button onClick={() => setEpiModalOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="relative mb-3">
                                <input
                                    type="text"
                                    placeholder="Buscar por nome ou CI..."
                                    value={epiSearch}
                                    onChange={(e) => setEpiSearch(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                                />
                                <Search className="absolute left-2.5 top-2.5 text-gray-400" size={18} />
                            </div>
                            <div className="max-h-96 overflow-y-auto divide-y">
                                {modalEpis.map(epi => {
                                    const selected = tempSelectedEpiIds.includes(epi.id);
                                    return (
                                        <label
                                            key={epi.id}
                                            className={`flex items-center justify-between py-2 px-2 rounded-md cursor-pointer transition-colors duration-150 ${selected ? 'bg-gradient-to-r from-primary/10 to-primary/20 border border-primary/30' : 'hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <img src={getEpiImageUrl(epi.name, epi.type, epi.imageUrl)} className="w-8 h-8 object-contain" />
                                                <div>
                                                    <p className="text-sm font-medium">{epi.name}</p>
                                                    <p className="text-xs text-gray-500">{epi.code}</p>
                                                </div>
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={selected}
                                                onChange={() => toggleTempEpi(epi.id)}
                                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="p-4 border-t flex justify-end gap-2">
                            <button onClick={() => setEpiModalOpen(false)} className="px-3 py-2 rounded-md text-sm">Cancelar</button>
                            <button onClick={confirmEpiSelection} className="px-3 py-2 rounded-md text-sm bg-primary text-white">Confirmar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de confirmação de exclusão */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-red-100 p-2 rounded-full">
                                <AlertTriangle className="text-red-500" size={24} />
                            </div>
                            <h3 className="text-lg font-semibold">Confirmar Exclusão</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Tem certeza que deseja excluir este grupo?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={handleConfirmDelete}
                                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Excluir
                            </button>
                            <button
                                onClick={handleCancelDelete}
                                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <BottomNavigation />
        </div>
    );
};

export default UserGroups; 