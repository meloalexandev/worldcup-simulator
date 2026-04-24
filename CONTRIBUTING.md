# Guia de Contribuição

## Bem-vindo ao Simulador da Copa do Mundo!

Este documento fornece diretrizes e instruções para contribuir com o projeto.

## 🚀 Como Começar

### Pré-requisitos
- Node.js 18+
- npm ou pnpm
- Git
- Conhecimento básico de React e TypeScript

### Configuração Local

```bash
# Clonar o repositório
git clone <seu-repositorio>
cd worldcup-simulator

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

## 📝 Padrões de Código

### TypeScript
- Sempre use tipos explícitos
- Evite `any` - use tipos genéricos quando necessário
- Exporte interfaces públicas

```typescript
// ✅ Bom
interface Team {
  id: string;
  name: string;
}

export const getTeam = (id: string): Team | undefined => {
  // ...
};

// ❌ Ruim
export const getTeam = (id: any): any => {
  // ...
};
```

### React
- Use functional components com hooks
- Nomes de componentes em PascalCase
- Props interface com sufixo `Props`
- Memoize callbacks e valores quando necessário

```typescript
// ✅ Bom
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

// ❌ Ruim
export const button = (props) => {
  return <button {...props}>{props.children}</button>;
};
```

### Nomes
- Variáveis e funções: `camelCase`
- Constantes: `UPPER_SNAKE_CASE`
- Componentes: `PascalCase`
- Arquivos de componentes: `PascalCase.tsx`
- Arquivos de utilitários: `camelCase.ts`

### Comentários
- Documente funções complexas com JSDoc
- Explique o "por quê", não o "o quê"
- Mantenha comentários atualizados

```typescript
/**
 * Simula uma partida entre duas equipes
 * @param homeTeam Equipe da casa
 * @param awayTeam Equipe visitante
 * @returns Objeto Match com resultado simulado
 */
export const simulateMatch = (homeTeam: Team, awayTeam: Team): Match => {
  // ...
};
```

## 🎨 Estilo de Código

### Formatação
- Use Prettier: `npm run format`
- Indentação: 2 espaços
- Linha máxima: 100 caracteres (preferência)
- Aspas: simples para strings

### Imports
- Agrupe imports: React, bibliotecas, componentes locais
- Use aliases: `@/components`, `@/lib`, etc.

```typescript
import React, { useState } from 'react';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { useTeams } from '@/hooks/useTeams';
import { Team } from '@/lib/types';
```

## 🧪 Testes

### Estrutura
- Testes unitários para funções puras
- Testes de integração para componentes
- Testes E2E para fluxos críticos

```bash
# Executar testes
npm run test

# Modo watch
npm run test:watch

# Cobertura
npm run test:coverage
```

## 🔄 Processo de Contribuição

### 1. Criar Branch
```bash
git checkout -b feature/sua-feature
# ou
git checkout -b fix/seu-bug
```

### 2. Fazer Mudanças
- Mantenha commits pequenos e focados
- Use mensagens descritivas

```bash
git commit -m "feat: adicionar novo componente GroupTable"
git commit -m "fix: corrigir cálculo de pontuação em empates"
```

### 3. Push e Pull Request
```bash
git push origin feature/sua-feature
```

Crie um Pull Request com:
- Descrição clara do que foi mudado
- Motivo da mudança
- Screenshots (se UI)
- Checklist de testes

### 4. Code Review
- Responda aos comentários
- Faça ajustes solicitados
- Aguarde aprovação

## 📋 Checklist de Pull Request

- [ ] Código segue os padrões do projeto
- [ ] TypeScript sem erros (`npm run check`)
- [ ] Sem console.log ou debugger
- [ ] Comentários removidos ou úteis
- [ ] Testes adicionados/atualizados
- [ ] README atualizado se necessário
- [ ] Commits com mensagens claras

## 🐛 Reportar Bugs

Crie uma issue com:
- Título descritivo
- Descrição do problema
- Passos para reproduzir
- Comportamento esperado
- Comportamento atual
- Screenshots/vídeos se aplicável
- Ambiente (browser, OS, versão Node)

## 💡 Sugerir Features

Crie uma issue com:
- Título descritivo
- Descrição detalhada
- Caso de uso
- Benefícios
- Exemplos ou mockups

## 📚 Estrutura de Pastas

```
client/src/
├── pages/          # Páginas da aplicação
├── components/     # Componentes reutilizáveis
├── hooks/          # Custom hooks
├── contexts/       # React contexts
├── lib/            # Funções utilitárias
└── App.tsx         # Componente raiz
```

## 🔐 Segurança

- Nunca commite `.env` ou secrets
- Valide entrada do usuário
- Sanitize dados de API
- Use HTTPS em produção
- Mantenha dependências atualizadas

## 📖 Documentação

- Atualize README para mudanças significativas
- Documente APIs públicas
- Adicione exemplos de uso
- Mantenha ARCHITECTURE.md atualizado

## 🚀 Deployment

O projeto usa Vercel/Netlify para deployment automático:
- Merge em `main` → Deploy automático
- Branches → Preview automático

## 📞 Dúvidas?

- Abra uma issue com tag `question`
- Consulte a documentação em `ARCHITECTURE.md`
- Veja exemplos em componentes existentes

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a licença MIT do projeto.

---

**Obrigado por contribuir! 🎉**
