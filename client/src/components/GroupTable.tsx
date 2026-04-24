/**
 * Componente GroupTable
 * Exibe tabela de grupos com equipes e estatísticas
 * Design: Tabela limpa com destaque para classificados
 */

import { Group } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

interface GroupTableProps {
  group: Group;
}

export default function GroupTable({ group }: GroupTableProps) {
  // Ordenar equipes por pontos, saldo de gols e gols marcados
  const sortedTeams = [...group.teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });

  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        {/* Cabeçalho do Grupo */}
        <div className="mb-4 pb-4 border-b border-border">
          <h3 className="text-lg font-bold text-white font-poppins">
            Grupo {group.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {group.matches.length} partidas realizadas
          </p>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 font-semibold text-muted-foreground">
                  Pos
                </th>
                <th className="text-left py-2 px-2 font-semibold text-muted-foreground">
                  Equipe
                </th>
                <th className="text-center py-2 px-2 font-semibold text-muted-foreground">
                  J
                </th>
                <th className="text-center py-2 px-2 font-semibold text-muted-foreground">
                  V
                </th>
                <th className="text-center py-2 px-2 font-semibold text-muted-foreground">
                  E
                </th>
                <th className="text-center py-2 px-2 font-semibold text-muted-foreground">
                  D
                </th>
                <th className="text-center py-2 px-2 font-semibold text-muted-foreground">
                  GP
                </th>
                <th className="text-center py-2 px-2 font-semibold text-muted-foreground">
                  GC
                </th>
                <th className="text-center py-2 px-2 font-semibold text-muted-foreground">
                  SG
                </th>
                <th className="text-center py-2 px-2 font-bold text-yellow-500">
                  PTS
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTeams.map((team, index) => {
                const isClassified = index < 2;
                return (
                  <tr
                    key={team.id}
                    className={`border-b border-border transition-colors ${
                      isClassified
                        ? 'bg-green-500/10 hover:bg-green-500/15'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{index + 1}</span>
                        {isClassified && (
                          <Trophy className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-2">
                      <div>
                        <p className="font-semibold text-foreground">
                          {team.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {team.country}
                        </p>
                      </div>
                    </td>

                    <td className="text-center py-3 px-2 text-foreground">
                      {team.played}
                    </td>
                    <td className="text-center py-3 px-2 text-green-500 font-semibold">
                      {team.wins}
                    </td>
                    <td className="text-center py-3 px-2 text-yellow-500 font-semibold">
                      {team.draws}
                    </td>
                    <td className="text-center py-3 px-2 text-red-500 font-semibold">
                      {team.losses}
                    </td>
                    <td className="text-center py-3 px-2 text-foreground">
                      {team.goalsFor}
                    </td>
                    <td className="text-center py-3 px-2 text-foreground">
                      {team.goalsAgainst}
                    </td>
                    <td className="text-center py-3 px-2 text-foreground font-semibold">
                      {team.goalDifference > 0 ? '+' : ''}
                      {team.goalDifference}
                    </td>
                    <td className="text-center py-3 px-2 font-bold text-lg text-yellow-500">
                      {team.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
