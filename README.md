# Projeto Questões de Ortopedia - TEOT e TARO

## Descrição
Sistema web para gerenciamento e visualização de questões de ortopedia dos exames TEOT (Título de Especialista em Ortopedia e Traumatologia) e TARO (Título de Área de Atuação em Ortopedia).

## Estrutura do Projeto

### Backend (Node.js + Express + SQLite)
- **Localização**: `/backend`
- **Servidor**: `server_integrado.js`
- **Porta**: 3001
- **Banco de dados**: SQLite (`questoes.db`)

#### Funcionalidades do Backend:
- Sistema de autenticação JWT
- CRUD de usuários
- CRUD de questões (protegido por autenticação)
- Exportação de usuários para Excel
- Validação de dados com express-validator

#### Rotas principais:
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil do usuário
- `GET /api/questoes` - Listar questões (autenticado)
- `GET /api/questoes/:id` - Questão específica (autenticado)

### Frontend (React + Vite)
- **Localização**: `/frontend`
- **Porta**: 5173
- **Framework**: React 18 com Vite

#### Componentes:
- `App.jsx` - Componente principal
- `Login.jsx` - Tela de login
- `Dashboard.jsx` - Dashboard principal com questões

#### Funcionalidades do Frontend:
- Sistema de login com validação
- Dashboard com estatísticas
- Listagem de questões com filtros
- Filtros por tipo, área, ano e palavra-chave
- Interface responsiva

## Como executar

### Pré-requisitos
- Node.js 18+
- npm

### Backend
```bash
cd backend
npm install
node server_integrado.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Usuário de Teste
- **Email**: teste@teste.com
- **Senha**: 123456

## Banco de Dados
O projeto contém 300 questões distribuídas entre:
- 200 questões TEOT
- 100 questões TARO
- 12 áreas diferentes de ortopedia

## Tecnologias Utilizadas

### Backend:
- Node.js
- Express.js
- SQLite3
- JWT (jsonwebtoken)
- bcrypt
- express-validator
- CORS
- XLSX

### Frontend:
- React 18
- Vite
- CSS3
- Fetch API

## Estrutura de Arquivos
```
projeto-ortopedia-taro2025/
├── backend/
│   ├── server_integrado.js
│   ├── questoes.db
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login.jsx
    │   │   └── Dashboard.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Observações
- O backend utiliza autenticação JWT para proteger as rotas de questões
- Todas as senhas são criptografadas com bcrypt
- O frontend gerencia o token JWT no localStorage
- A aplicação é totalmente funcional e pronta para uso

