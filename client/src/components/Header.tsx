/**
 * Componente Header
 * Cabeçalho da aplicação com navegação e informações
 * Design: Moderno e limpo com fundo gradiente
 */

import { Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onReset?: () => void;
  showReset?: boolean;
}

export default function Header({ onReset, showReset = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-700/30 shadow-lg">
      <div className="container flex items-center justify-between h-16">
        {/* Logo e Título */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg">
            <Trophy className="w-6 h-6 text-slate-900" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-poppins">
              Copa do Mundo 2022
            </h1>
            <p className="text-xs text-purple-300 font-outfit">Simulador Interativo</p>
          </div>
        </div>

        {/* Botões de Ação */}
        {showReset && (
          <Button
            onClick={onReset}
            variant="outline"
            className="text-white border-purple-500 hover:bg-purple-500/10"
          >
            Reiniciar
          </Button>
        )}
      </div>
    </header>
  );
}
