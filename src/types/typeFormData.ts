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
  modulosIds?: number[];
};

export type FormDataModule = {
  id?: number;
  titulo: string;
};