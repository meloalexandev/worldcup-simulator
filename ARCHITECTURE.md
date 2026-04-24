# Arquitetura - Simulador da Copa do Mundo

## Visão Geral

Aplicação front-end para simular a Copa do Mundo 2022, desde a fase de grupos até a final, consumindo APIs e aplicando regras de negócio.

## Stack Tecnológico

- **React 19** com TypeScript
- **TailwindCSS 4** para estilos
- **shadcn/ui** para componentes
- **Wouter** para roteamento
- **Axios** para requisições HTTP
- **Zod** para validação

## Estrutura de Pastas

```
client/
├── src/
│   ├── pages/
│   │   ├── Home.tsx           # Página inicial
│   │   ├── Groups.tsx         # Fase de grupos
│   │   ├── Knockout.tsx       # Fases eliminatórias
│   │   └── NotFound.tsx       # 404
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── GroupTable.tsx     # Tabela de grupos
│   │   ├── MatchCard.tsx      # Card de partida
│   │   ├── TournamentBracket.tsx # Chave de eliminatórias
│   │   ├── Header.tsx         # Cabeçalho
│   │   └── ErrorBoundary.tsx  # Error boundary
│   ├── hooks/
│   │   ├── useWorldCup.ts     # Hook principal da Copa
│   │   ├── useTeams.ts        # Hook para equipes
│   │   └── useMatches.ts      # Hook para partidas
│   ├── lib/
│   │   ├── api.ts             # Configuração Axios
│   │   ├── worldcup.ts        # Lógica de negócio
│   │   ├── types.ts           # Tipos TypeScript
│   │   └── constants.ts       # Constantes
│   ├── contexts/
│   │   ├── ThemeContext.tsx   # Contexto de tema
│   │   └── WorldCupContext.tsx # Contexto da Copa
│   ├── App.tsx                # Roteamento
│   ├── main.tsx               # Entry point
│   └── index.css              # Estilos globais
└── index.html                 # HTML base
```

## Fluxo de Dados

```
API (32 seleções)
    ↓
useTeams() → Armazena equipes
    ↓
useWorldCup() → Simula grupos
    ↓
GroupTable → Exibe tabela
    ↓
Classificados → Simula eliminatórias
    ↓
TournamentBracket → Exibe chave
    ↓
API (POST) → Envia resultado final
```

## Componentes Principais

### 1. **GroupTable.tsx**
- Exibe 8 grupos (A-H)
- Mostra tabela com equipes, pontos, saldo de gols
- Destaca os 2 classificados

### 2. **MatchCard.tsx**
- Card individual de partida
- Exibe placar, data, equipes
- Interativo para simular resultado

### 3. **TournamentBracket.tsx**
- Chave de eliminatórias
- Oitavas (16 equipes, 8 partidas)
- Quartas (8 equipes, 4 partidas)
- Semifinal (4 equipes, 2 partidas)
- Final (2 equipes, 1 partida)

### 4. **Header.tsx**
- Navegação entre fases
- Logo e título
- Status da simulação

## Lógica de Negócio (worldcup.ts)

### Funções Principais

```typescript
// 1. Criar grupos aleatórios
createGroups(teams: Team[]): Group[]

// 2. Simular partidas de um grupo
simulateGroupMatches(group: Group): Match[]

// 3. Calcular pontuação
calculatePoints(match: Match): void

// 4. Classificar equipes
classifyTeams(groups: Group[]): Team[]

// 5. Simular eliminatórias
simulateKnockout(teams: Team[]): KnockoutStage

// 6. Simular disputa de pênaltis
simulatePenalties(match: Match): void

// 7. Enviar resultado final
submitFinalResult(winner: Team): Promise<void>
```

## Tipos TypeScript (types.ts)

```typescript
interface Team {
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
}

interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeGoals: number;
  awayGoals: number;
  status: 'pending' | 'completed' | 'penalties';
  round: string;
  date?: Date;
}

interface Group {
  name: string;
  teams: Team[];
  matches: Match[];
}

interface KnockoutStage {
  round: string;
  matches: Match[];
}
```

## Constantes (constants.ts)

```typescript
// Grupos
export const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const TEAMS_PER_GROUP = 4;

// Pontuação
export const POINTS = {
  WIN: 3,
  DRAW: 1,
  LOSS: 0,
};

// Fases
export const PHASES = {
  GROUPS: 'groups',
  KNOCKOUT: 'knockout',
  FINAL: 'final',
};

// URLs da API
export const API_BASE_URL = 'https://development-internship-api.geopstenergy.com';
export const API_ENDPOINTS = {
  TEAMS: '/WorldCup/GetAllTeams',
  FINAL_RESULT: '/WorldCup/FinalResult',
};
```

## Hooks Customizados

### useWorldCup.ts
- Gerencia estado da Copa
- Simula grupos e eliminatórias
- Calcula pontuação

### useTeams.ts
- Busca equipes da API
- Cacheia dados
- Trata erros

### useMatches.ts
- Gerencia partidas
- Simula resultados
- Atualiza pontuação

## Validação (Zod)

```typescript
const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  country: z.string(),
});

const MatchSchema = z.object({
  homeTeam: TeamSchema,
  awayTeam: TeamSchema,
  homeGoals: z.number().min(0),
  awayGoals: z.number().min(0),
});
```

## Clean Code Principles

1. **Nomes Significativos:** Variáveis, funções e classes com nomes descritivos
2. **Funções Pequenas:** Cada função faz uma coisa bem
3. **DRY (Don't Repeat Yourself):** Reutilização de componentes e lógica
4. **SOLID:** Separação de responsabilidades
5. **Comentários Úteis:** Apenas onde necessário, código auto-explicativo
6. **Tratamento de Erros:** Try-catch e validação de dados
7. **Testes:** Estrutura pronta para testes unitários

## Fluxo de Desenvolvimento

1. ✅ Inicializar projeto com React + TypeScript
2. ⏳ Criar tipos e constantes
3. ⏳ Implementar lógica de negócio (worldcup.ts)
4. ⏳ Criar hooks customizados
5. ⏳ Implementar componentes UI
6. ⏳ Integrar com API
7. ⏳ Estilizar com TailwindCSS
8. ⏳ Testar e validar
9. ⏳ Preparar para GitHub

## Considerações de Performance

- Memoização com `useMemo` e `useCallback`
- Lazy loading de componentes
- Otimização de re-renders
- Cache de requisições HTTP

## Acessibilidade

- Semântica HTML correta
- ARIA labels onde necessário
- Contraste de cores adequado
- Navegação por teclado

## Responsividade

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Componentes adaptáveis
