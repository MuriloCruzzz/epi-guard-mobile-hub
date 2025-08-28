import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { ArrowLeft, HardHat, FileText, Package, Users, BarChart3, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import { DashboardFilters, DashboardFilters as DashboardFiltersType } from '@/components/ui/charts/dashboard-filters';
import { AdvancedMetrics } from '@/components/ui/charts/advanced-metrics';
import { AreaChart } from '@/components/ui/charts/area-chart';
import { BarChartComponent } from '@/components/ui/charts/bar-chart';
import { PieChartComponent } from '@/components/ui/charts/pie-chart';
import { LineChartComponent } from '@/components/ui/charts/line-chart';
import { RadarChartComponent } from '@/components/ui/charts/radar-chart';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { ddsList, requests, epis, notifications } = useData();
    const [filters, setFilters] = useState<DashboardFiltersType>({
        period: '30d',
        department: 'all',
        epiType: 'all',
        group: 'all',
        dateRange: {
            start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            end: new Date()
        }
    });

    // Cálculos das métricas
    const totalEPIs = epis.length;
    const pendingRequests = requests.filter(req => req.status === 'PENDENTE').length;
    const approvedRequests = requests.filter(req => req.status === 'APROVADO').length;
    const pendingDDS = ddsList.filter(dds => dds.status === 'PENDENTE').length;
    const totalUsers = 150; // Valor fictício para demonstração
    const unreadNotifications = notifications.filter(n => !n.read).length;

    // Dados simulados para gráficos
    const consumptionData = [
        { name: 'Jan', total: 120, pending: 15, approved: 105 },
        { name: 'Fev', total: 135, pending: 20, approved: 115 },
        { name: 'Mar', total: 110, pending: 12, approved: 98 },
        { name: 'Abr', total: 145, pending: 25, approved: 120 },
        { name: 'Mai', total: 130, pending: 18, approved: 112 },
        { name: 'Jun', total: 155, pending: 22, approved: 133 }
    ];

    const epiTypeData = [
        { name: 'Capacetes', value: 45 },
        { name: 'Luvas', value: 32 },
        { name: 'Botas', value: 28 },
        { name: 'Óculos', value: 15 },
        { name: 'Máscaras', value: 20 },
        { name: 'Protetores', value: 18 },
        { name: 'Cintos', value: 12 }
    ];

    const costData = [
        { name: 'Jan', total: 8500 },
        { name: 'Fev', total: 9200 },
        { name: 'Mar', total: 7800 },
        { name: 'Abr', total: 10500 },
        { name: 'Mai', total: 8900 },
        { name: 'Jun', total: 11200 }
    ];

    const departmentData = [
        { name: 'Produção', value: 85 },
        { name: 'Manutenção', value: 65 },
        { name: 'Qualidade', value: 45 },
        { name: 'Segurança', value: 55 },
        { name: 'Logística', value: 35 },
        { name: 'Administrativo', value: 25 }
    ];

    const trendData = [
        { name: 'Jan', total: 120, target: 100 },
        { name: 'Fev', total: 135, target: 110 },
        { name: 'Mar', total: 110, target: 120 },
        { name: 'Abr', total: 145, target: 130 },
        { name: 'Mai', total: 130, target: 140 },
        { name: 'Jun', total: 155, target: 150 }
    ];

    const handleFilterChange = (newFilters: DashboardFiltersType) => {
        setFilters(newFilters);
        // Aqui você pode implementar a lógica de filtragem dos dados
        console.log('Filtros aplicados:', newFilters);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 pb-16">
            {/* Header */}
            <div className="flex items-center justify-between bg-primary p-4 text-white w-full sticky top-0 z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="text-white"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-lg font-bold">Dashboard - Análise Visual Avançada dos Dados</h1>
                <div className="w-6"></div>
            </div>

            <div className="p-4 space-y-6">
                {/* Filtros do Dashboard */}
                <DashboardFilters onFilterChange={handleFilterChange} />

                {/* Gráficos Principais - EM DESTAQUE */}
                <div className="space-y-6">

                    {/* Primeira linha - Gráficos principais */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Consumo Mensal com Múltiplas Linhas */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-primary">
                                <TrendingUp className="h-6 w-6" />
                                Consumo Mensal de EPIs
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">Comparativo: Total, Pendentes e Aprovados</p>
                            <LineChartComponent data={consumptionData} height={280} multipleLines={true} />
                        </div>

                        {/* Distribuição por Tipo com Legenda */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-primary">
                                <Package className="h-6 w-6" />
                                Distribuição de EPIs por Tipo
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">Percentual de cada categoria</p>
                            <PieChartComponent data={epiTypeData} height={280} />
                        </div>
                    </div>

                    {/* Segunda linha - Gráficos complementares */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Custos Mensais */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-3 text-primary">
                                <DollarSign className="h-5 w-5" />
                                Custos Mensais
                            </h3>
                            <BarChartComponent data={costData} height={200} />
                        </div>

                        {/* Distribuição por Departamento */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-3 text-primary">
                                <Users className="h-5 w-5" />
                                Por Departamento
                            </h3>
                            <RadarChartComponent data={departmentData} height={200} />
                        </div>

                        {/* Tendência vs Meta */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-3 text-primary">
                                <TrendingUp className="h-5 w-5" />
                                Tendência vs Meta
                            </h3>
                            <LineChartComponent data={trendData} height={200} />
                        </div>
                    </div>

                    {/* Terceira linha - Status das Solicitações */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-primary">
                            <FileText className="h-6 w-6" />
                            Status das Solicitações
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-orange-500 rounded-full"></div>
                                    <span className="text-sm font-medium text-orange-800">Pendentes</span>
                                </div>
                                <span className="font-bold text-2xl text-orange-600">{pendingRequests}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                                    <span className="text-sm font-medium text-green-800">Aprovadas</span>
                                </div>
                                <span className="font-bold text-2xl text-green-600">{approvedRequests}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                                    <span className="text-sm font-medium text-blue-800">Em Processo</span>
                                </div>
                                <span className="font-bold text-2xl text-blue-600">{requests.filter(req => req.status === 'EM_PROCESSO').length}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Métricas Avançadas */}
                <AdvancedMetrics />

                {/* Ações Rápidas */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-bold mb-4">Ações Rápidas</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => navigate('/request-epi')}
                            className="flex items-center gap-2 p-3 bg-primary text-white rounded-lg"
                        >
                            <Package size={20} />
                            <span className="text-sm">Solicitar EPI</span>
                        </button>
                        <button
                            onClick={() => navigate('/dds')}
                            className="flex items-center gap-2 p-3 bg-blue-500 text-white rounded-lg"
                        >
                            <FileText size={20} />
                            <span className="text-sm">Criar DDS</span>
                        </button>
                        <button
                            onClick={() => navigate('/notifications')}
                            className="flex items-center gap-2 p-3 bg-orange-500 text-white rounded-lg"
                        >
                            <AlertTriangle size={20} />
                            <span className="text-sm">Notificações ({unreadNotifications})</span>
                        </button>
                        <button
                            onClick={() => navigate('/consumption')}
                            className="flex items-center gap-2 p-3 bg-green-500 text-white rounded-lg"
                        >
                            <BarChart3 size={20} />
                            <span className="text-sm">Consumo</span>
                        </button>
                    </div>
                </div>
            </div>

            <BottomNavigation />
        </div>
    );
};

export default Dashboard;
