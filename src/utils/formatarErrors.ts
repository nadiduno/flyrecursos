import { AxiosError } from 'axios';

interface ErroBackend {
  error?: string;
  message?: string;
  [key: string]: unknown;
}

export const formatarMensagemErro = (erro: unknown): string => {
  const error = erro as AxiosError<ErroBackend>;
  const data = error.response?.data;

  return (
    typeof data === 'string'
      ? data
      : data?.error ||
        data?.message ||
        error.message ||
        'Erro inesperado. Tente novamente mais tarde.'
  );
};