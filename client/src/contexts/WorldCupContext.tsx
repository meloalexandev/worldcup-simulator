/**
 * Contexto da Copa do Mundo
 * Compartilha estado global da simulação entre componentes
 */

import React, { createContext, useContext } from 'react';
import { useWorldCup } from '@/hooks/useWorldCup';
import { Team, Tournament } from '@/lib/types';

interface WorldCupContextType {
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

const WorldCupContext = createContext<WorldCupContextType | undefined>(undefined);

export const WorldCupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const worldCup = useWorldCup();

  return (
    <WorldCupContext.Provider value={worldCup}>
      {children}
    </WorldCupContext.Provider>
  );
};

export const useWorldCupContext = (): WorldCupContextType => {
  const context = useContext(WorldCupContext);
  if (!context) {
    throw new Error('useWorldCupContext deve ser usado dentro de WorldCupProvider');
  }
  return context;
};
