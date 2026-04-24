/**
 * Tipos TypeScript para o Simulador da Copa do Mundo
 * Define as interfaces e tipos utilizados em toda a aplicação
 */

export interface Team {
  id: string;
  name: string;
  country: string;
  group?: string;
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  position?: number;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeGoals: number;
  awayGoals: number;
  status: 'pending' | 'completed' | 'penalties';
  round: string;
  date?: Date;
  penaltyHomeGoals?: number;
  penaltyAwayGoals?: number;
}

export interface Group {
  name: string;
  teams: Team[];
  matches: Match[];
}

export interface KnockoutStage {
  round: string;
  matches: Match[];
}

export interface Tournament {
  groups: Group[];
  knockout: {
    quarterfinals: KnockoutStage;
    semifinals: KnockoutStage;
    final: KnockoutStage;
  };
  winner?: Team;
}

export interface FinalResultPayload {
  equipaId: string;
  equipaB?: string;
  golsEquipaA: number;
  golsEquipaB: number;
  golsPenaltyLineA?: number;
  golsPenaltyLineB?: number;
}

export interface ApiTeam {
  id: string;
  name: string;
  country: string;
}

export type Phase = 'groups' | 'knockout' | 'final';
export type Round = 'group' | 'round16' | 'quarterfinals' | 'semifinals' | 'final';
