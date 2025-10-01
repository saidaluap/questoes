const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

const path = require("path");

app.use(cors());
app.use(express.json());


// Conectar ao banco de dados SQLite
const db = new sqlite3.Database("./questoes.db", (err) => {
  if (err) {
    console.error("Erro ao abrir o banco de dados:" + err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
    // Criar tabela de questões se não existir
    db.run(
      `CREATE TABLE IF NOT EXISTS questoes (
        id TEXT PRIMARY KEY,
        tipo TEXT,
        area TEXT,
        subtema TEXT,
        ano INTEGER,
        questao TEXT,
        alternativas TEXT,
        gabarito TEXT,
        comentario TEXT,
        imagemJustificativa TEXT,
        imagemQuestao TEXT,
        dificuldade TEXT
      )`,
      (err) => {
        if (err) {
          console.error("Erro ao criar tabela de questões:" + err.message);
        } else {
          console.log("Tabela 'questoes' criada ou já existe.");
        }
      }
    );
  }
});

// Rotas da API

// Rota para obter todas as questões com filtros opcionais
app.get("/api/questoes", (req, res) => {
  const { tipo, area, subtema, ano, palavraChave } = req.query;
  
  let sql = "SELECT * FROM questoes WHERE 1=1";
  let params = [];
  
  if (tipo) {
    sql += " AND tipo = ?";
    params.push(tipo);
  }
  
  if (area) {
    sql += " AND area = ?";
    params.push(area);
  }
  
  if (subtema) {
    sql += " AND subtema = ?";
    params.push(subtema);
  }
  
  if (ano) {
    sql += " AND ano = ?";
    params.push(parseInt(ano));
  }
  
  if (palavraChave) {
    sql += " AND (questao LIKE ? OR subtema LIKE ?)";
    params.push(`%${palavraChave}%`, `%${palavraChave}%`);
  }
  
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    // Parse as alternativas de volta para array de objetos
    const questoes = rows.map(row => ({
      ...row,
      alternativas: JSON.parse(row.alternativas)
    }));
    res.json({ message: "success", data: questoes });
  });
});

// Rota para obter uma questão específica
app.get("/api/questoes/:id", (req, res) => {
  const { id } = req.params;
  
  db.get("SELECT * FROM questoes WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: "Questão não encontrada" });
      return;
    }
    
    const questao = {
      ...row,
      alternativas: JSON.parse(row.alternativas)
    };
    res.json({ message: "success", data: questao });
  });
});

