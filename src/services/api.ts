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
  path?: string;
  timestamp?: string;
  [key: string]: unknown;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
<<<<<<< HEAD
  timeout: 50000
=======
  timeout: 30000,
  validateStatus: (status) => status < 500 // Considera como sucesso códigos < 500
>>>>>>> 78b830c4278efd4b5434d3b91ed42fb491cb9e9b
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
): Promise<RespostaBackend<T>> => {
  try {
    const response = await request;
    
    // Tratamento adicional para respostas 4xx que passaram pelo validateStatus
    if (response.status >= 400 && response.status < 500) {
      const errorData = response.data as ErroBackend;
      const errorMessage = errorData.message || 
                         errorData.error || 
                         `Erro na requisição (${response.status})`;
      
      throw new Error(errorMessage);
    }
    
    return response;
  } catch (err) {
    const error = err as AxiosError<ErroBackend> | Error;

    // Se não for um erro do Axios
    if (!axios.isAxiosError(error)) {
      console.error('Erro não relacionado ao Axios:', error.message);
      throw error;
    }

    // Log detalhado em desenvolvimento
    if (import.meta.env.DEV) {
      console.error('Detalhes do erro:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
        headers: error.config?.headers,
        request: error.request,
        message: error.message,
        stack: error.stack
      });
    }

    // Tratamento específico para erros 500
    if (error.response?.status === 500) {
      const serverError = error.response.data;
      let errorMessage = 'Erro interno no servidor';
      
      if (serverError) {
        errorMessage = serverError.message || 
                      serverError.error || 
                      JSON.stringify(serverError);
      }
      
      throw new Error(`Erro no servidor: ${errorMessage}`);
    }

    // Tratamento para timeout
    if (error.code === 'ECONNABORTED') {
      throw new Error('Tempo de conexão esgotado. Por favor, tente novamente.');
    }

    // Tratamento para erros de rede
    if (!error.response) {
      throw new Error('Problema de conexão. Verifique sua internet e tente novamente.');
    }

    // Tratamento para outros erros HTTP
    const serverError = error.response.data;
    let errorMessage = `Erro ${error.response.status}`;
    
    if (serverError) {
      errorMessage = serverError.message || 
                    serverError.error || 
                    `Erro ${error.response.status}: ${JSON.stringify(serverError)}`;
    }
    
    throw new Error(errorMessage);
  }
};

// Métodos HTTP com tratamento de erros aprimorado
export const post = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
) => handleRequest<T>(api.post<T>(url, data, {
  ...config,
  transformRequest: [(data) => {
    console.log('Payload enviado:', data); // Log do payload
    return JSON.stringify(data);
  }]
}));

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

// Utilitário para extrair mensagens de erro consistentes
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Ocorreu um erro desconhecido';
};