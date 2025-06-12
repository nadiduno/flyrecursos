import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuestas para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Erro detalhado:', {status: error.response.status, data: error.response.data, headers: error.response.headers});
      
      if (error.response.status === 401) {
        console.error('Token inválido/expirado');
        localStorage.removeItem('accessToken');
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

//Métodos para as requisições

export const post = async (url: string, data?: any, config?: any) => {
  try {
    const response = await api.post(url, data, config);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const get = async (url: string, config?: any) => {
    try {
        const response = await api.get(url, config);
        return response;
    } catch (error: any) {
        throw error;
    }
};

export const put = async (url: string, data?: any, config?: any) => {
  try {
    const response = await api.put(url, data, config);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const del = async (url: string, config?: any) => {
  try {
    const response = await api.delete(url, config);
    return response;
  } catch (error: any) {
    throw error;
  }
};


