import { useEffect } from 'react';
import { useTeams } from '@/hooks/useTeams';
import { useWorldCupContext } from '@/contexts/WorldCupContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, Play, Trophy } from 'lucide-react';
import Header from '@/components/Header';
import GroupTable from '@/components/GroupTable';
import TournamentBracket from '@/components/TournamentBracket';
import { PHASES } from '@/lib/constants';

/**
 * Página principal - Simulador da Copa do Mundo
 * Gerencia o fluxo completo: grupos, eliminatórias e resultado final
 */
export default function Home() {
  const { teams, loading: teamsLoading, error: teamsError } = useTeams();
  const {
    tournament,
    currentPhase,
    isSimulating,
    error: tournamentError,
    startTournament,
    simulateGroups,
    simulateKnockout,
    submitWinner,
    reset,
  } = useWorldCupContext();

  useEffect(() => {
    if (teams.length > 0 && !tournament) {
      startTournament(teams);
    }
  }, [teams, tournament, startTournament]);

  const error = teamsError || tournamentError;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Header onReset={reset} showReset={!!tournament} />

      <main className="container py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {teamsLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-purple-500 mb-4" />
            <p className="text-lg text-muted-foreground">Carregando equipes...</p>
          </div>
        )}

        {!teamsLoading && !tournament && (
          <Card className="p-8 text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white font-poppins mb-2">
              Simulador da Copa do Mundo
            </h2>
            <p className="text-muted-foreground mb-6">
              Clique em Iniciar para começar a simulação
            </p>
            <Button
              onClick={() => startTournament(teams)}
              disabled={teamsLoading || teams.length === 0}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Play className="w-5 h-5 mr-2" />
              Iniciar Simulação
            </Button>
          </Card>
        )}

        {tournament && currentPhase === PHASES.GROUPS && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={simulateGroups}
                disabled={isSimulating}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                {isSimulating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Simulando...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Simular Grupos
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tournament.groups.map((group) => (
                <GroupTable key={group.name} group={group} />
              ))}
            </div>
          </div>
        )}

        {tournament && currentPhase === PHASES.KNOCKOUT && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={simulateKnockout}
                disabled={isSimulating || tournament.knockout.final.matches.length > 0}
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
              >
                {isSimulating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Simulando...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Simular Eliminatórias
                  </>
                )}
              </Button>

              {tournament.winner && (
                <Button
                  onClick={submitWinner}
                  disabled={isSimulating}
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  {isSimulating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Trophy className="w-5 h-5 mr-2" />
                      Enviar Campeão
                    </>
                  )}
                </Button>
              )}
            </div>

            <TournamentBracket
              round16Matches={tournament.knockout.quarterfinals.matches.length === 0 ? [] : tournament.knockout.quarterfinals.matches}
              quarterfinalsMatches={tournament.knockout.semifinals.matches.length === 0 ? [] : tournament.knockout.semifinals.matches}
              semifinalsMatches={tournament.knockout.final.matches.length === 0 ? [] : tournament.knockout.final.matches}
              finalMatch={tournament.knockout.final.matches[0]}
              winner={tournament.winner}
            />
          </div>
        )}
      </main>
    </div>
  );
}
