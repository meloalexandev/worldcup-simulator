/**
 * Lógica de Negócio da Copa do Mundo
 * Funções para simular grupos, partidas, pontuação e eliminatórias
 */

import {
  Team,
  Match,
  Group,
  KnockoutStage,
  ApiTeam,
} from './types';
import {
  GROUPS,
  TEAMS_PER_GROUP,
  POINTS,
  SIMULATION_CONFIG,
  TIEBREAKER_CRITERIA,
  ROUNDS,
} from './constants';

/**
 * Converte equipes da API para o formato interno
 */
export const convertApiTeamsToTeams = (apiTeams: ApiTeam[]): Team[] => {
  return apiTeams.map((team) => ({
    id: team.id,
    name: team.name,
    country: team.country,
    points: 0,
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
  }));
};

/**
 * Cria grupos aleatórios com as equipes
 * Embaralha as equipes e distribui em 8 grupos de 4
 */
export const createGroups = (teams: Team[]): Group[] => {
  const shuffled = [...teams].sort(() => Math.random() - 0.5);
  const groups: Group[] = [];

  for (let i = 0; i < GROUPS.length; i++) {
    const groupTeams = shuffled.slice(
      i * TEAMS_PER_GROUP,
      (i + 1) * TEAMS_PER_GROUP
    );

    // Atribuir grupo a cada equipe
    groupTeams.forEach((team) => {
      team.group = GROUPS[i];
    });

    groups.push({
      name: GROUPS[i],
      teams: groupTeams,
      matches: [],
    });
  }

  return groups;
};

/**
 * Gera número aleatório de gols entre min e max
 */
const getRandomGoals = (): number => {
  return Math.floor(
    Math.random() * (SIMULATION_CONFIG.MAX_GOALS - SIMULATION_CONFIG.MIN_GOALS + 1) +
      SIMULATION_CONFIG.MIN_GOALS
  );
};

/**
 * Simula uma partida entre duas equipes
 */
export const simulateMatch = (homeTeam: Team, awayTeam: Team): Match => {
  const homeGoals = getRandomGoals();
  const awayGoals = getRandomGoals();

  const match: Match = {
    id: `${homeTeam.id}-${awayTeam.id}-${Date.now()}`,
    homeTeam,
    awayTeam,
    homeGoals,
    awayGoals,
    status: 'completed',
    round: ROUNDS.GROUP,
    date: new Date(),
  };

  // Atualizar estatísticas das equipes
  updateTeamStats(homeTeam, awayTeam, homeGoals, awayGoals);

  return match;
};

/**
 * Atualiza as estatísticas das equipes após uma partida
 */
export const updateTeamStats = (
  homeTeam: Team,
  awayTeam: Team,
  homeGoals: number,
  awayGoals: number
): void => {
  // Atualizar jogos
  homeTeam.played++;
  awayTeam.played++;

  // Atualizar gols
  homeTeam.goalsFor += homeGoals;
  homeTeam.goalsAgainst += awayGoals;
  awayTeam.goalsFor += awayGoals;
  awayTeam.goalsAgainst += homeGoals;

  // Calcular saldo de gols
  homeTeam.goalDifference = homeTeam.goalsFor - homeTeam.goalsAgainst;
  awayTeam.goalDifference = awayTeam.goalsFor - awayTeam.goalsAgainst;

  // Determinar resultado e atualizar pontos
  if (homeGoals > awayGoals) {
    // Vitória do time da casa
    homeTeam.wins++;
    homeTeam.points += POINTS.WIN;
    awayTeam.losses++;
  } else if (awayGoals > homeGoals) {
    // Vitória do time visitante
    awayTeam.wins++;
    awayTeam.points += POINTS.WIN;
    homeTeam.losses++;
  } else {
    // Empate
    homeTeam.draws++;
    homeTeam.points += POINTS.DRAW;
    awayTeam.draws++;
    awayTeam.points += POINTS.DRAW;
  }
};

/**
 * Simula todas as partidas de um grupo
 * Cada grupo tem 3 rodadas com 2 partidas por rodada (round-robin)
 * Total: 6 partidas por grupo (cada equipe joga 3 vezes)
 */
export const simulateGroupMatches = (group: Group): Match[] => {
  const matches: Match[] = [];
  const teams = [...group.teams];

  // Gerar todas as combinações de partidas (round-robin)
  // Cada par de equipes joga uma vez (não há volta)
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const match = simulateMatch(teams[i], teams[j]);
      matches.push(match);
    }
  }

  group.matches = matches;
  return matches;
}

/**
 * Classifica as equipes de um grupo segundo os critérios de desempate
 */
