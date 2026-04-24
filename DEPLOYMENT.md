# Guia de Deployment

## 📦 Preparação para Produção

### 1. Build
```bash
npm run build
```

Isso gera os arquivos otimizados em `/dist`.

### 2. Verificar Build
```bash
npm run preview
```

Testa o build localmente antes de fazer deploy.

## 🚀 Opções de Deployment

### Vercel (Recomendado)

Vercel é otimizado para aplicações Next.js/React e oferece deployment automático.

#### Opção 1: Git Integration
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Selecione seu repositório GitHub
4. Vercel detectará automaticamente a configuração
5. Clique em "Deploy"

#### Opção 2: CLI
```bash
npm i -g vercel
vercel
```

### Netlify

Alternativa popular com suporte excelente para SPAs.

#### Opção 1: Git Integration
1. Acesse [netlify.com](https://netlify.com)
2. Clique em "New site from Git"
3. Selecione seu repositório
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Clique em "Deploy site"

#### Opção 2: Drag & Drop
```bash
npm run build
# Arraste a pasta /dist para o Netlify
```

### GitHub Pages

Para deploy gratuito (sem domínio customizado).

```bash
# Instalar gh-pages
npm install --save-dev gh-pages

# Adicionar ao package.json:
"homepage": "https://seu-usuario.github.io/worldcup-simulator",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Deploy
npm run deploy
```

### Railway

Plataforma moderna com suporte a Node.js.

1. Acesse [railway.app](https://railway.app)
2. Clique em "New Project"
3. Selecione "Deploy from GitHub"
4. Autorize e selecione seu repositório
5. Configure variáveis de ambiente se necessário
6. Railway fará deploy automático

### Render

Alternativa a Railway com free tier generoso.

1. Acesse [render.com](https://render.com)
2. Clique em "New +"
3. Selecione "Web Service"
4. Conecte seu repositório GitHub
5. Configure:
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
6. Deploy automático em cada push

### AWS S3 + CloudFront

Para máxima performance e escalabilidade.

```bash
# Instalar AWS CLI
pip install awscli

# Configurar credenciais
aws configure

# Deploy
npm run build
aws s3 sync dist/ s3://seu-bucket-name/
aws cloudfront create-invalidation --distribution-id SEU_ID --paths "/*"
```

## 🔐 Variáveis de Ambiente

Nenhuma variável de ambiente é necessária para este projeto, pois:
- A API é pública
- Não há autenticação backend
- Dados são processados no cliente

Se adicionar features futuras:

```bash
# .env.production
VITE_API_URL=https://api.example.com
VITE_API_KEY=sua-chave-aqui
```

## 📋 Checklist de Deploy

- [ ] Código compilando sem erros (`npm run check`)
- [ ] Build gerado sem warnings (`npm run build`)
- [ ] Testes passando (`npm run test`)
- [ ] README atualizado
- [ ] CHANGELOG atualizado
- [ ] Versão bumped em package.json
- [ ] Git tag criada: `git tag v1.0.0`
- [ ] Todos os commits feitos
- [ ] Branch principal limpa

## 🔄 Deployment Automático

### GitHub Actions

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
```

## 📊 Monitoramento

### Vercel Analytics
Ativado automaticamente em Vercel.

### Sentry (Error Tracking)
```bash
npm install @sentry/react
```

Adicione ao `main.tsx`:
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "seu-dsn",
  environment: process.env.NODE_ENV,
});
```

### Google Analytics
Já configurado no `index.html` via Umami.

## 🚨 Troubleshooting

### Build falha
```bash
# Limpar cache
rm -rf node_modules dist
npm install
npm run build
```

### Erro de CORS
- A API é pública e permite CORS
- Se receber erro, verifique o header `git-user`

### Página em branco
- Verifique console do navegador (F12)
- Verifique se `index.html` foi gerado
- Verifique se assets estão sendo carregados

### Performance lenta
- Ative compressão Gzip
- Use CDN (Vercel/Netlify fazem automaticamente)
- Otimize imagens
- Lazy load componentes

## 📈 Otimizações

### Build
```bash
# Analisar bundle
npm run build -- --analyze
```

### Runtime
- Code splitting automático com Vite
- Tree-shaking de dependências não usadas
- Minificação de CSS e JS

## 🔄 Rollback

Se algo der errado em produção:

### Vercel
```bash
vercel rollback
```

### Netlify
- Acesse Deploy settings
- Selecione deploy anterior
- Clique em "Publish deploy"

### Git
```bash
git revert <commit-hash>
git push
```

## 📝 Versionamento

Mantenha versão em `package.json`:

```json
{
  "version": "1.0.0"
}
```

Use Semantic Versioning:
- MAJOR: Breaking changes
- MINOR: Novas features
- PATCH: Bug fixes

## 🎯 Performance Targets

- Lighthouse Score: 90+
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Cumulative Layout Shift: < 0.1

## 📞 Suporte

Para dúvidas sobre deployment:
- Consulte documentação da plataforma
- Abra issue no repositório
- Verifique logs de build/runtime

---

**Pronto para produção! 🚀**
