import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

type RespostaBackend<T> = AxiosResponse<T>;

interface ErroBackend {
  error?: string;
  message?: string;
  status?: number;
  codigoErro?: string;
  [key: string]: unknown;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 50000
});

api.interceptors.request.use(
  (config) => {
    if (
      config.url?.includes("firebasestorage.googleapis.com") ||
      config.baseURL?.includes("firebasestorage.googleapis.com")
    ) {
      return config; 
    }

    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErroBackend>) => {
    if (error.response?.status === 401) {
      console.warn('Token expirado ou inválido');
      localStorage.removeItem('accessToken');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const handleRequest = async <T>(
  request: Promise<RespostaBackend<T>>
):  Promise<RespostaBackend<T>> => {
  try {
    const response = await request;
    return response;
  } catch (err) {
    const error = err as AxiosError<ErroBackend>;

    if (import.meta.env.DEV) {
       console.error('Erro de requisição:', {
        url: error.config?.url ?? 'URL desconhecida',
        method: error.config?.method ?? 'Método desconhecido',
        status: error.response?.status ?? 'sem status',
        data: error.response?.data,
        message: error.message,
        isTimeout: error.code === 'ECONNABORTED',
        stack: error.stack
      });
    }
    
    // Tratamento para erros 500
    if (error.response?.status === 500) {
      const serverMessage = error.response.data?.message || 'Erro interno no servidor';
      throw new Error(`Servidor indisponível: ${serverMessage}`);
    }

    // Tratamento para erros 4xx 
    if (error.response?.status && error.response.status >= 400 && error.response.status < 500) {
      const serverMessage = error.response.data?.message || 'Requisição inválida';
      throw new Error(`Erro na requisição: ${serverMessage} (${error.response.status})`);
    }

    // Tratamento para timeout
    if (error.code === 'ECONNABORTED') {
      throw new Error('Tempo limite excedido ao conectar com o servidor. Por favor, tente novamente.');
    }

    // Para outros erros
    throw new Error(`Erro na comunicação com o servidor: ${error.message}`);
  }
};

export const post = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
) => handleRequest<T>(api.post<T>(url, data, config));

export const get = <T = unknown>(
  url: string,
  config?: AxiosRequestConfig
) => handleRequest<T>(api.get<T>(url, config));

export const put = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
) => handleRequest<T>(api.put<T>(url, data, config));

export const patch = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
) => handleRequest<T>(api.patch<T>(url, data, config));

export const del = <T = unknown>(
  url: string,
  config?: AxiosRequestConfig
) => handleRequest<T>(api.delete<T>(url, config));