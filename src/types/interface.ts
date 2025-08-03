export interface CursoInfo {
  id?:number;
  titulo: string;
  descricao: string;
  horasTotales: number;
  modulos: Modulos[]
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
