/**
 * Componente TournamentBracket
 * Exibe a chave de eliminatórias (oitavas, quartas, semifinal, final)
 * Design: Layout em cascata com conexões visuais
 */

import { Match } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';
import MatchCard from './MatchCard';

interface TournamentBracketProps {
  round16Matches: Match[];
  quarterfinalsMatches: Match[];
  semifinalsMatches: Match[];
  finalMatch?: Match;
  winner?: any;
}

export default function TournamentBracket({
  round16Matches,
  quarterfinalsMatches,
  semifinalsMatches,
  finalMatch,
  winner,
}: TournamentBracketProps) {
  return (
    <div className="space-y-8">
      {/* Oitavas de Final */}
      {round16Matches.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-white font-poppins mb-4">
            Oitavas de Final
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {round16Matches.map((match) => (
              <MatchCard key={match.id} match={match} compact />
            ))}
          </div>
        </div>
      )}

      {/* Quartas de Final */}
      {quarterfinalsMatches.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-white font-poppins mb-4">
            Quartas de Final
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quarterfinalsMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      )}

      {/* Semifinais */}
      {semifinalsMatches.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-white font-poppins mb-4">
            Semifinais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {semifinalsMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      )}

      {/* Final */}
      {finalMatch && (
        <Card className="overflow-hidden bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/30">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-bold text-white font-poppins">
                FINAL
              </h3>
            </div>

            <div className="mb-6">
              <MatchCard match={finalMatch} />
            </div>

            {/* Campeão */}
            {winner && (
              <div className="mt-6 p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg text-center">
                <p className="text-sm text-green-100 mb-2">CAMPEÃO</p>
                <p className="text-2xl font-bold text-white font-poppins">
                  {winner.name}
                </p>
                <p className="text-sm text-green-100 mt-1">{winner.country}</p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
