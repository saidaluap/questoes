# Funcionalidade de Histórico de Respostas

## Resumo das Implementações

Esta versão do projeto inclui uma nova funcionalidade de **Histórico de Respostas** que permite aos usuários:

1. **Salvar automaticamente** todas as respostas dadas às questões
2. **Visualizar o histórico** de respostas em uma interface dedicada
3. **Pesquisar** por questões específicas no histórico
4. **Deletar** respostas individuais do histórico
5. **Ver estatísticas** de desempenho (total de respostas, acertos, erros, taxa de acerto)

## Arquivos Modificados/Adicionados

### Backend
- **`backend/routes/historico.js`** (NOVO) - Rotas da API para gerenciar histórico
- **`backend/historico_respostas.sql`** (NOVO) - Script SQL para criar tabela do histórico
- **`backend/server_updated.js`** (MODIFICADO) - Adicionadas rotas do histórico

### Frontend
- **`frontend/src/components/Historico.jsx`** (NOVO) - Componente principal do histórico
- **`frontend/src/components/Dashboard.jsx`** (MODIFICADO) - Salvamento automático de respostas
- **`frontend/src/components/Perfil.jsx`** (MODIFICADO) - Adicionada aba "Histórico"
- **`frontend/src/styles.css`** (MODIFICADO) - Estilos para a interface do histórico

## Como Funciona

### 1. Salvamento Automático
- Quando o usuário responde uma questão no Dashboard, a resposta é automaticamente salva:
  - No banco de dados SQLite (tabela `historico_respostas`)
  - No localStorage do navegador (como backup)

### 2. Interface do Histórico
- Acessível através do menu "Meu Perfil" → aba "Histórico"
- Mostra estatísticas de desempenho no topo
- Lista paginada das respostas com informações da questão
- Cada item mostra se acertou/errou, data/hora da resposta

### 3. Funcionalidades Disponíveis
- **Pesquisa**: Campo para buscar por texto da questão, área ou subtema
- **Visualização expandida**: Botão para ver a questão completa com alternativas
- **Exclusão**: Botão para deletar respostas individuais
- **Paginação**: Navegação entre páginas do histórico

### 4. Estrutura da Tabela do Banco
```sql
CREATE TABLE historico_respostas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    questao_id INTEGER NOT NULL,
    resposta_usuario TEXT NOT NULL,
    resposta_correta TEXT NOT NULL,
    acertou BOOLEAN NOT NULL,
    data_resposta DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## APIs Implementadas

### POST `/api/historico/salvar-resposta`
Salva uma nova resposta do usuário
- Requer autenticação (Bearer token)
- Body: `{ questao_id, resposta_usuario, resposta_correta }`

### GET `/api/historico/historico`
Busca o histórico de respostas do usuário
- Requer autenticação (Bearer token)
- Query params: `search`, `page`, `limit`

### GET `/api/historico/estatisticas`
Retorna estatísticas de desempenho do usuário
- Requer autenticação (Bearer token)

### DELETE `/api/historico/deletar-resposta/:id`
Deleta uma resposta específica do histórico
- Requer autenticação (Bearer token)

## Instalação

1. Execute o script SQL para criar a tabela:
```bash
cd backend
sqlite3 questoes.db < historico_respostas.sql
```

2. Instale as dependências (se necessário):
```bash
cd backend && npm install
cd ../frontend && npm install
```

3. Inicie os servidores:
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

## Observações Importantes

- A funcionalidade mantém a estrutura original do projeto intacta
- As respostas são salvas automaticamente sem interferir na experiência do usuário
- O histórico é privado para cada usuário (isolado por user_id)
- Há backup no localStorage caso haja problemas de conectividade
- A interface é responsiva e funciona em dispositivos móveis

## Compatibilidade

Esta implementação é totalmente compatível com a versão original do projeto e não quebra nenhuma funcionalidade existente.

