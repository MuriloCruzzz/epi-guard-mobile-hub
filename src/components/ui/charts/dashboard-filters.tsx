"use client"

import React, { useState } from 'react'
import { Calendar, Filter, TrendingUp, Users, Package, ChevronDown } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface DashboardFiltersProps {
    onFilterChange: (filters: DashboardFilters) => void
    className?: string
}

export interface DashboardFilters {
    period: string
    department: string
    epiType: string
    group: string
    dateRange: {
        start: Date
        end: Date
    }
}

const PERIODS = [
    { value: '7d', label: 'Últimos 7 dias' },
    { value: '30d', label: 'Últimos 30 dias' },
    { value: '90d', label: 'Últimos 90 dias' },
    { value: '1y', label: 'Último ano' },
    { value: 'custom', label: 'Personalizado' }
]

const DEPARTMENTS = [
    { value: 'all', label: 'Todos os Departamentos' },
    { value: 'production', label: 'Produção' },
    { value: 'maintenance', label: 'Manutenção' },
    { value: 'quality', label: 'Qualidade' },
    { value: 'safety', label: 'Segurança' }
]

const EPI_TYPES = [
    { value: 'all', label: 'Todos os EPIs' },
    { value: 'helmet', label: 'Capacetes' },
    { value: 'gloves', label: 'Luvas' },
    { value: 'boots', label: 'Botas' },
    { value: 'glasses', label: 'Óculos' },
    { value: 'masks', label: 'Máscaras' }
]

export function DashboardFilters({ onFilterChange, className }: DashboardFiltersProps) {
    const [filters, setFilters] = useState<DashboardFilters>({
        period: '30d',
        department: 'all',
        epiType: 'all',
        group: 'all',
        dateRange: {
            start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            end: new Date()
        }
    })

    const [isExpanded, setIsExpanded] = useState(false);

    const handleFilterChange = (key: keyof DashboardFilters, value: any) => {
        const newFilters = { ...filters, [key]: value }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    const resetFilters = () => {
        const defaultFilters: DashboardFilters = {
            period: '30d',
            department: 'all',
            epiType: 'all',
            group: 'all',
            dateRange: {
                start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                end: new Date()
            }
        }
        setFilters(defaultFilters)
        onFilterChange(defaultFilters)
    }

    const getActiveFiltersCount = () => {
        let count = 0;
        if (filters.period !== '30d') count++;
        if (filters.department !== 'all') count++;
        if (filters.epiType !== 'all') count++;
        if (filters.group !== 'all') count++;
        return count;
    };

    return (
        <div className={`bg-white rounded-lg shadow ${className}`}>
            {/* Header colapsável */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg"
            >
                <div className="flex items-center gap-3">
                    <Filter className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Filtros do Dashboard</h3>
                    {getActiveFiltersCount() > 0 && (
                        <Badge variant="secondary" className="bg-primary text-white">
                            {getActiveFiltersCount()}
                        </Badge>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-sm">
                        {filters.period !== 'custom' ? PERIODS.find(p => p.value === filters.period)?.label : 'Período Personalizado'}
                    </Badge>
                    <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>
                </div>
            </button>

            {/* Conteúdo colapsável */}
            {isExpanded && (
                <div className="px-4 pb-4 space-y-4 border-t">
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Período</label>
                            <Select value={filters.period} onValueChange={(value) => handleFilterChange('period', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o período" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PERIODS.map((period) => (
                                        <SelectItem key={period.value} value={period.value}>
                                            {period.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Departamento</label>
                            <Select value={filters.department} onValueChange={(value) => handleFilterChange('department', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o departamento" />
                                </SelectTrigger>
                                <SelectContent>
                                    {DEPARTMENTS.map((dept) => (
                                        <SelectItem key={dept.value} value={dept.value}>
                                            {dept.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Tipo de EPI</label>
                            <Select value={filters.epiType} onValueChange={(value) => handleFilterChange('epiType', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o tipo de EPI" />
                                </SelectTrigger>
                                <SelectContent>
                                    {EPI_TYPES.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Grupo</label>
                            <Select value={filters.group} onValueChange={(value) => handleFilterChange('group', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o grupo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos os Grupos</SelectItem>
                                    <SelectItem value="group1">Grupo 1</SelectItem>
                                    <SelectItem value="group2">Grupo 2</SelectItem>
                                    <SelectItem value="group3">Grupo 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <Button onClick={resetFilters} variant="outline" size="sm">
                            Limpar Filtros
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
