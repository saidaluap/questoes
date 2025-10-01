# 📝 Instruções para Ajustar Questões no Site

## Como Alterar a Área/Disciplina de uma Questão

Se você notar que uma questão foi categorizada incorretamente, pode ajustá-la facilmente seguindo estes passos:

### 🔧 Método 1: Editar Diretamente no Banco de Dados

1. **Acesse o diretório do backend:**
   ```bash
   cd backend
   ```

2. **Abra o banco de dados SQLite:**
   ```bash
   sqlite3 questoes.db
   ```

3. **Visualize as questões para encontrar a que deseja alterar:**
   ```sql
   SELECT id, area, subtema, questao FROM questoes LIMIT 10;
   ```

4. **Atualize a área e subtema da questão específica:**
   ```sql
   UPDATE questoes 
   SET area = 'Nova Área', subtema = 'Novo Subtema' 
   WHERE id = 'Q001';
   ```

5. **Saia do SQLite:**
   ```sql
   .quit
   ```

### 🔧 Método 2: Editar o Arquivo JSON e Repovoar o Banco

1. **Edite o arquivo `questoes_taro_2025.json`:**
   ```bash
   cd backend
   nano questoes_taro_2025.json
   ```

2. **Encontre a questão pelo ID e altere os campos `area` e `subtema`:**
   ```json
   {
     "id": "Q001",
     "tipo": "TARO",
     "area": "Nova Área",
     "subtema": "Novo Subtema",
     ...
   }
   ```

3. **Salve o arquivo e repovoar o banco:**
   ```bash
   node seed.js
   ```

## 📋 Áreas Disponíveis no Sistema

- **Geral** - Para questões que não se encaixam em áreas específicas
- **Ombro e Cotovelo** - Patologias, fraturas, instabilidades
- **Joelho** - LCA, LCP, meniscos, artroplastias
- **Quadril** - Osteonecrose, artroplastias, patologias
- **Mão e Punho** - Malformações, anatomia, patologias
- **Pé e Tornozelo** - Artrodeses, patologias
- **Coluna** - Fraturas, escoliose, classificações
- **Oncologia** - Tumores ósseos, síndromes
- **Pediatria e Deformidades Congênitas** - Patologias pediátricas
- **Anatomia e Fisiologia** - Formação óssea, anatomia geral
- **Nervos Periféricos** - Neuropatias compressivas
- **Reconstrução** - Enxertos ósseos

## 🖼️ Como Adicionar Imagem de Justificativa

### Método 1: Via Banco de Dados
```sql
UPDATE questoes 
SET imagemJustificativa = '/caminho/para/imagem.jpg' 
WHERE id = 'Q001';
```

### Método 2: Via Arquivo JSON
```json
{
  "id": "Q001",
  "imagemJustificativa": "/caminho/para/imagem.jpg",
  ...
}
```

## 📝 Como Adicionar Gabarito e Comentário

### Via Banco de Dados:
```sql
UPDATE questoes 
SET gabarito = 'C', comentario = 'Explicação detalhada da resposta...' 
WHERE id = 'Q001';
```

### Via Arquivo JSON:
```json
{
  "id": "Q001",
  "gabarito": "C",
  "comentario": "Explicação detalhada da resposta...",
  ...
}
```

## 🔄 Reiniciar o Sistema Após Alterações

Após fazer alterações no banco de dados ou arquivo JSON:

1. **Reinicie o servidor backend:**
   ```bash
   # Encontre o PID do processo
   ps aux | grep "node server.js"
   
   # Termine o processo (substitua XXXX pelo PID)
   kill XXXX
   
   # Inicie novamente
   node server.js &
   ```

2. **Recarregue o frontend no navegador** para ver as alterações.

## 📊 Verificar Alterações

Para verificar se as alterações foram aplicadas:

1. **No banco de dados:**
   ```sql
   SELECT * FROM questoes WHERE id = 'Q001';
   ```

2. **No frontend:** Acesse o site e use os filtros para verificar se a questão aparece na área correta.

## ⚠️ Dicas Importantes

- **Backup:** Sempre faça backup do arquivo `questoes.db` antes de fazer alterações
- **Consistência:** Mantenha a consistência entre `area` e `subtema`
- **Imagens:** Certifique-se de que as imagens estão acessíveis via URL ou caminho local
- **Teste:** Sempre teste as alterações no frontend após modificar o backend

## 🆘 Solução de Problemas

### Questão não aparece após alteração:
- Verifique se o servidor backend foi reiniciado
- Confirme se a alteração foi salva no banco de dados
- Limpe o cache do navegador

### Imagem não carrega:
- Verifique se o caminho da imagem está correto
- Confirme se a imagem é acessível via URL
- Verifique se não há erros de CORS

### Filtros não funcionam:
- Confirme se a `area` está escrita exatamente como nas opções do filtro
- Verifique se não há espaços extras ou caracteres especiais

