"use client"

import React from 'react'
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Package, Users, DollarSign } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MetricCardProps {
    title: string
    value: string | number
    change?: number
    changeType?: 'increase' | 'decrease' | 'neutral'
    icon: React.ReactNode
    status?: 'success' | 'warning' | 'danger' | 'info'
    className?: string
}

function MetricCard({ title, value, change, changeType, icon, status, className }: MetricCardProps) {
      const getStatusColor = () => {
    switch (status) {
      case 'success': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'danger': return 'text-red-600'
      case 'info': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  const getCardBorderColor = () => {
    switch (status) {
      case 'success': return 'border-l-4 border-l-green-500'
      case 'warning': return 'border-l-4 border-l-yellow-500'
      case 'danger': return 'border-l-4 border-l-red-500'
      case 'info': return 'border-l-4 border-l-blue-500'
      default: return ''
    }
  }

    const getChangeIcon = () => {
        if (changeType === 'increase') return <TrendingUp className="h-4 w-4 text-green-500" />
        if (changeType === 'decrease') return <TrendingDown className="h-4 w-4 text-red-500" />
        return null
    }

        return (
      <Card className={`${className} ${getCardBorderColor()}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
          <div className={getStatusColor()}>
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {change !== undefined && (
            <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
              {getChangeIcon()}
              <span className={changeType === 'increase' ? 'text-green-500' : changeType === 'decrease' ? 'text-red-500' : 'text-gray-500'}>
                {change > 0 ? '+' : ''}{change}%
              </span>
              <span>vs. período anterior</span>
            </div>
          )}
        </CardContent>
      </Card>
    )
}

interface AdvancedMetricsProps {
    className?: string
}

export function AdvancedMetrics({ className }: AdvancedMetricsProps) {
      const metrics = [
    {
      title: "Total de EPIs Distribuídos",
      value: "1,247",
      change: 12.5,
      changeType: "increase" as const,
      icon: <Package className="h-4 w-4" />,
      status: "success" as const
    },
    {
      title: "EPIs Próximos do Vencimento",
      value: "23",
      change: -8.2,
      changeType: "decrease" as const,
      icon: <Clock className="h-4 w-4" />,
      status: "warning" as const
    },
    {
      title: "EPIs Vencidos em Uso",
      value: "7",
      change: 15.3,
      changeType: "increase" as const,
      icon: <AlertTriangle className="h-4 w-4" />,
      status: "danger" as const
    },
    {
      title: "EPIs em Falta no Estoque",
      value: "12",
      change: -5.1,
      changeType: "decrease" as const,
      icon: <Package className="h-4 w-4" />,
      status: "warning" as const
    },
    {
      title: "Solicitações Pendentes",
      value: "34",
      change: 22.1,
      changeType: "increase" as const,
      icon: <Clock className="h-4 w-4" />,
      status: "danger" as const
    },
    {
      title: "Custo Total EPIs",
      value: "R$ 45.2k",
      change: 8.7,
      changeType: "increase" as const,
      icon: <DollarSign className="h-4 w-4" />,
      status: "warning" as const
    }
  ]

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Métricas de Performance (KPIs)</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {metrics.map((metric, index) => (
                    <MetricCard
                        key={index}
                        title={metric.title}
                        value={metric.value}
                        change={metric.change}
                        changeType={metric.changeType}
                        icon={metric.icon}
                        status={metric.status}
                    />
                ))}
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Conformidade Geral</span>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    94.2%
                </Badge>
            </div>
        </div>
    )
}
