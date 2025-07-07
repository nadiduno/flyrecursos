export type FormData = {
  id?: number;
  nome: string;
  email: string;
  cpf: string;
  dataNascimento: string;
  perfil?: string;
};

export type FormDataCourse = {
  id?: number;
  titulo: string;
  modulosIds?: number [];
  autorId?: number;
};

export type FormDataModule = {
  id?: number;
  titulo: string;
};

export type FormDataLesson = {
  id?: number;
  titulo: string;
  tipo: string; // Ex: "VIDEO", "ARTIGO", "PDF"
  duracaoEstimada: number; 
  linkConteudo: string;
  moduloId?: number; 
  ordem?: number;
  urlCapa?: string;
};
