
export interface User {
  id: string;
  name: string;
  role: UserRole;
  company: string;
  companyId: string;
  position: string;
  phone: string;
  profileImage?: string;
}

export enum UserRole {
  ADMIN = "admin",
  MANAGER = "manager",
  SUPERVISOR = "supervisor",
  EMPLOYEE = "employee",
  WAREHOUSE = "warehouse"
}

export interface EPI {
  id: string;
  code: string;
  name: string;
  description: string;
  acquisitionDate: string;
  status: EPIStatus;
  type: string;
  imageUrl?: string;
}

export enum EPIStatus {
  AVAILABLE = "DISPONÍVEL",
  UNAVAILABLE = "INDISPONÍVEL",
  VALIDATED = "VÁLIDO", 
  INVALID = "INVÁLIDO",
  PENDING = "PENDENTE",
  EVALUATE = "AVALIAR",
  RETURN = "DEVOLUÇÃO"
}

export interface EPIRequest {
  id: string;
  userId: string;
  userName: string;
  epiId: string;
  epiName: string;
  epiCode: string;
  requestDate: string;
  deliveryDate?: string;
  status: RequestStatus;
  reason?: string;
  responsibleId?: string;
}

export enum RequestStatus {
  PENDING = "PENDENTE",
  APPROVED = "APROVADO",
  REJECTED = "REJEITADO",
  DELIVERED = "ENTREGUE"
}

export interface DDS {
  id: string;
  code: string;
  title: string;
  description: string;
  date: string;
  status: DDSStatus;
  theme: string;
}

export enum DDSStatus {
  PENDING = "PENDENTE",
  CONFIRMED = "CONFIRMADO"
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
  relatedId?: string;
  relatedType?: string;
}

export enum NotificationType {
  EPI_REQUEST = "EPI_REQUEST",
  DDS = "DDS",
  EPI_EXPIRY = "EPI_EXPIRY",
  EPI_EVALUATION = "EPI_EVALUATION"
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface ConsumptionItem {
  name: string;
  requestedQuantity: number;
  evaluationCount: number;
}
