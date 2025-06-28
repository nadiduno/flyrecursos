import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

type RespostaBackend<T> = AxiosResponse<T>;

interface ErroBackend {
  error?: string;
  message?: string;
  [key: string]: unknown;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
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
      console.error('❌ Erro de requisição:', {
        url: error.config?.url ?? 'URL desconhecida',
        status: error.response?.status ?? 'sem status',
        data: error.response?.data,
        message: error.message,
        isTimeout: error.code === 'ECONNABORTED'
      });
    }
    if (error.code === 'ECONNABORTED') {
        throw new Error('Tempo limite excedido ao conectar com o servidor. Por favor, tente novamente.');
    }

    throw error; 
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

export const del = <T = unknown>(
  url: string,
  config?: AxiosRequestConfig
) => handleRequest<T>(api.delete<T>(url, config));