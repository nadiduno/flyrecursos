export interface CursoInfo {
  id?: number; 
  titulo: string;
  descricao?: string; 
  dataPublicacao: string; 
  dataInicio: string;
  dataConclusao: string; 
  duracaoFormatada: string; // Ex: '2 horas e 30 minutos'
  totalAulas: number;
  totalHoras: number; // Em minutos
  modulos: Modulos[];
  autor?: {
    id: number;
    nome: string;
    email: string;
  };
}

export interface Modulos{
  id: number;
  titulo: string;
  ordem: number;
  aulas: Aula[];
}

export interface Aula {
  id: number;
  titulo: string;
  duracaoEstimada: number;
  linkConteudo: string;
  moduloId: number;
  ordem: number;
  tipo: string;
  urlCapa?: string;
}
