const sqlite3 = require('sqlite3').verbose();

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database("./questoes.db", (err) => {
  if (err) {
    console.error("Erro ao abrir o banco de dados:" + err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
    initializeTables();
  }
});

function initializeTables() {
  // Criar tabela de alternativas
  db.run(`
    CREATE TABLE IF NOT EXISTS alternativas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      questao_id TEXT NOT NULL,
      letra TEXT NOT NULL,
      texto TEXT NOT NULL,
      FOREIGN KEY (questao_id) REFERENCES questoes (id)
    )
  `, (err) => {
    if (err) {
      console.error("Erro ao criar tabela de alternativas:" + err.message);
    } else {
      console.log("Tabela 'alternativas' criada ou já existe.");
    }
  });

  // Criar tabela de comentários
  db.run(`
    CREATE TABLE IF NOT EXISTS comentarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      questao_id TEXT NOT NULL,
      usuario_id INTEGER NOT NULL,
      texto TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (questao_id) REFERENCES questoes (id),
      FOREIGN KEY (usuario_id) REFERENCES users (id)
    )
  `, (err) => {
    if (err) {
      console.error("Erro ao criar tabela de comentários:" + err.message);
    } else {
      console.log("Tabela 'comentarios' criada ou já existe.");
    }
  });

  // Atualizar tabela de questões para incluir campos de referência
  db.run(`
    ALTER TABLE questoes ADD COLUMN referencia_imagem TEXT
  `, (err) => {
    if (err && !err.message.includes('duplicate column name')) {
      console.error("Erro ao adicionar coluna referencia_imagem:" + err.message);
    }
  });

  db.run(`
    ALTER TABLE questoes ADD COLUMN referencia_texto TEXT
  `, (err) => {
    if (err && !err.message.includes('duplicate column name')) {
      console.error("Erro ao adicionar coluna referencia_texto:" + err.message);
    }
  });

  db.run(`
    ALTER TABLE questoes ADD COLUMN comentario_gabarito TEXT
  `, (err) => {
    if (err && !err.message.includes('duplicate column name')) {
      console.error("Erro ao adicionar coluna comentario_gabarito:" + err.message);
    }
  });

  // Inserir algumas questões de exemplo se não existirem
  insertSampleData();
}

function insertSampleData() {
  // Verificar se já existem questões
  db.get("SELECT COUNT(*) as count FROM questoes", [], (err, row) => {
    if (err) {
      console.error("Erro ao verificar questões:" + err.message);
      return;
    }

    if (row.count === 0) {
      console.log("Inserindo questões de exemplo...");
      
      const questoes = [
        {
          id: 'TEOT_2023_001',
          tipo: 'TEOT',
          area: 'Trauma',
          subtema: 'Fraturas do Fêmur',
          ano: 2023,
          questao: 'Qual é o tratamento de escolha para uma fratura de colo de fêmur em paciente jovem (< 65 anos) sem desvio?',
          gabarito: 'B',
          comentario_gabarito: 'Em pacientes jovens, a preservação da cabeça femoral é fundamental. A osteossíntese com parafusos canulados permite a manutenção da anatomia e vascularização.',
          referencia_texto: 'A fratura do colo do fêmur em pacientes jovens requer tratamento cirúrgico urgente para preservar a vascularização da cabeça femoral.',
          dificuldade: 'Média'
        },
        {
          id: 'TARO_2023_001',
          tipo: 'TARO',
          area: 'Coluna',
          subtema: 'Classificações',
          ano: 2023,
          questao: 'A classificação de Magerl é utilizada para avaliar fraturas de qual região da coluna vertebral?',
          gabarito: 'C',
          comentario_gabarito: 'A classificação de Magerl é específica para fraturas da coluna toracolombar (T11-L2), dividindo-as em tipos A, B e C.',
          referencia_texto: 'A classificação de Magerl divide as fraturas toracolombares em: Tipo A (compressão), Tipo B (distração) e Tipo C (rotação).',
          dificuldade: 'Fácil'
        },
        {
          id: 'TEOT_2022_001',
          tipo: 'TEOT',
          area: 'Joelho',
          subtema: 'Lesões Ligamentares',
          ano: 2022,
          questao: 'O teste de Lachman é considerado o mais sensível para avaliar lesão de qual estrutura do joelho?',
          gabarito: 'A',
          comentario_gabarito: 'O teste de Lachman é o teste mais sensível e específico para avaliar lesões do ligamento cruzado anterior (LCA).',
          referencia_texto: 'O teste de Lachman avalia a estabilidade anteroposterior do joelho, sendo realizado com flexão de 20-30 graus.',
          dificuldade: 'Fácil'
        }
      ];

      const alternativas = [
        // Questão 1
        { questao_id: 'TEOT_2023_001', letra: 'A', texto: 'Artroplastia total do quadril' },
        { questao_id: 'TEOT_2023_001', letra: 'B', texto: 'Osteossíntese com parafusos canulados' },
        { questao_id: 'TEOT_2023_001', letra: 'C', texto: 'Tratamento conservador' },
        { questao_id: 'TEOT_2023_001', letra: 'D', texto: 'Artroplastia parcial' },
        { questao_id: 'TEOT_2023_001', letra: 'E', texto: 'Tração esquelética' },
        
        // Questão 2
        { questao_id: 'TARO_2023_001', letra: 'A', texto: 'Coluna cervical' },
        { questao_id: 'TARO_2023_001', letra: 'B', texto: 'Coluna torácica alta' },
        { questao_id: 'TARO_2023_001', letra: 'C', texto: 'Coluna toracolombar' },
        { questao_id: 'TARO_2023_001', letra: 'D', texto: 'Coluna lombar baixa' },
        { questao_id: 'TARO_2023_001', letra: 'E', texto: 'Coluna sacral' },
        
        // Questão 3
        { questao_id: 'TEOT_2022_001', letra: 'A', texto: 'Ligamento cruzado anterior' },
        { questao_id: 'TEOT_2022_001', letra: 'B', texto: 'Ligamento cruzado posterior' },
        { questao_id: 'TEOT_2022_001', letra: 'C', texto: 'Ligamento colateral medial' },
        { questao_id: 'TEOT_2022_001', letra: 'D', texto: 'Ligamento colateral lateral' },
        { questao_id: 'TEOT_2022_001', letra: 'E', texto: 'Menisco medial' }
      ];

      // Inserir questões
      questoes.forEach(questao => {
        db.run(`
          INSERT INTO questoes (id, tipo, area, subtema, ano, questao, gabarito, comentario_gabarito, referencia_texto, dificuldade)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          questao.id, questao.tipo, questao.area, questao.subtema, questao.ano,
          questao.questao, questao.gabarito, questao.comentario_gabarito,
          questao.referencia_texto, questao.dificuldade
        ], (err) => {
          if (err) {
            console.error("Erro ao inserir questão " + questao.id + ":" + err.message);
          } else {
            console.log("Questão " + questao.id + " inserida com sucesso.");
          }
        });
      });

      // Inserir alternativas
      alternativas.forEach(alternativa => {
        db.run(`
          INSERT INTO alternativas (questao_id, letra, texto)
          VALUES (?, ?, ?)
        `, [alternativa.questao_id, alternativa.letra, alternativa.texto], (err) => {
          if (err) {
            console.error("Erro ao inserir alternativa:" + err.message);
          }
        });
      });

      console.log("Dados de exemplo inseridos com sucesso!");
    } else {
      console.log("Questões já existem no banco de dados.");
    }
  });
}

// Fechar conexão após 5 segundos
setTimeout(() => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Conexão com o banco de dados fechada.');
    }
  });
}, 5000);

