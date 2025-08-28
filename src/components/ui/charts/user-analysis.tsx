"use client"

import React from 'react'
import { Users, Package, Calendar, AlertTriangle, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChartComponent } from './bar-chart'
import { PieChartComponent } from './pie-chart'

interface UserAnalysisProps {
    className?: string
}

export function UserAnalysis({ className }: UserAnalysisProps) {
    // Dados simulados para demonstração
    const userEPIData = [
        { name: 'João Silva', total: 5, pending: 1, expired: 0, status: 'active' },
        { name: 'Maria Santos', total: 4, pending: 0, expired: 1, status: 'warning' },
        { name: 'Pedro Costa', total: 6, pending: 2, expired: 0, status: 'active' },
        { name: 'Ana Oliveira', total: 3, pending: 0, expired: 0, status: 'active' },
        { name: 'Carlos Lima', total: 7, pending: 1, expired: 2, status: 'danger' }
    ]

    const epiDistributionData = [
        { name: 'Capacetes', value: 45 },
        { name: 'Luvas', value: 32 },
        { name: 'Botas', value: 28 },
        { name: 'Óculos', value: 15 },
        { name: 'Máscaras', value: 20 }
    ]

    const monthlyConsumptionData = [
        { name: 'Jan', total: 120 },
        { name: 'Fev', total: 135 },
        { name: 'Mar', total: 110 },
        { name: 'Abr', total: 145 },
        { name: 'Mai', total: 130 },
        { name: 'Jun', total: 155 }
    ]

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <Badge variant="secondary" className="bg-green-100 text-green-800">Ativo</Badge>
            case 'warning':
                return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Atenção</Badge>
            case 'danger':
                return <Badge variant="secondary" className="bg-red-100 text-red-800">Crítico</Badge>
            default:
                return <Badge variant="secondary">Desconhecido</Badge>
        }
    }

    return (
        <div className={`space-y-6 ${className}`}>
            <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Análise por Usuário</h3>
            </div>

            {/* Gráfico de Consumo Mensal */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Consumo Mensal de EPIs
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <BarChartComponent data={monthlyConsumptionData} height={250} />
                </CardContent>
            </Card>

            {/* Distribuição de EPIs por Tipo */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Distribuição de EPIs por Tipo
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <PieChartComponent data={epiDistributionData} height={250} />
                </CardContent>
            </Card>

            {/* Tabela de Usuários */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Status dos EPIs por Usuário
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2 font-medium">Usuário</th>
                                    <th className="text-center py-2 font-medium">Total EPIs</th>
                                    <th className="text-center py-2 font-medium">Pendentes</th>
                                    <th className="text-center py-2 font-medium">Vencidos</th>
                                    <th className="text-center py-2 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userEPIData.map((user, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="py-2 font-medium">{user.name}</td>
                                        <td className="text-center py-2">{user.total}</td>
                                        <td className="text-center py-2">
                                            {user.pending > 0 ? (
                                                <Badge variant="outline" className="text-orange-600 border-orange-200">
                                                    {user.pending}
                                                </Badge>
                                            ) : (
                                                <span className="text-green-600">0</span>
                                            )}
                                        </td>
                                        <td className="text-center py-2">
                                            {user.expired > 0 ? (
                                                <Badge variant="outline" className="text-red-600 border-red-200">
                                                    {user.expired}
                                                </Badge>
                                            ) : (
                                                <span className="text-green-600">0</span>
                                            )}
                                        </td>
                                        <td className="text-center py-2">
                                            {getStatusBadge(user.status)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Resumo Estatístico */}
            <div className="grid grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-600" />
                            <div>
                                <p className="text-sm text-gray-600">Usuários Ativos</p>
                                <p className="text-xl font-bold">142</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <Package className="h-5 w-5 text-green-600" />
                            <div>
                                <p className="text-sm text-gray-600">EPIs Distribuídos</p>
                                <p className="text-xl font-bold">1,247</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-orange-600" />
                            <div>
                                <p className="text-sm text-gray-600">Pendências</p>
                                <p className="text-xl font-bold">34</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
