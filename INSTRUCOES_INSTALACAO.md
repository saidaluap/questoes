# 📋 Instruções de Instalação - Aprova Ortopedia

## 🚀 Funcionalidades Implementadas

### ✅ Novas Funcionalidades Adicionadas:

**Autenticação Completa:**
- ✅ Login com validação JWT
- ✅ Cadastro de novos usuários
- ✅ Recuperação de senha por e-mail
- ✅ Redefinição de senha

**Simulado Avançado:**
- ✅ Interface com 300 questões do banco de dados
- ✅ Feedback imediato após seleção de alternativas
- ✅ Exibição do gabarito correto
- ✅ Abas funcionais: Questão, Referência, Comentários
- ✅ Sistema completo de comentários (adicionar, visualizar, deletar)

**Navegação SPA:**
- ✅ Single Page Application com React Router
- ✅ Header global com dropdown do usuário
- ✅ Página de perfil com edição de dados
- ✅ Rodapé com modal "Relatar Problema"

**Backend Integrado:**
- ✅ Servidor Node.js na porta 3001
- ✅ Banco SQLite com 300 questões
- ✅ APIs de autenticação e comentários

---

## 🛠️ Pré-requisitos (Windows)

Antes de executar o projeto, certifique-se de ter instalado:

### 1. Node.js (versão 18 ou superior)
- Baixe em: https://nodejs.org/
- Verifique a instalação: `node --version` e `npm --version`

### 2. Git (opcional, para versionamento)
- Baixe em: https://git-scm.com/

---

## 📦 Instalação e Execução

### Passo 1: Extrair o Projeto
1. Extraia o arquivo `projeto-ortopedia-taro2025-atualizado.zip`
2. Abra o **Prompt de Comando** ou **PowerShell** como Administrador
3. Navegue até a pasta extraída:
   ```cmd
   cd caminho\para\projeto-ortopedia-taro2025
   ```

### Passo 2: Instalar Dependências do Backend
```cmd
cd backend
npm install
```

### Passo 3: Instalar Dependências do Frontend
```cmd
cd ..\frontend
npm install
```

### Passo 4: Executar o Projeto

#### Terminal 1 - Backend (Porta 3001):
```cmd
cd backend
node server_integrado.js
```
**Aguarde a mensagem:** `Servidor rodando na porta 3001`

#### Terminal 2 - Frontend (Porta 5173):
```cmd
cd frontend
npm run dev
```
**Aguarde a mensagem:** `Local: http://localhost:5173/`

### Passo 5: Acessar a Aplicação
- Abra seu navegador
- Acesse: **http://localhost:5173/**

---

## 👤 Usuário de Teste

Para testar rapidamente, use estas credenciais:

**E-mail:** `teste@exemplo.com`  
**Senha:** `123456789`

Ou crie uma nova conta através da página de cadastro.

---

## 🔧 Solução de Problemas

### Erro: "EADDRINUSE: porta já está em uso"
```cmd
# Windows - Matar processo na porta 3001
netstat -ano | findstr :3001
taskkill /PID [número_do_processo] /F

# Windows - Matar processo na porta 5173
netstat -ano | findstr :5173
taskkill /PID [número_do_processo] /F
```

### Erro: "npm não é reconhecido"
- Reinstale o Node.js
- Reinicie o Prompt de Comando
- Verifique se o Node.js está no PATH do sistema

### Erro: "Permissão negada"
- Execute o Prompt de Comando como Administrador
- No PowerShell, execute: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### Banco de Dados não carrega
- Verifique se o arquivo `questoes.db` está na pasta `backend`
- Reinicie o servidor backend

---

## 📁 Estrutura do Projeto

```
projeto-ortopedia-taro2025/
├── backend/
│   ├── server_integrado.js     # Servidor principal
│   ├── questoes.db            # Banco SQLite
│   ├── package.json           # Dependências backend
│   └── .env                   # Configurações
├── frontend/
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── services/          # Serviços de API
│   │   └── App.jsx           # Aplicação principal
│   ├── package.json          # Dependências frontend
│   └── vite.config.js        # Configuração Vite
└── INSTRUCOES_INSTALACAO.md  # Este arquivo
```

---

## 🌐 URLs da Aplicação

- **Dashboard:** http://localhost:5173/dashboard
- **Login:** http://localhost:5173/
- **Cadastro:** http://localhost:5173/cadastro
- **Simulado:** http://localhost:5173/simulado
- **Perfil:** http://localhost:5173/perfil
- **API Backend:** http://localhost:3001/api/

---

## 📞 Suporte

Em caso de problemas:

1. Verifique se ambos os servidores estão rodando
2. Confirme que as portas 3001 e 5173 estão livres
3. Reinicie ambos os servidores
4. Verifique o console do navegador para erros JavaScript

---

## 🎯 Próximos Passos

O projeto está totalmente funcional! Você pode:

1. **Personalizar** as questões no banco SQLite
2. **Adicionar** novas funcionalidades
3. **Modificar** o design/layout
4. **Integrar** com outros sistemas
5. **Fazer deploy** em produção

---

**Desenvolvido com ❤️ para Aprova Ortopedia**  
*Versão: 2.0 - Janeiro 2025*

