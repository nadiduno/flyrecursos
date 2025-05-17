import axios from 'axios';

const backendUrl = "https://flyeducation-backend-local-repo-deploy.onrender.com";

export const api = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
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


