
import React, { createContext, useContext, useState } from "react";
import { DDS, EPI, EPIRequest, EPIStatus, Notification } from "@/types";

interface DataContextType {
  epis: EPI[];
  requests: EPIRequest[];
  ddsList: DDS[];
  notifications: Notification[];
  getEpiById: (id: string) => EPI | undefined;
  getRequestById: (id: string) => EPIRequest | undefined;
  getDdsById: (id: string) => DDS | undefined;
  addEpiRequest: (request: Omit<EPIRequest, "id" | "requestDate">) => void;
  markDdsAsConfirmed: (ddsId: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
  evaluateEpi: (epiId: string, rating: number, comment: string) => void;
  returnEpi: (epiId: string) => void;
  requestNewEpi: (epiId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data for our application
const mockEpis: EPI[] = [
  {
    id: "1",
    code: "CA - 29638",
    name: "Capacete",
    description: "Capacete de segurança, classe B, tipo II, com aba frontal, injetado em polietileno de alta densidade, com carneira de polietileno de baixa densidade, com ou sem coroa de tecido em poliamida, tira absorvente de suor, ajuste da suspensão através de pino.",
    acquisitionDate: "24/01/2024",
    status: EPIStatus.INVALID,
    type: "Proteção para Cabeça",
    imageUrl: "/lovable-uploads/9e0f4bf0-4353-4b1d-a79f-d9be07048733.png"
  },
  {
    id: "2",
    code: "CA - 42374",
    name: "Botina",
    description: "Botina ocupacional com biqueira de plástico, sistema anti-torção e solado bidensidade.",
    acquisitionDate: "24/01/2024",
    status: EPIStatus.VALIDATED,
    type: "Proteção para Pés",
    imageUrl: "/lovable-uploads/7b728e08-7d5b-4f0d-af7b-7c8b36aa7a35.png"
  },
  {
    id: "3",
    code: "CA - 36527",
    name: "Protetor Facial",
    description: "Protetor facial indicado para atividades como: lixamento, esmerilhamento, desbaste, trabalhos com rebarbas.",
    acquisitionDate: "24/01/2024",
    status: EPIStatus.RETURN,
    type: "Proteção para Face",
    imageUrl: "/lovable-uploads/dfff6664-12ed-4d87-b8c2-a54ae469e720.png"
  },
  {
    id: "4",
    code: "CA - 8083",
    name: "Luva",
    description: "Luva Anticorte de Polietileno Alta Densidade com Banho de PU Dylfex, resistência abrasão, respingos de produtos químicos, óleos e graxas.",
    acquisitionDate: "24/01/2024",
    status: EPIStatus.VALIDATED,
    type: "Proteção para Mãos",
    imageUrl: "/lovable-uploads/bota.png"
  }
];

const mockRequests: EPIRequest[] = [
  {
    id: "1",
    userId: "12345",
    userName: "Ricardo Paixão",
    epiId: "1",
    epiName: "Capacete",
    epiCode: "CA - 29638",
    requestDate: "24/01/2024",
    status: "PENDENTE" as any,
    reason: "Substituição por desgaste"
  },
  {
    id: "2",
    userId: "12345",
    userName: "Ricardo Paixão",
    epiId: "2",
    epiName: "Botina",
    epiCode: "CA - 42374",
    requestDate: "24/01/2024",
    deliveryDate: "24/01/2024",
    status: "ENTREGUE" as any,
    responsibleId: "12345678",
    reason: "Nova contratação"
  }
];

const mockDds: DDS[] = [
  {
    id: "1",
    code: "8343026",
    title: "Diálogo de Segurança",
    description: "Você já parou para pensar no quanto todos nós perderíamos no caso de um incêndio grave? Se nossas instalações fossem danificadas o prejuízo da Instituição seria muito grande, sem contar com possíveis acidentes graves. Dependendo do incêndio as perdas são irreparáveis. Então temos que ter consciência do que isto significa e procurar ter alguns cuidados, pois o incêndio",
    date: "24/01/2024",
    status: "PENDENTE" as any,
    theme: "Proteção contra incêndios e sinistro"
  },
  {
    id: "2",
    code: "8343025",
    title: "Diálogo de Segurança",
    description: "A importância do uso correto de EPIs na indústria",
    date: "22/01/2024",
    status: "CONFIRMADO" as any,
    theme: "Uso de EPIs"
  },
  {
    id: "3",
    code: "8343024",
    title: "Diálogo de Segurança",
    description: "Procedimentos em caso de acidentes na linha de produção",
    date: "20/01/2024",
    status: "CONFIRMADO" as any,
    theme: "Primeiros Socorros"
  }
];

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "DDS" as any,
    title: "DDS Pendente",
    message: "Você tem um Diálogo de Segurança pendente para confirmação",
    date: "24/01/2024",
    read: false,
    relatedId: "1",
    relatedType: "DDS"
  },
  {
    id: "2",
    type: "EPI_EVALUATION" as any,
    title: "Avaliar EPI",
    message: "Por favor avalie o Capacete (CA - 29638) que você está utilizando",
    date: "24/01/2024",
    read: false,
    relatedId: "1",
    relatedType: "EPI"
  },
  {
    id: "3",
    type: "EPI_REQUEST" as any,
    title: "EPI Disponível",
    message: "Sua Botina (CA - 42374) está disponível para retirada",
    date: "24/01/2024",
    read: true,
    relatedId: "2",
    relatedType: "EPI"
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [epis, setEpis] = useState<EPI[]>(mockEpis);
  const [requests, setRequests] = useState<EPIRequest[]>(mockRequests);
  const [ddsList, setDdsList] = useState<DDS[]>(mockDds);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const getEpiById = (id: string): EPI | undefined => {
    return epis.find(epi => epi.id === id);
  };

  const getRequestById = (id: string): EPIRequest | undefined => {
    return requests.find(request => request.id === id);
  };

  const getDdsById = (id: string): DDS | undefined => {
    return ddsList.find(dds => dds.id === id);
  };

  const addEpiRequest = (request: Omit<EPIRequest, "id" | "requestDate">): void => {
    const newRequest: EPIRequest = {
      ...request,
      id: `${requests.length + 1}`,
      requestDate: new Date().toLocaleDateString("pt-BR")
    };

    setRequests([...requests, newRequest]);

    // Add a notification for the new request
    const newNotification: Notification = {
      id: `${notifications.length + 1}`,
      type: "EPI_REQUEST" as any,
      title: "Nova Solicitação de EPI",
      message: `Nova solicitação de ${request.epiName} (${request.epiCode})`,
      date: new Date().toLocaleDateString("pt-BR"),
      read: false,
      relatedId: newRequest.id,
      relatedType: "REQUEST"
    };

    setNotifications([newNotification, ...notifications]);
  };

  const markDdsAsConfirmed = (ddsId: string): void => {
    const updatedDds = ddsList.map(dds =>
      dds.id === ddsId ? { ...dds, status: "CONFIRMADO" as any } : dds
    );
    setDdsList(updatedDds);

    // Update notification if exists
    const updatedNotifications = notifications.map(notification =>
      notification.relatedId === ddsId && notification.relatedType === "DDS"
        ? { ...notification, read: true }
        : notification
    );
    setNotifications(updatedNotifications);
  };

  const markNotificationAsRead = (notificationId: string): void => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  const evaluateEpi = (epiId: string, rating: number, comment: string): void => {
    // In a real app, this would send the evaluation to an API
    console.log(`EPI ${epiId} evaluated with rating ${rating} and comment: ${comment}`);

    // Update EPI status
    const updatedEpis = epis.map(epi =>
      epi.id === epiId ? { ...epi, status: EPIStatus.VALIDATED } : epi
    );
    setEpis(updatedEpis);

    // Update notification if exists
    const updatedNotifications = notifications.map(notification =>
      notification.relatedId === epiId && notification.type === "EPI_EVALUATION"
        ? { ...notification, read: true }
        : notification
    );
    setNotifications(updatedNotifications);
  };

  const returnEpi = (epiId: string): void => {
    // Mark the EPI as returned
    const updatedEpis = epis.map(epi =>
      epi.id === epiId ? { ...epi, status: EPIStatus.RETURN } : epi
    );
    setEpis(updatedEpis);
  };

  const requestNewEpi = (epiId: string): void => {
    // Find the EPI
    const epi = epis.find(item => item.id === epiId);

    if (epi) {
      const newRequest: EPIRequest = {
        id: `${requests.length + 1}`,
        userId: "12345", // Assuming current user
        userName: "Ricardo Paixão", // Assuming current user
        epiId: epi.id,
        epiName: epi.name,
        epiCode: epi.code,
        requestDate: new Date().toLocaleDateString("pt-BR"),
        status: "PENDENTE" as any,
        reason: "Nova solicitação"
      };

      setRequests([...requests, newRequest]);
    }
  };

  return (
    <DataContext.Provider
      value={{
        epis,
        requests,
        ddsList,
        notifications,
        getEpiById,
        getRequestById,
        getDdsById,
        addEpiRequest,
        markDdsAsConfirmed,
        markNotificationAsRead,
        evaluateEpi,
        returnEpi,
        requestNewEpi
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
