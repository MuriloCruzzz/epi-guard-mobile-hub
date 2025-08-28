import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '@/components/BottomNavigation';
import { toast } from 'sonner';
import ImageUploader from '@/components/ImageUploader';
import { useData } from '@/contexts/DataContext';
import { getEpiImageUrl } from '@/lib/utils';

interface UserFormData {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    birthDate: string;
    userGroup: string;
    password: string;
    confirmPassword: string;
    profileImage?: string;
    epiIds?: string[];
}

interface UserFormErrors {
    name?: string;
    email?: string;
    cpf?: string;
    phone?: string;
    birthDate?: string;
    userGroup?: string;
    password?: string;
    confirmPassword?: string;
}

const NewUser: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { epis } = useData();
    const [formData, setFormData] = useState<UserFormData>({
        name: '',
        email: '',
        cpf: '',
        phone: '',
        birthDate: '',
        userGroup: '',
        password: '',
        confirmPassword: '',
        profileImage: undefined,
        epiIds: [],
    });
    const [errors, setErrors] = useState<UserFormErrors>({});
    const [touched, setTouched] = useState<Record<keyof UserFormData, boolean>>({
        name: false,
        email: false,
        cpf: false,
        phone: false,
        birthDate: false,
        userGroup: false,
        password: false,
        confirmPassword: false,
        profileImage: false,
        epiIds: false,
    });

    const [epiModalOpen, setEpiModalOpen] = useState(false);
    const [epiSearch, setEpiSearch] = useState('');
    const [tempSelectedEpiIds, setTempSelectedEpiIds] = useState<string[]>([]);

    const userGroups = ['Operacional', 'Administrativo', 'Supervisor', 'Gerente'];

    const formatPhoneBR = (value: string): string => {
        const digits = value.replace(/\D/g, '').slice(0, 11);
        const part1 = digits.slice(0, 2);
        const part2 = digits.slice(2, 7);
        const part3 = digits.slice(7, 11);
        if (digits.length <= 2) return part1 ? `(${part1}` : '';
        if (digits.length <= 7) return `(${part1}) ${part2}`;
        return `(${part1}) ${part2}-${part3}`;
    };

    const validate = (values: UserFormData): UserFormErrors => {
        const newErrors: UserFormErrors = {};
        if (!values.name.trim()) newErrors.name = 'Informe o nome completo.';
        if (!values.email.trim()) {
            newErrors.email = 'Informe o e-mail.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            newErrors.email = 'E-mail inválido.';
        }
        if (!values.cpf.trim()) {
            newErrors.cpf = 'Informe o CPF.';
        } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(values.cpf)) {
            newErrors.cpf = 'Formato esperado: 000.000.000-00';
        }
        if (!values.phone.trim()) {
            newErrors.phone = 'Informe o telefone.';
        } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(values.phone)) {
            newErrors.phone = 'Formato esperado: (00) 00000-0000';
        }
        if (!values.birthDate) newErrors.birthDate = 'Informe a data de nascimento.';
        if (!values.userGroup) newErrors.userGroup = 'Selecione um grupo.';
        if (!values.password) {
            newErrors.password = 'Informe a senha.';
        } else if (values.password.length < 6) {
            newErrors.password = 'A senha deve ter ao menos 6 caracteres.';
        }
        if (!values.confirmPassword) {
            newErrors.confirmPassword = 'Confirme a senha.';
        } else if (values.password !== values.confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem.';
        }
        return newErrors;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const nextValue = name === 'phone' ? formatPhoneBR(value) : value;
        setFormData(prev => ({
            ...prev,
            [name]: nextValue
        }));
        setErrors(prev => ({ ...prev, ...validate({ ...formData, [name]: nextValue }) }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name } = e.target as { name: keyof UserFormData };
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(validate(formData));
    };

    const openEpiModal = () => {
        setTempSelectedEpiIds([...(formData.epiIds || [])]);
        setEpiSearch('');
        setEpiModalOpen(true);
    };

    const confirmEpiSelection = () => {
        setFormData(prev => ({ ...prev, epiIds: [...tempSelectedEpiIds] }));
        setEpiModalOpen(false);
    };

    const toggleTempEpi = (id: string) => {
        setTempSelectedEpiIds(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
    };

    const filteredEpis = (epis || []).filter(e =>
        e.name.toLowerCase().includes(epiSearch.toLowerCase()) ||
        e.code.toLowerCase().includes(epiSearch.toLowerCase())
    );

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const allTouched = Object.keys(touched).reduce((acc, key) => {
            acc[key as keyof UserFormData] = true;
            return acc;
        }, {} as Record<keyof UserFormData, boolean>);
        setTouched(allTouched);
        const currentErrors = validate(formData);
        setErrors(currentErrors);
        if (Object.keys(currentErrors).length > 0) {
            toast.error('Por favor, corrija os campos destacados.');
            return;
        }
        try {
            console.log('Dados do formulário:', formData);
            toast.success(`Usuário ${formData.name} criado com sucesso!`, {
                style: {
                    background: '#34C759',
                    color: 'white',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '500'
                },
                duration: 3000
            });
            navigate('/users');
        } catch (error) {
            toast.error('Erro ao cadastrar usuário. Tente novamente.');
        }
    };

    const inputBase = 'w-full p-2 border rounded-lg focus:outline-none';
    const inputOk = 'border-gray-300 focus:border-primary';
    const inputError = 'border-destructive focus:border-destructive';
    const errorText = 'text-xs text-destructive mt-1';

    // Título dinâmico: primeiro nome + sobrenome (até dois termos, suporta nomes compostos)
    const displayTitle = (() => {
        const trimmed = formData.name.trim();
        if (!trimmed) return 'Novo Usuário';
        const parts = trimmed.split(/\s+/);
        return parts.slice(0, 2).join(' ');
    })();

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
                        <h1 className="text-xl font-bold">Novo Usuário</h1>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
                <div className="max-w-xl md:max-w-2xl mx-auto bg-primary/5 rounded-xl p-2">
                    <div className="bg-white rounded-xl shadow p-4 md:p-6 space-y-4 ring-1 ring-primary/10">
                        {/* Uploader de imagem + título dinâmico */}
                        <div className="md:col-span-2">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Foto do Usuário</label>
                                    <ImageUploader
                                        value={formData.profileImage}
                                        onChange={(dataUrl) => setFormData(prev => ({ ...prev, profileImage: dataUrl }))}
                                    />
                                </div>
                                <div className="flex-1 text-right hidden md:block">
                                    <div className="text-2xl md:text-3xl font-bold text-primary">{displayTitle}</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nome Completo
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`${inputBase} ${touched.name && errors.name ? inputError : inputOk}`}
                                    required
                                />
                                {touched.name && errors.name && (
                                    <p className={errorText}>{errors.name}</p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`${inputBase} ${touched.email && errors.email ? inputError : inputOk}`}
                                    required
                                />
                                {touched.email && errors.email && (
                                    <p className={errorText}>{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    CPF
                                </label>
                                <input
                                    type="text"
                                    name="cpf"
                                    value={formData.cpf}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`${inputBase} ${touched.cpf && errors.cpf ? inputError : inputOk}`}
                                    required
                                    placeholder="000.000.000-00"
                                />
                                {touched.cpf && errors.cpf && (
                                    <p className={errorText}>{errors.cpf}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Telefone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`${inputBase} ${touched.phone && errors.phone ? inputError : inputOk}`}
                                    required
                                    placeholder="(00) 00000-0000"
                                />
                                {touched.phone && errors.phone && (
                                    <p className={errorText}>{errors.phone}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Data de Nascimento
                                </label>
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`${inputBase} ${touched.birthDate && errors.birthDate ? inputError : inputOk}`}
                                    required
                                />
                                {touched.birthDate && errors.birthDate && (
                                    <p className={errorText}>{errors.birthDate}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Grupo de Usuário
                                </label>
                                <select
                                    name="userGroup"
                                    value={formData.userGroup}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`${inputBase} ${touched.userGroup && errors.userGroup ? inputError : inputOk}`}
                                    required
                                >
                                    <option value="">Selecione um grupo</option>
                                    {userGroups.map(group => (
                                        <option key={group} value={group}>{group}</option>
                                    ))}
                                </select>
                                {touched.userGroup && errors.userGroup && (
                                    <p className={errorText}>{errors.userGroup}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`${inputBase} ${touched.password && errors.password ? inputError : inputOk}`}
                                    required
                                    minLength={6}
                                />
                                {touched.password && errors.password && (
                                    <p className={errorText}>{errors.password}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirmar Senha
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`${inputBase} ${touched.confirmPassword && errors.confirmPassword ? inputError : inputOk}`}
                                    required
                                    minLength={6}
                                />
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <p className={errorText}>{errors.confirmPassword}</p>
                                )}
                            </div>
                        </div>

                        {/* Seleção de EPIs (após os campos de senha) - sempre visível */}
                        <div className="mt-2">
                            <h4 className="font-semibold text-sm text-gray-800">EPIs do Usuário</h4>
                            <p className="text-xs text-gray-500 mb-2">Vincule EPIs específicos a este usuário.</p>
                            <div className="flex items-center gap-2 mb-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!formData.userGroup) {
                                            toast.error('Selecione um grupo de usuário antes de escolher EPIs');
                                            return;
                                        }
                                        openEpiModal();
                                    }}
                                    className={`px-3 py-2 rounded-md text-sm border transition-colors ${!formData.userGroup
                                        ? 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100'
                                        : 'bg-white border-primary text-primary hover:bg-primary/5'
                                        }`}
                                >
                                    Selecionar EPIs
                                </button>
                                {formData.epiIds && formData.epiIds.length > 0 && (
                                    <span className="text-xs text-gray-600">{formData.epiIds.length} selecionado(s)</span>
                                )}
                            </div>
                            {!formData.userGroup && (
                                <p className="text-xs text-red-600 mt-1">⚠️ Selecione um grupo de usuário para vincular EPIs</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="max-w-xl md:max-w-2xl mx-auto mt-4">
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                    >
                        <Save size={20} />
                        Cadastrar Usuário
                    </button>
                </div>
            </form>

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

            <BottomNavigation />
        </div>
    );
};

export default NewUser; 