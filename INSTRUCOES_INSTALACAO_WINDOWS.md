# Instruções de Instalação - Windows

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

1. **Node.js** (versão 16 ou superior)
   - Baixe em: https://nodejs.org/
   - Durante a instalação, marque a opção "Add to PATH"

2. **Git** (opcional, mas recomendado)
   - Baixe em: https://git-scm.com/download/win

## Instalação e Execução

### 1. Extrair o Projeto
- Extraia o arquivo ZIP em uma pasta de sua escolha
- Exemplo: `C:\projetos\projeto-ortopedia-taro2025`

### 2. Abrir Terminal/Prompt de Comando
- Pressione `Win + R`, digite `cmd` e pressione Enter
- Ou abra o PowerShell: `Win + X` → "Windows PowerShell"

### 3. Navegar até a Pasta do Projeto
```cmd
cd C:\caminho\para\projeto-ortopedia-taro2025
```

### 4. Instalar Dependências do Backend
```cmd
cd backend
npm install
```

### 5. Instalar Dependências do Frontend
```cmd
cd ..\frontend
npm install
```

### 6. Executar o Projeto

#### Terminal 1 - Backend:
```cmd
cd backend
npm start
```
O backend será executado em: http://localhost:3001

#### Terminal 2 - Frontend:
Abra um novo terminal/prompt e execute:
```cmd
cd frontend
npm run dev
```
O frontend será executado em: http://localhost:5173

### 7. Acessar o Sistema
- Abra seu navegador
- Acesse: http://localhost:5173
- Faça login com suas credenciais

## Solução de Problemas

### Erro: "npm não é reconhecido"
- Reinstale o Node.js marcando "Add to PATH"
- Reinicie o computador
- Abra um novo terminal

### Erro: "Porta já está em uso"
- Feche outros projetos que possam estar usando as portas 3001 ou 5173
- Ou altere as portas nos arquivos de configuração

### Erro de Conexão com Banco
- Certifique-se de que o backend está rodando na porta 3001
- Verifique se não há firewall bloqueando a conexão

### Erro de CORS
- Certifique-se de que ambos (frontend e backend) estão rodando
- O backend já está configurado para aceitar requisições do frontend

## Estrutura de Pastas

```
projeto-ortopedia-taro2025/
├── backend/                 # Servidor Node.js
│   ├── server.js           # Arquivo principal do servidor
│   ├── questoes.db         # Banco de dados SQLite
│   └── package.json        # Dependências do backend
├── frontend/               # Interface React
│   ├── src/               # Código fonte
│   ├── public/            # Arquivos públicos
│   └── package.json       # Dependências do frontend
└── README.md              # Documentação
```

## Comandos Úteis

### Parar os Serviços
- No terminal onde está rodando: `Ctrl + C`

### Reinstalar Dependências (se necessário)
```cmd
# Backend
cd backend
rmdir /s node_modules
npm install

# Frontend
cd frontend
rmdir /s node_modules
npm install
```

### Verificar Logs
- Backend: Os logs aparecem no terminal onde está rodando
- Frontend: Abra as ferramentas de desenvolvedor do navegador (F12)

## Backup do Banco de Dados

O arquivo `questoes.db` contém todos os dados. Para fazer backup:
1. Pare o backend (`Ctrl + C`)
2. Copie o arquivo `backend/questoes.db` para um local seguro
3. Reinicie o backend

## Suporte

Se encontrar problemas:
1. Verifique se todas as dependências foram instaladas
2. Certifique-se de que as portas 3001 e 5173 estão livres
3. Consulte os logs nos terminais para identificar erros específicos

