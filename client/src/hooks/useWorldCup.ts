/**
 * Hook customizado para gerenciar a Copa do Mundo
 * Gerencia estado da simulação, grupos, partidas e eliminatórias
 */

import { useState, useCallback } from 'react';
import {
  createGroups,
  simulateGroupMatches,
  classifyTeamsForKnockout,
  simulateRound16,
  simulateQuarterfinals,
  simulateSemifinals,
  simulateFinal,
  getTournamentWinner,
} from '@/lib/worldcup';
import { Team, Group, Match, Tournament } from '@/lib/types';
import { PHASES } from '@/lib/constants';
import { trpc } from '@/lib/trpc';

interface UseWorldCupReturn {
  tournament: Tournament | null;
  currentPhase: string;
  isSimulating: boolean;
  error: string | null;
  startTournament: (teams: Team[]) => void;
  simulateGroups: () => void;
  simulateKnockout: () => void;
  submitWinner: () => Promise<void>;
  reset: () => void;
}

export const useWorldCup = (): UseWorldCupReturn => {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [currentPhase, setCurrentPhase] = useState<string>(PHASES.GROUPS);
  const [isSimulating, setIsSimulating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Usar tRPC para enviar resultado final
  const submitFinalResultMutation = trpc.worldcup.submitFinalResult.useMutation();

  const startTournament = useCallback((teams: Team[]) => {
    try {
      setError(null);
      const groups = createGroups(teams);
      const newTournament: Tournament = {
        groups,
        knockout: {
          quarterfinals: { round: 'quarterfinals', matches: [] },
          semifinals: { round: 'semifinals', matches: [] },
          final: { round: 'final', matches: [] },
        },
        winner: undefined,
      };
      setTournament(newTournament);
      setCurrentPhase(PHASES.GROUPS);
    } catch (err) {
      console.error('Erro ao iniciar torneio:', err);
      setError('Erro ao iniciar o torneio. Tente novamente.');
    }
  }, []);

  const simulateGroups = useCallback(() => {
    if (!tournament) return;

    try {
      setError(null);
      setIsSimulating(true);

      // Simular partidas de todos os grupos
      const updatedGroups = tournament.groups.map((group) => ({
        ...group,
        matches: simulateGroupMatches(group),
      }));

      // Atualizar torneio
      const updatedTournament: Tournament = {
        ...tournament,
        groups: updatedGroups,
      };

      setTournament(updatedTournament);
      setCurrentPhase(PHASES.KNOCKOUT);
    } catch (err) {
      console.error('Erro ao simular grupos:', err);
      setError('Erro ao simular grupos. Tente novamente.');
    } finally {
      setIsSimulating(false);
    }
  }, [tournament]);

  const simulateKnockout = useCallback(() => {
    if (!tournament) return;

    try {
      setError(null);
      setIsSimulating(true);

      // Classificar equipes para oitavas
      const qualifiedTeams = classifyTeamsForKnockout(tournament.groups);

      // Simular oitavas
      const round16 = simulateRound16(qualifiedTeams);

      // Simular quartas
      const quarterfinals = simulateQuarterfinals(round16.matches);

      // Simular semifinais
      const semifinals = simulateSemifinals(quarterfinals.matches);

      // Simular final
      const final = simulateFinal(semifinals.matches);

      // Atualizar torneio
      const updatedTournament: Tournament = {
        ...tournament,
        knockout: {
          quarterfinals: { ...quarterfinals, round: 'quarterfinals' },
          semifinals: { ...semifinals, round: 'semifinals' },
          final: { ...final, round: 'final' },
        },
        winner: getTournamentWinner(final.matches[0]),
      };

      setTournament(updatedTournament);
    } catch (err) {
      console.error('Erro ao simular eliminatórias:', err);
      setError('Erro ao simular eliminatórias. Tente novamente.');
    } finally {
      setIsSimulating(false);
    }
  }, [tournament]);

  const submitWinner = useCallback(async () => {
    if (!tournament || !tournament.winner) {
      setError('Nenhum campeão para enviar.');
      return;
    }

    try {
      setError(null);
      setIsSimulating(true);

      // Obter a final
      const finalMatch = tournament.knockout.final.matches[0];

      // Preparar payload para tRPC
      const payload = {
        finalTeam: {
          id: tournament.winner.id,
          name: tournament.winner.name,
          country: tournament.winner.country,
        },
        runnerUp: {
          id: tournament.winner.id === finalMatch.homeTeam.id
            ? finalMatch.awayTeam.id
            : finalMatch.homeTeam.id,
          name: tournament.winner.id === finalMatch.homeTeam.id
            ? finalMatch.awayTeam.name
            : finalMatch.homeTeam.name,
          country: tournament.winner.id === finalMatch.homeTeam.id
            ? finalMatch.awayTeam.country
            : finalMatch.homeTeam.country,
        },
      };

      // Enviar para API via tRPC
      await submitFinalResultMutation.mutateAsync(payload);
      setError(null);
    } catch (err) {
      console.error('Erro ao enviar resultado final:', err);
      setError('Erro ao enviar resultado final. Tente novamente.');
    } finally {
      setIsSimulating(false);
    }
  }, [tournament, submitFinalResultMutation]);

  const reset = useCallback(() => {
    setTournament(null);
    setCurrentPhase(PHASES.GROUPS);
    setIsSimulating(false);
    setError(null);
  }, []);

  return {
    tournament,
    currentPhase,
    isSimulating,
    error,
    startTournament,
    simulateGroups,
    simulateKnockout,
    submitWinner,
    reset,
  };
};
