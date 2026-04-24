/**
 * Constantes do Simulador da Copa do Mundo
 * Valores fixos utilizados em toda a aplicação
 */

// Grupos
export const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;
export const TEAMS_PER_GROUP = 4;
export const TOTAL_TEAMS = 32;

// Pontuação
export const POINTS = {
  WIN: 3,
  DRAW: 1,
  LOSS: 0,
} as const;

// Fases da Copa
export const PHASES = {
  GROUPS: 'groups',
  KNOCKOUT: 'knockout',
  FINAL: 'final',
} as const;

// Rodadas
export const ROUNDS = {
  GROUP: 'group',
  ROUND_16: 'round16',
  QUARTERFINALS: 'quarterfinals',
  SEMIFINALS: 'semifinals',
  FINAL: 'final',
} as const;

// URLs da API
export const API_BASE_URL = 'https://development-internship-api.geopstenergy.com';
export const API_ENDPOINTS = {
  TEAMS: '/WorldCup/GetAllTeams',
  FINAL_RESULT: '/WorldCup/FinalResult',
} as const;

// Configurações de simulação
export const SIMULATION_CONFIG = {
  GROUP_ROUNDS: 3,
  MATCHES_PER_ROUND: 2,
  MIN_GOALS: 0,
  MAX_GOALS: 5,
  PENALTY_PROBABILITY: 0.15, // 15% de chance de pênaltis em eliminatórias
} as const;

// Mensagens
export const MESSAGES = {
  LOADING: 'Carregando equipes...',
  ERROR: 'Erro ao carregar dados. Tente novamente.',
  SIMULATING: 'Simulando partidas...',
  SUCCESS: 'Simulação concluída com sucesso!',
  SUBMITTING: 'Enviando resultado final...',
} as const;

// Status de partida
export const MATCH_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  PENALTIES: 'penalties',
} as const;

// Critérios de desempate (ordem de importância)
export const TIEBREAKER_CRITERIA = [
  'points',
  'goalDifference',
  'goalsFor',
  'random',
] as const;

// Cores dos grupos (para UI)
export const GROUP_COLORS: Record<string, string> = {
  A: 'from-blue-500 to-blue-600',
  B: 'from-purple-500 to-purple-600',
  C: 'from-pink-500 to-pink-600',
  D: 'from-red-500 to-red-600',
  E: 'from-green-500 to-green-600',
  F: 'from-yellow-500 to-yellow-600',
  G: 'from-indigo-500 to-indigo-600',
  H: 'from-cyan-500 to-cyan-600',
} as const;