// Rota para adicionar uma nova questão
app.post("/api/questoes", (req, res) => {
  const { id, tipo, area, subtema, ano, questao, alternativas, gabarito, comentario, dificuldade } = req.body;
  
  // Validação básica
  if (!id || !tipo || !area || !questao || !alternativas || !gabarito) {
    res.status(400).json({ error: "Campos obrigatórios: id, tipo, area, questao, alternativas, gabarito" });
    return;
  }
  
  // Stringify as alternativas para armazenar como texto
  const alternativasString = JSON.stringify(alternativas);

  db.run(
    `INSERT INTO questoes (id, tipo, area, subtema, ano, questao, alternativas, gabarito, comentario, dificuldade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, tipo, area, subtema, ano, questao, alternativasString, gabarito, comentario, dificuldade],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: "Questão adicionada com sucesso!", data: { id: id } });
    }
  );
});

// Rota para atualizar uma questão
app.put("/api/questoes/:id", (req, res) => {
  const { id } = req.params;
  const { tipo, area, subtema, ano, questao, alternativas, gabarito, comentario, dificuldade } = req.body;
  
  const alternativasString = JSON.stringify(alternativas);
  
  db.run(
    `UPDATE questoes SET tipo = ?, area = ?, subtema = ?, ano = ?, questao = ?, alternativas = ?, gabarito = ?, comentario = ?, dificuldade = ? WHERE id = ?`,
    [tipo, area, subtema, ano, questao, alternativasString, gabarito, comentario, dificuldade, id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: "Questão não encontrada" });
        return;
      }
      res.json({ message: "Questão atualizada com sucesso!" });
    }
  );
});

// Rota para deletar uma questão
app.delete("/api/questoes/:id", (req, res) => {
  const { id } = req.params;
  
  db.run("DELETE FROM questoes WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: "Questão não encontrada" });
      return;
    }
    res.json({ message: "Questão deletada com sucesso!" });
  });
});

// Rota para obter estatísticas
app.get("/api/estatisticas", (req, res) => {
  const queries = [
    "SELECT COUNT(*) as total FROM questoes",
    "SELECT COUNT(*) as teot FROM questoes WHERE tipo = 'TEOT'",
    "SELECT COUNT(*) as taro FROM questoes WHERE tipo = 'TARO'",
    "SELECT COUNT(DISTINCT area) as areas FROM questoes"
  ];
  
  Promise.all(queries.map(query => 
    new Promise((resolve, reject) => {
      db.get(query, [], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    })
  )).then(results => {
    res.json({
      message: "success",
      data: {
        total: results[0].total,
        teot: results[1].teot,
        taro: results[2].taro,
        areas: results[3].areas
      }
    });
  }).catch(err => {
    res.status(400).json({ error: err.message });
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});



// Criar tabela de comentários se não existir
db.run(
  `CREATE TABLE IF NOT EXISTS comentarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    questao_id TEXT,
    usuario_nome TEXT,
    usuario_hospital TEXT,
    comentario TEXT,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (questao_id) REFERENCES questoes (id)
  )`,
  (err) => {
    if (err) {
      console.error("Erro ao criar tabela de comentários:" + err.message);
    } else {
      console.log("Tabela 'comentarios' criada ou já existe.");
    }
  }
);

// Rota para obter comentários de uma questão
app.get("/api/questoes/:id/comentarios", (req, res) => {
  const { id } = req.params;
  
  db.all(
    `SELECT * FROM comentarios WHERE questao_id = ? ORDER BY data_criacao DESC`,
    [id],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ data: rows });
    }
  );
});

// Rota para adicionar comentário a uma questão
app.post("/api/questoes/:id/comentarios", (req, res) => {
  const { id } = req.params;
  const { usuario_nome, usuario_hospital, comentario } = req.body;
  
  // Validação básica
  if (!usuario_nome || !comentario) {
    res.status(400).json({ error: "Campos obrigatórios: usuario_nome, comentario" });
    return;
  }
  
  db.run(
    `INSERT INTO comentarios (questao_id, usuario_nome, usuario_hospital, comentario) VALUES (?, ?, ?, ?)`,
    [id, usuario_nome, usuario_hospital || '', comentario],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ 
        message: "Comentário adicionado com sucesso!", 
        data: { 
          id: this.lastID,
          questao_id: id,
          usuario_nome,
          usuario_hospital,
          comentario
        } 
      });
    }
  );
});


// Rota para notificar erro por email
app.post("/api/questoes/:id/notificar-erro", (req, res) => {
  const { id } = req.params;
  const { descricao_erro, usuario_nome } = req.body;
  
  // Validação básica
  if (!descricao_erro) {
    res.status(400).json({ error: "Campo obrigatório: descricao_erro" });
    return;
  }
  
  // Simular envio de email (em produção, usar um serviço como SendGrid, Nodemailer, etc.)
  const emailContent = `
    Nova notificação de erro recebida:
    
    Questão ID: ${id}
    Usuário: ${usuario_nome || 'Anônimo'}
    Descrição do erro: ${descricao_erro}
    Data: ${new Date().toLocaleString('pt-BR')}
  `;
  
  console.log('Email que seria enviado para matheusdepauladias@gmail.com:');
  console.log(emailContent);
  
  // Salvar notificação no banco (opcional)
  db.run(
    `CREATE TABLE IF NOT EXISTS notificacoes_erro (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      questao_id TEXT,
      usuario_nome TEXT,
      descricao_erro TEXT,
      data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
      if (err) {
        console.error("Erro ao criar tabela de notificações:", err.message);
      }
    }
  );
  
  db.run(
    `INSERT INTO notificacoes_erro (questao_id, usuario_nome, descricao_erro) VALUES (?, ?, ?)`,
    [id, usuario_nome || 'Anônimo', descricao_erro],
    function (err) {
      if (err) {
        console.error("Erro ao salvar notificação:", err.message);
        res.status(500).json({ error: "Erro interno do servidor" });
        return;
      }
      
      res.json({ 
        message: "Notificação de erro enviada com sucesso! O administrador será notificado.",
        data: { 
          id: this.lastID,
          questao_id: id,
          descricao_erro
        } 
      });
    }
  );
});

