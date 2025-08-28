import React, { useState, useEffect } from 'react';
import { Bell, HardHat, FileText, AlertCircle, ChevronUp, ChevronDown } from 'lucide-react';

interface CarouselNotification {
    id: string;
    title: string;
    message: string;
    type: 'EPI_REQUEST' | 'DDS' | 'EPI_EXPIRY' | 'EPI_EVALUATION';
    date: string;
    priority: 'high' | 'medium' | 'low';
}

const mockNotifications: CarouselNotification[] = [
    {
        id: '1',
        title: 'Novo EPI Disponível',
        message: 'Seu capacete de segurança está disponível para retirada no almoxarifado',
        type: 'EPI_REQUEST',
        date: 'Há 2 horas',
        priority: 'high'
    },
    {
        id: '2',
        title: 'DDS Pendente',
        message: 'Diálogo de Segurança sobre uso de EPIs aguarda sua confirmação',
        type: 'DDS',
        date: 'Há 4 horas',
        priority: 'medium'
    },
    {
        id: '3',
        title: 'Avaliação de EPI',
        message: 'Por favor, avalie o protetor facial que você está utilizando',
        type: 'EPI_EVALUATION',
        date: 'Há 1 dia',
        priority: 'medium'
    },
    {
        id: '4',
        title: 'EPI Vencendo',
        message: 'Sua botina de segurança vence em 30 dias. Solicite a renovação',
        type: 'EPI_EXPIRY',
        date: 'Há 2 dias',
        priority: 'low'
    },
    {
        id: '5',
        title: 'Treinamento de Segurança',
        message: 'Novo treinamento sobre uso correto de EPIs disponível',
        type: 'DDS',
        date: 'Há 3 dias',
        priority: 'medium'
    }
];

const NotificationCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === mockNotifications.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Muda a cada 3 segundos

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const getIcon = (type: CarouselNotification['type']) => {
        switch (type) {
            case "EPI_REQUEST":
                return <HardHat size={20} className="text-primary" />;
            case "DDS":
                return <FileText size={20} className="text-primary" />;
            case "EPI_EXPIRY":
                return <AlertCircle size={20} className="text-destructive" />;
            case "EPI_EVALUATION":
                return <HardHat size={20} className="text-accent" />;
            default:
                return <Bell size={20} className="text-primary" />;
        }
    };

    const getPriorityColor = (priority: CarouselNotification['priority']) => {
        switch (priority) {
            case 'high':
                return 'border-l-destructive';
            case 'medium':
                return 'border-l-warning';
            case 'low':
                return 'border-l-accent';
            default:
                return 'border-l-gray-500';
        }
    };

    const nextNotification = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === mockNotifications.length - 1 ? 0 : prevIndex + 1
        );
        setIsAutoPlaying(false);
    };

    const prevNotification = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? mockNotifications.length - 1 : prevIndex - 1
        );
        setIsAutoPlaying(false);
    };

    const currentNotification = mockNotifications[currentIndex];

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-3 bg-gray-50 border-b">
                <div className="flex items-center">
                    <Bell size={16} className="text-primary mr-2" />
                    <span className="text-sm font-medium text-gray-700">Notificações</span>
                </div>
                <div className="flex items-center space-x-1">
                    <button
                        onClick={prevNotification}
                        className="p-1 hover:bg-gray-200 rounded"
                    >
                        <ChevronUp size={16} className="text-gray-500" />
                    </button>
                    <span className="text-xs text-gray-500">
                        {currentIndex + 1}/{mockNotifications.length}
                    </span>
                    <button
                        onClick={nextNotification}
                        className="p-1 hover:bg-gray-200 rounded"
                    >
                        <ChevronDown size={16} className="text-gray-500" />
                    </button>
                </div>
            </div>

            <div className="p-4">
                <div className={`border-l-4 pl-3 ${getPriorityColor(currentNotification.priority)}`}>
                    <div className="flex items-start">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                            {getIcon(currentNotification.type)}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-800 mb-1">
                                {currentNotification.title}
                            </h4>
                            <p className="text-xs text-gray-600 mb-2">
                                {currentNotification.message}
                            </p>
                            <p className="text-xs text-gray-400">
                                {currentNotification.date}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Indicadores */}
            <div className="flex justify-center space-x-1 p-2 bg-gray-50">
                {mockNotifications.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setCurrentIndex(index);
                            setIsAutoPlaying(false);
                        }}
                        className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default NotificationCarousel; 