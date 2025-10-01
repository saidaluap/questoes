# 🏥 Site de Questões de Ortopedia - TARO 2025

## 📋 Descrição do Projeto

Site full-stack para questões de ortopedia baseado no QConcursos, contendo **54 questões do TARO 2025** extraídas automaticamente do PDF fornecido. O sistema permite filtrar questões por área anatômica, subtema, ano e palavra-chave, com interface interativa para responder questões.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Framework JavaScript
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS
- **shadcn/ui** - Componentes UI
- **Lucide React** - Ícones

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **SQLite3** - Banco de dados
- **CORS** - Cross-Origin Resource Sharing

## 📊 Dados do Sistema

- **54 questões** do TARO 2025
- **11 áreas anatômicas** organizadas
- **Subtemas específicos** por área
- **Campo para imagem** de justificativa
- **Sistema de gabarito** (em branco para preenchimento manual)

## 🏗️ Estrutura do Projeto

```
projeto-ortopedia-taro2025/
├── backend/                    # Servidor Node.js + Express
│   ├── server.js              # Servidor principal
│   ├── seed.js                # Script para popular banco
│   ├── parse_pdf.js           # Script de extração do PDF
│   ├── questoes_taro_2025.json # Questões extraídas
│   ├── questoes.db            # Banco SQLite
│   └── package.json           # Dependências do backend
├── frontend/                   # Aplicação React
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── services/          # Serviços de API
│   │   └── App.jsx           # Componente principal
│   ├── public/               # Arquivos estáticos
│   └── package.json          # Dependências do frontend
├── INSTRUCOES_AJUSTE_QUESTOES.md # Guia para ajustar questões
└── README-TARO2025.md        # Esta documentação
```

## ⚡ Como Executar

### 1. Pré-requisitos
- Node.js 18+ instalado
- npm ou pnpm instalado

### 2. Backend (Terminal 1)
```bash
cd backend
npm install
node server.js
```
O servidor rodará em `http://localhost:3001`

### 3. Frontend (Terminal 2)
```bash
cd frontend
pnpm install
# ou npm install
pnpm run dev
# ou npm run dev
```
O site estará disponível em `http://localhost:5173`

## 🎯 Funcionalidades

### ✅ Sistema de Filtros
- **Tipo de Prova**: TEOT/TARO (todas são TARO 2025)
- **Área Anatômica**: 11 áreas organizadas
- **Subtema**: Subtemas específicos por área
- **Ano**: Filtro por ano (2025)
- **Palavra-chave**: Busca no texto das questões
- **Filtros Avançados**: Excluir questões anuladas/desatualizadas

### ✅ Questões Interativas
- Seleção de alternativas (A, B, C, D)
- Feedback visual após resposta
- Gabarito em branco (para preenchimento manual)
- Campo para imagem de justificativa
- Comentários explicativos

### ✅ Estatísticas em Tempo Real
- Total de questões encontradas
- Contadores por tipo (TEOT/TARO)
- Número de áreas anatômicas

### ✅ Interface Profissional
- Design similar ao QConcursos
- Responsivo (desktop/tablet/mobile)
- Cores médicas profissionais
- Navegação intuitiva

## 🔧 Como Ajustar Questões

### Alterar Área/Disciplina de uma Questão

**Método 1: Via Banco de Dados**
```sql
sqlite3 backend/questoes.db
UPDATE questoes 
SET area = 'Nova Área', subtema = 'Novo Subtema' 
WHERE id = 'Q001';
.quit
```

**Método 2: Via Arquivo JSON**
```bash
# Editar backend/questoes_taro_2025.json
# Alterar os campos "area" e "subtema" da questão desejada
# Depois executar:
cd backend
node seed.js
```

### Adicionar Gabarito
```sql
UPDATE questoes 
SET gabarito = 'C', comentario = 'Explicação da resposta...' 
WHERE id = 'Q001';
```

### Adicionar Imagem de Justificativa
```sql
UPDATE questoes 
SET imagemJustificativa = '/caminho/para/imagem.jpg' 
WHERE id = 'Q001';
```

## 📋 Áreas Anatômicas Disponíveis

1. **Geral** - Questões gerais de ortopedia
2. **Ombro e Cotovelo** - Patologias, fraturas, instabilidades
3. **Joelho** - LCA, LCP, meniscos, artroplastias
4. **Quadril** - Osteonecrose, artroplastias, patologias
5. **Mão e Punho** - Malformações, anatomia, patologias
6. **Pé e Tornozelo** - Artrodeses, patologias
7. **Coluna** - Fraturas, escoliose, classificações
8. **Oncologia** - Tumores ósseos, síndromes
9. **Pediatria e Deformidades Congênitas** - Patologias pediátricas
10. **Anatomia e Fisiologia** - Formação óssea, anatomia geral
11. **Reconstrução** - Enxertos ósseos

## 🔄 Reiniciar Sistema Após Alterações

```bash
# Parar processos
pkill -f "node server.js"
pkill -f "vite"

# Reiniciar backend
cd backend
node server.js &

# Reiniciar frontend
cd frontend
pnpm run dev
```

## 📝 Estrutura das Questões

Cada questão contém:
- **ID único** (Q001, Q002, etc.)
- **Tipo**: TARO (todas são TARO 2025)
- **Área**: Área anatômica inferida
- **Subtema**: Subtema específico
- **Ano**: 2025
- **Questão**: Texto da pergunta
- **Alternativas**: A, B, C, D
- **Gabarito**: Em branco (para preenchimento)
- **Comentário**: Em branco (para preenchimento)
- **Imagem Justificativa**: Campo para URL da imagem
- **Dificuldade**: Média (padrão)

## 🆘 Solução de Problemas

### Questão não aparece após alteração
- Reinicie o servidor backend
- Confirme se a alteração foi salva no banco
- Limpe o cache do navegador

### Imagem não carrega
- Verifique se o caminho está correto
- Confirme se a imagem é acessível
- Verifique erros de CORS

### Filtros não funcionam
- Confirme se a área está escrita corretamente
- Verifique espaços extras ou caracteres especiais
- Reinicie o sistema

## 📞 Suporte

Para dúvidas sobre:
- **Ajuste de questões**: Consulte `INSTRUCOES_AJUSTE_QUESTOES.md`
- **Problemas técnicos**: Verifique logs do console
- **Novas funcionalidades**: Modifique o código conforme necessário

## 🎉 Próximos Passos

1. **Preencher gabaritos** das 54 questões
2. **Adicionar comentários** explicativos
3. **Incluir imagens** de justificativa
4. **Ajustar áreas** se necessário
5. **Expandir** com mais questões

---

**Desenvolvido com base no QConcursos para questões de ortopedia TARO 2025**

