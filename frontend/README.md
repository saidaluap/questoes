# Site de Questões de Ortopedia - TEOT e TARO

## 🎯 Visão Geral

Site desenvolvido para estudos de ortopedia, similar ao QConcursos, focado em questões para preparação dos títulos TEOT (Título de Especialista em Ortopedia e Traumatologia) e TARO (Título de Área de Atuação em Ortopedia).

## ✨ Funcionalidades

### 🔍 Sistema de Filtros
- **Palavra-chave**: Busca livre em questões, alternativas e subtemas
- **Tipo de Prova**: Filtro por TEOT ou TARO
- **Área Anatômica**: 9 áreas organizadas por região anatômica
- **Subtema**: Filtros específicos baseados na área selecionada
- **Ano**: Filtro por ano da prova (2018-2025)

### 📚 Filtros Avançados
- **Excluir questões**: Anuladas e desatualizadas
- **Questões com**: Gabarito comentado e comentários

### 📊 Estatísticas em Tempo Real
- Total de questões encontradas
- Quantidade de questões TEOT
- Quantidade de questões TARO
- Número de áreas abrangidas

### 🎯 Sistema de Questões Interativo
- Seleção de alternativas via radio buttons
- Feedback imediato (correto/incorreto)
- Comentários explicativos
- Indicadores visuais de dificuldade
- Badges para identificação de tipo e área

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- pnpm (recomendado) ou npm

### Instalação

1. **Extrair o projeto**:
   ```bash
   # Se você recebeu um arquivo .zip, extraia-o
   unzip questoes-ortopedia-site.zip
   cd questoes-ortopedia-site
   ```

2. **Instalar dependências**:
   ```bash
   pnpm install
   # ou
   npm install
   ```

3. **Executar em modo de desenvolvimento**:
   ```bash
   pnpm run dev
   # ou
   npm run dev
   ```

4. **Acessar o site**:
   - Abra seu navegador e acesse: `http://localhost:5173`
   - O site será carregado automaticamente

### Scripts Disponíveis

- `pnpm run dev` - Inicia o servidor de desenvolvimento
- `pnpm run build` - Gera a versão de produção
- `pnpm run preview` - Visualiza a versão de produção localmente

## 📋 Estrutura dos Módulos

### Áreas Anatômicas Disponíveis:

1. **Coluna** - Anatomia, patologias, fraturas, cirurgias
2. **Ombro e Cotovelo** - Instabilidade, artroplastias, artroscopias
3. **Quadril** - Artroplastias, fraturas, osteotomias
4. **Joelho** - LCA/LCP, meniscos, artroplastias
5. **Pé e Tornozelo** - Halux valgo, fascite plantar, fraturas
6. **Mão e Punho** - Tendões, fraturas, síndromes compressivas
7. **Reconstrução** - Osteossíntese, pseudoartrose, infecções
8. **Oncologia** - Tumores benignos e malignos, metástases
9. **Pediatria** - Deformidades congênitas, fraturas em crianças

## 🎨 Tecnologias Utilizadas

- **React 18** - Framework principal
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilos
- **Lucide React** - Ícones modernos
- **shadcn/ui** - Componentes de interface

## 📝 Questões de Exemplo

O site inclui 5 questões de exemplo cobrindo diferentes áreas:

1. **Q001 (TEOT)**: Anatomia da Mão - Flexão do polegar
2. **Q002 (TARO)**: Fraturas da Coluna - Mecanismo de lesão
3. **Q003 (TEOT)**: Lesões do LCA - Teste de Lachman
4. **Q004 (TARO)**: Fraturas em Crianças - Complicações
5. **Q005 (TEOT)**: Instabilidade de Ombro - Lesão de Bankart

## 🔧 Personalização

### Adicionando Novas Questões

Edite o arquivo `src/data/questoes.js` para adicionar novas questões:

```javascript
{
  id: "Q006",
  tipo: "TEOT", // ou "TARO"
  area: "Joelho", // Uma das áreas disponíveis
  subtema: "Lesões LCA",
  ano: 2024,
  questao: "Texto da questão...",
  alternativas: [
    { letra: "A", texto: "Alternativa A" },
    { letra: "B", texto: "Alternativa B" },
    // ...
  ],
  gabarito: "A",
  comentario: "Explicação da resposta...",
  dificuldade: "Média" // Fácil, Média ou Difícil
}
```

### Modificando Temas

Edite o objeto `temasData` no mesmo arquivo para adicionar ou modificar subtemas por área.

## 📱 Compatibilidade

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Dispositivos móveis (iOS/Android)

## 🎯 Próximos Passos Sugeridos

1. **Expandir banco de questões**: Adicionar mais questões reais
2. **Sistema de usuários**: Login e perfis personalizados
3. **Simulados**: Criar simulados completos por área
4. **Estatísticas avançadas**: Tracking de desempenho
5. **Modo offline**: Cache para estudo sem internet

## 📞 Suporte

Site desenvolvido especificamente para estudantes de ortopedia, seguindo as melhores práticas de UX/UI e acessibilidade web.

---

**Desenvolvido com ❤️ para a comunidade ortopédica brasileira**

