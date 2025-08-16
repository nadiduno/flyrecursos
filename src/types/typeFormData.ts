export type FormData = {
  id?: number;
  nome: string;
  email: string;
  cpf: string;
  dataNascimento?: string;
  perfil?: string;
};

export type FormDataCourse = {
  id?: number; 
  titulo: string;
  modulosIds?: number[];
  autorId?: number; 
  dataPublicacao: string;
  dataInicio: string;
  dataConclusao: string;
  duracaoFormatada: string;
  totalAulas: number;
  totalHoras: number;
};

export type FormDataModule = {
  id?: number;
  titulo: string;
};


