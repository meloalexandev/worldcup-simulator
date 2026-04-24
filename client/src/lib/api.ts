/**
 * Configuração da API
 * Instância do Axios com interceptadores e configurações padrão
 */

import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './constants';
import { ApiTeam, FinalResultPayload } from './types';

// Criar instância do Axios
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
});

// Interceptador de requisição
api.interceptors.request.use(
  (config) => {
    // Adicionar git-user header conforme especificado
    const gitUser = localStorage.getItem('git-user') || 'joaosilva785';
    config.headers['git-user'] = gitUser;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptador de resposta
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Buscar todas as equipes da Copa
 * @returns Promise com array de equipes
 */
export const fetchAllTeams = async (): Promise<ApiTeam[]> => {
  try {
    const gitUser = localStorage.getItem('git-user') || 'joaosilva785';
    const response = await api.get<ApiTeam[]>(API_ENDPOINTS.TEAMS, {
      headers: {
        'git-user': gitUser,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar equipes:', error);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('Nenhuma resposta recebida:', error.request);
    } else {
      console.error('Erro na requisição:', error.message);
    }
    throw new Error(`Falha ao carregar equipes: ${error.message}`);
  }
};

/**
 * Enviar resultado final da Copa
 * @param payload Dados do resultado final
 * @returns Promise com resposta da API
 */
export const submitFinalResult = async (
  payload: FinalResultPayload
): Promise<any> => {
  try {
    const gitUser = localStorage.getItem('git-user') || 'joaosilva785';
    const response = await api.post(API_ENDPOINTS.FINAL_RESULT, payload, {
      headers: {
        'git-user': gitUser,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Erro ao enviar resultado final:', error);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('Nenhuma resposta recebida:', error.request);
    } else {
      console.error('Erro na requisição:', error.message);
    }
    throw new Error(`Falha ao enviar resultado: ${error.message}`);
  }
};

export default api;
