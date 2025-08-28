import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função para mapear tipos de EPI para imagens específicas
export function getEpiImageUrl(epiName: string, epiType: string, defaultImageUrl?: string): string {
  const name = epiName.toLowerCase();
  const type = epiType.toLowerCase();

  // Mapeamento baseado no nome do EPI
  if (name.includes('bota') || name.includes('botina') || type.includes('pés') || type.includes('pe')) {
    return '/lovable-uploads/bota.png';
  }

  if (name.includes('capacete') || type.includes('cabeça') || type.includes('cabeca')) {
    return '/lovable-uploads/capacete.png';
  }

  if (name.includes('protetor') && (name.includes('face') || name.includes('facial')) || type.includes('face')) {
    return '/lovable-uploads/protetor_face.png';
  }

  if (name.includes('luva') && (name.includes('luva') || name.includes('luva')) || type.includes('luva')) {
    return '/lovable-uploads/luva.png';
  }

  // Se não encontrar correspondência, retorna a imagem padrão ou uma imagem genérica
  return defaultImageUrl || '/lovable-uploads/placeholder.svg';
}
