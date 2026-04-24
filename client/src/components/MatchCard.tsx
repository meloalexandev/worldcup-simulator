/**
 * Componente MatchCard
 * Card individual de partida com placar e equipes
 * Design: Elegante com efeitos de sombra e hover
 */

import { Match } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MatchCardProps {
  match: Match;
  compact?: boolean;
}

export default function MatchCard({ match, compact = false }: MatchCardProps) {
  const isPenalties = match.status === 'penalties';
  const isCompleted = match.status === 'completed' || match.status === 'penalties';

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        {/* Rodada */}
        <div className="mb-3 flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {match.round}
          </Badge>
          {isCompleted && (
            <Badge className="bg-green-600 hover:bg-green-700">
              Finalizado
            </Badge>
          )}
        </div>

        {/* Partida */}
        <div className="flex items-center justify-between gap-2">
          {/* Time da Casa */}
          <div className="flex-1 text-right">
            <p className={`font-semibold truncate ${compact ? 'text-sm' : 'text-base'}`}>
              {match.homeTeam.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {match.homeTeam.country}
            </p>
          </div>

          {/* Placar */}
          <div className="flex flex-col items-center gap-1">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg px-4 py-2 min-w-20 text-center">
              <p className="text-2xl font-bold text-white font-poppins">
                {match.homeGoals} - {match.awayGoals}
              </p>
            </div>
            {isPenalties && match.penaltyHomeGoals !== undefined && (
              <p className="text-xs text-amber-600 font-semibold">
                P: {match.penaltyHomeGoals} - {match.penaltyAwayGoals}
              </p>
            )}
          </div>

          {/* Time Visitante */}
          <div className="flex-1 text-left">
            <p className={`font-semibold truncate ${compact ? 'text-sm' : 'text-base'}`}>
              {match.awayTeam.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {match.awayTeam.country}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
