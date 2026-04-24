# Simulador da Copa do Mundo 2022

Aplicação front-end interativa para simular a Copa do Mundo FIFA 2022, desde a fase de grupos até a final, consumindo dados de uma API e aplicando regras de negócio realistas.

## 📋 Requisitos Atendidos

### 1. Consumir API com 32 Seleções
- ✅ GET `https://development-internship-api.geopstenergy.com/WorldCup/GetAllTeams`
- ✅ Header: `git-user: seu_nome_usuario_git`
- ✅ Resposta: JSON com 32 equipes

### 2. Fase de Grupos
- ✅ 8 grupos (A-H) com 4 equipes cada
- ✅ Distribuição aleatória das equipes
- ✅ 3 rodadas de partidas (round-robin)
- ✅ 6 partidas por grupo (cada equipe joga 3 vezes)

### 3. Simulação de Partidas
- ✅ Placar aleatório (0-5 gols)
- ✅ Cálculo de pontuação (3 vitória, 1 empate, 0 derrota)
- ✅ Atualização de estatísticas (jogos, vitórias, empates, derrotas, gols)
- ✅ Exibição completa de todas as partidas

### 4. Classificação de Grupos
- ✅ Critérios de desempate (ordem):
  1. Número de pontos
  2. Saldo de gols
  3. Gols marcados
  4. Sorteio aleatório
- ✅ Os 2 primeiros de cada grupo classificam para as oitavas

### 5. Fases Eliminatórias
- ✅ Oitavas de final (16 equipes, 8 partidas)
- ✅ Quartas de final (8 equipes, 4 partidas)
- ✅ Semifinais (4 equipes, 2 partidas)
- ✅ Final (2 equipes, 1 partida)
- ✅ Simulação de pênaltis em caso de empate

### 6. Envio do Resultado Final
- ✅ POST `https://development-internship-api.geopstenergy.com/WorldCup/FinalResult`
- ✅ Header: `git-user: seu_nome_usuario_git`
- ✅ Payload JSON com dados da final e campeão

## 🛠️ Stack Tecnológico

- **React 19** - Framework UI
- **TypeScript** - Tipagem estática
- **TailwindCSS 4** - Estilização
- **shadcn/ui** - Componentes UI
- **Axios** - Requisições HTTP
- **Wouter** - Roteamento
- **Lucide React** - Ícones

## 📁 Estrutura do Projeto

```
client/
├── src/
│   ├── pages/
│   │   ├── Home.tsx           # Página principal com simulação
│   │   └── NotFound.tsx       # Página 404
│   ├── components/
│   │   ├── Header.tsx         # Cabeçalho da aplicação
│   │   ├── GroupTable.tsx     # Tabela de grupos
│   │   ├── MatchCard.tsx      # Card de partida
│   │   ├── TournamentBracket.tsx # Chave de eliminatórias
│   │   └── ErrorBoundary.tsx  # Tratamento de erros
│   ├── hooks/
│   │   ├── useTeams.ts        # Hook para buscar equipes
│   │   └── useWorldCup.ts     # Hook para gerenciar Copa
│   ├── contexts/
│   │   ├── ThemeContext.tsx   # Contexto de tema
│   │   └── WorldCupContext.tsx # Contexto da Copa
│   ├── lib/
│   │   ├── api.ts             # Configuração Axios
│   │   ├── worldcup.ts        # Lógica de negócio
│   │   ├── types.ts           # Tipos TypeScript
│   │   └── constants.ts       # Constantes
│   ├── App.tsx                # Roteamento e layout
│   ├── main.tsx               # Entry point
│   └── index.css              # Estilos globais
└── index.html                 # HTML base
```

## 🚀 Como Executar

### Desenvolvimento
```bash
npm install
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

### Build para Produção
```bash
npm run build
npm start
```

## 📝 Fluxo de Uso

1. **Carregamento de Equipes**: A aplicação busca automaticamente as 32 equipes da API
2. **Criação de Grupos**: Equipes são distribuídas aleatoriamente em 8 grupos
3. **Simulação de Grupos**: Clique em "Simular Grupos" para executar todas as partidas
4. **Visualização de Tabelas**: Veja a classificação de cada grupo com estatísticas completas
5. **Simulação de Eliminatórias**: Clique em "Simular Eliminatórias" para oitavas até final
6. **Envio do Resultado**: Clique em "Enviar Campeão" para registrar o vencedor na API

## 🎨 Design

- **Tema**: Escuro com gradientes púrpura e azul
- **Tipografia**: Poppins (títulos) + Outfit (corpo)
- **Paleta**: Gradientes modernos com cores vibrantes
- **Responsividade**: Mobile-first com breakpoints para todos os tamanhos

## 🧪 Validação e Tratamento de Erros

- ✅ Validação de dados com Zod
- ✅ Tratamento de erros de API
- ✅ Error Boundary para erros de React
- ✅ Mensagens de erro amigáveis ao usuário
- ✅ Estados de carregamento com spinners

## 📊 Lógica de Negócio

### Pontuação
- Vitória: 3 pontos
- Empate: 1 ponto
- Derrota: 0 pontos

### Critérios de Desempate (Ordem)
1. Número de pontos
2. Saldo de gols
3. Gols marcados
4. Sorteio aleatório

### Simulação de Pênaltis
- 15% de chance em partidas de eliminatória que terminam empatadas
- Resultado: 0-5 gols para cada equipe
- Garante sempre um vencedor

## 🔐 Segurança

- Tipagem TypeScript em todo o código
- Validação de dados com Zod
- Tratamento seguro de erros
- Headers personalizados para autenticação na API

## 📱 Responsividade

- Desktop: Layout completo com 2 colunas de grupos
- Tablet: Layout adaptado com 1-2 colunas
- Mobile: Layout em coluna única com scroll horizontal em tabelas

## 🎯 Boas Práticas Implementadas

- ✅ Clean Code: Nomes significativos, funções pequenas, DRY
- ✅ SOLID: Separação de responsabilidades
- ✅ Componentes Reutilizáveis: Máxima modularização
- ✅ Hooks Customizados: Lógica separada de UI
- ✅ Contextos: Compartilhamento de estado global
- ✅ Tratamento de Erros: Try-catch e validação
- ✅ Documentação: Comentários em funções críticas
- ✅ Acessibilidade: Semântica HTML, ARIA labels

## 🔄 Fluxo de Dados

```
API (32 equipes)
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

## 📦 Dependências Principais

- `react@19.2.1` - Framework UI
- `typescript@5.6.3` - Tipagem
- `tailwindcss@4.1.14` - Estilização
- `axios@1.12.0` - HTTP client
- `lucide-react@0.453.0` - Ícones
- `zod@4.1.12` - Validação

## 🚀 Deploy

O projeto está pronto para ser deployado em qualquer plataforma que suporte Node.js:

- Vercel
- Netlify
- Railway
- Render
- AWS
- Google Cloud
- Azure

## 📄 Licença

MIT

## 👤 Autor

Desenvolvido como avaliação de estágio em Desenvolvimento de Software 2026

## 📞 Suporte

Para dúvidas sobre a implementação, consulte a documentação em `ARCHITECTURE.md`

---

**Status**: ✅ Pronto para Produção
**Última Atualização**: 14 de Abril de 2026
