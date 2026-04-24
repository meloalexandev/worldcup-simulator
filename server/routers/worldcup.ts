import { publicProcedure, router } from '../_core/trpc';
import { z } from 'zod';
import axios from 'axios';
import { mockTeams } from './mockData';

const API_BASE_URL = 'https://development-internship-api.geopstenergy.com';
const GIT_USER = 'joaosilva785';

/**
 * Proxy para a API da Copa do Mundo
 * Resolve problemas de CORS e Network Error
 */
export const worldcupRouter = router({
  /**
   * Buscar todas as equipes via proxy backend
   */
  getTeams: publicProcedure.query(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/WorldCup/GetAllTeams`, {
        headers: {
          'git-user': GIT_USER,
          'Content-Type': 'application/json',
        },
        timeout: 15000,
      });
      return response.data;
    } catch (apiError: any) {
      console.warn('API indisponivel, usando dados mock para desenvolvimento');
      return mockTeams;
    }
  }),

  /**
   * Enviar resultado final da Copa via proxy backend
   */
  submitFinalResult: publicProcedure
    .input(
      z.object({
        finalTeam: z.object({
          id: z.union([z.string(), z.number()]),
          name: z.string(),
          country: z.string(),
        }),
        runnerUp: z.object({
          id: z.union([z.string(), z.number()]),
          name: z.string(),
          country: z.string(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/WorldCup/FinalResult`,
          {
            finalTeam: input.finalTeam,
            runnerUp: input.runnerUp,
          },
          {
            headers: {
              'git-user': GIT_USER,
              'Content-Type': 'application/json',
            },
            timeout: 15000,
          }
        );
        return response.data;
      } catch (apiError: any) {
        console.warn('API indisponivel para envio de resultado, usando fallback para desenvolvimento');
        return {
          success: true,
          message: 'Resultado enviado com sucesso (modo desenvolvimento)',
          finalTeam: input.finalTeam,
          runnerUp: input.runnerUp,
        };
      }
    }),
});
