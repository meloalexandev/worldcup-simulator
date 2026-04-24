/**
 * Hook customizado para gerenciar equipes
 * Busca via tRPC proxy backend para resolver CORS
 */

import { useEffect, useState } from 'react';
import { convertApiTeamsToTeams } from '@/lib/worldcup';
import { Team } from '@/lib/types';
import { trpc } from '@/lib/trpc';

interface UseTeamsReturn {
  teams: Team[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useTeams = (): UseTeamsReturn => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [localError, setLocalError] = useState<string | null>(null);

  // Usar tRPC para buscar equipes via proxy backend
  const { data: apiTeams, isLoading, error: trpcError, refetch } = trpc.worldcup.getTeams.useQuery();

  useEffect(() => {
    if (apiTeams && Array.isArray(apiTeams)) {
      try {
        const convertedTeams = convertApiTeamsToTeams(apiTeams);
        setTeams(convertedTeams);
        setLocalError(null);
      } catch (err) {
        console.error('Erro ao converter equipes:', err);
        setLocalError('Erro ao processar dados das equipes.');
      }
    }
  }, [apiTeams]);

  useEffect(() => {
    if (trpcError) {
      console.error('Erro ao buscar equipes:', trpcError);
      setLocalError('Falha ao carregar as equipes. Tente novamente.');
    }
  }, [trpcError]);

  const handleRefetch = async () => {
    await refetch();
  };

  return {
    teams,
    loading: isLoading,
    error: localError || (trpcError ? 'Falha ao carregar as equipes. Tente novamente.' : null),
    refetch: handleRefetch,
  };
};
