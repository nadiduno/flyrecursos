import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para agregar token
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

// Interceptor de respuesta global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Erro detalhado:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });

      if (error.response.status === 401) {
        console.error('Token inválido/expirado');
        localStorage.removeItem('accessToken');
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// 👉 Centraliza el manejo de errores
const handleRequest = async (request: Promise<AxiosResponse>) => {
  try {
    return await request;
  } catch (err) {
    const error = err as AxiosError;

    const statusCode = error.response?.status ?? 'sem status';
    const url = error.config?.url ?? 'URL desconhecida';

    const fallbackError = `Erro ao acessar ${url} (status: ${statusCode})`;
    console.error('❌ Erro de requisição:', {
      url,
      status: statusCode,
      data: error.response?.data,
    });

    throw new Error(fallbackError);
  }
};

// Métodos seguros
export const post = (url: string, data?: unknown, config?: AxiosRequestConfig) =>
  handleRequest(api.post(url, data, config));

export const get = (url: string, config?: AxiosRequestConfig) =>
  handleRequest(api.get(url, config));

export const put = (url: string, data?: unknown, config?: AxiosRequestConfig) =>
  handleRequest(api.put(url, data, config));

export const del = (url: string, config?: AxiosRequestConfig) =>
  handleRequest(api.delete(url, config));