const classifyGroupTeams = (teams: Team[]): Team[] => {
  return teams.sort((a, b) => {
    // Aplicar critérios de desempate em ordem
    for (const criteria of TIEBREAKER_CRITERIA) {
      let comparison = 0;

      switch (criteria) {
        case 'points':
          comparison = b.points - a.points;
          break;
        case 'goalDifference':
          comparison = b.goalDifference - a.goalDifference;
          break;
        case 'goalsFor':
          comparison = b.goalsFor - a.goalsFor;
          break;
        case 'random':
          comparison = Math.random() - 0.5;
          break;
      }

      if (comparison !== 0) {
        return comparison;
      }
    }

    return 0;
  });
};

/**
 * Classifica os 2 primeiros de cada grupo para as oitavas
 */
export const classifyTeamsForKnockout = (groups: Group[]): Team[] => {
  const qualified: Team[] = [];

  groups.forEach((group) => {
    const classified = classifyGroupTeams(group.teams);
    qualified.push(classified[0]);
    qualified.push(classified[1]);

    // Atualizar posição
    classified.forEach((team, index) => {
      team.position = index + 1;
    });
  });

  return qualified;
};

/**
 * Simula partida de eliminatória com possibilidade de pênaltis
 */
export const simulateKnockoutMatch = (
  homeTeam: Team,
  awayTeam: Team,
  round: string
): Match => {
  let homeGoals = getRandomGoals();
  let awayGoals = getRandomGoals();
  let status: 'completed' | 'penalties' = 'completed';
  let penaltyHomeGoals: number | undefined;
  let penaltyAwayGoals: number | undefined;

  // Se empate, simular pênaltis
  if (homeGoals === awayGoals && Math.random() < SIMULATION_CONFIG.PENALTY_PROBABILITY) {
    status = 'penalties';
    penaltyHomeGoals = Math.floor(Math.random() * 6); // 0-5 gols
    penaltyAwayGoals = Math.floor(Math.random() * 6);

    // Garantir que um time vença nos pênaltis
    while (penaltyHomeGoals === penaltyAwayGoals) {
      penaltyAwayGoals = Math.floor(Math.random() * 6);
    }
  }

  const match: Match = {
    id: `${homeTeam.id}-${awayTeam.id}-${round}-${Date.now()}`,
    homeTeam,
    awayTeam,
    homeGoals,
    awayGoals,
    status,
    round,
    date: new Date(),
    penaltyHomeGoals,
    penaltyAwayGoals,
  };

  return match;
};

/**
 * Determina o vencedor de uma partida de eliminatória
 */
export const getKnockoutWinner = (match: Match): Team => {
  if (match.status === 'penalties' && match.penaltyHomeGoals !== undefined && match.penaltyAwayGoals !== undefined) {
    return match.penaltyHomeGoals > match.penaltyAwayGoals ? match.homeTeam : match.awayTeam;
  }

  return match.homeGoals > match.awayGoals ? match.homeTeam : match.awayTeam;
};

/**
 * Simula as oitavas de final
 */
export const simulateRound16 = (qualifiedTeams: Team[]): KnockoutStage => {
  const matches: Match[] = [];

  // Parear equipes: 1º do grupo A vs 2º do grupo B, etc.
  for (let i = 0; i < qualifiedTeams.length; i += 2) {
    const match = simulateKnockoutMatch(
      qualifiedTeams[i],
      qualifiedTeams[i + 1],
      ROUNDS.ROUND_16
    );
    matches.push(match);
  }

  return {
    round: ROUNDS.ROUND_16,
    matches,
  };
};

/**
 * Simula as quartas de final
 */
export const simulateQuarterfinals = (
  round16Matches: Match[]
): KnockoutStage => {
  const winners = round16Matches.map(getKnockoutWinner);
  const matches: Match[] = [];

  for (let i = 0; i < winners.length; i += 2) {
    const match = simulateKnockoutMatch(
      winners[i],
      winners[i + 1],
      ROUNDS.QUARTERFINALS
    );
    matches.push(match);
  }

  return {
    round: ROUNDS.QUARTERFINALS,
    matches,
  };
};

/**
 * Simula as semifinais
 */
export const simulateSemifinals = (
  quarterfinalsMatches: Match[]
): KnockoutStage => {
  const winners = quarterfinalsMatches.map(getKnockoutWinner);
  const matches: Match[] = [];

  for (let i = 0; i < winners.length; i += 2) {
    const match = simulateKnockoutMatch(
      winners[i],
      winners[i + 1],
      ROUNDS.SEMIFINALS
    );
    matches.push(match);
  }

  return {
    round: ROUNDS.SEMIFINALS,
    matches,
  };
};

/**
 * Simula a final
 */
export const simulateFinal = (semifinalsMatches: Match[]): KnockoutStage => {
  const winners = semifinalsMatches.map(getKnockoutWinner);
  const match = simulateKnockoutMatch(
    winners[0],
    winners[1],
    ROUNDS.FINAL
  );

  return {
    round: ROUNDS.FINAL,
    matches: [match],
  };
};

/**
 * Obtém o campeão da Copa
 */
export const getTournamentWinner = (finalMatch: Match): Team => {
  return getKnockoutWinner(finalMatch);
};
