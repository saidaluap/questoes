// server_integrado.js
require('dotenv').config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Caminho para o arquivo Excel
const EXCEL_FILE_PATH = path.join(__dirname, "usuarios_ortopedia.xlsx");

// Função para atualizar planilha Excel
const updateExcelFile = (userData) => {
  try {
    let workbook;
    let worksheet;
    
    // Verificar se o arquivo já existe
    if (fs.existsSync(EXCEL_FILE_PATH)) {
      workbook = XLSX.readFile(EXCEL_FILE_PATH);
      worksheet = workbook.Sheets['Usuários'] || workbook.Sheets[workbook.SheetNames[0]];
    } else {
      // Criar nova planilha se não existir
      workbook = XLSX.utils.book_new();
      worksheet = XLSX.utils.aoa_to_sheet([
        ['ID', 'Nome', 'Email', 'Hospital', 'Tipo de Usuário', 'Data de Cadastro']
      ]);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuários');
    }

    // Converter worksheet para array
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    // Adicionar nova linha
    data.push([
      userData.id,
      userData.nome,
      userData.email,
      userData.hospital,
      userData.tipo_usuario,
      new Date().toLocaleString('pt-BR')
    ]);

    // Converter de volta para worksheet
    const newWorksheet = XLSX.utils.aoa_to_sheet(data);
    workbook.Sheets['Usuários'] = newWorksheet;

    // Salvar arquivo
    XLSX.writeFile(workbook, EXCEL_FILE_PATH);
    console.log('Planilha Excel atualizada com sucesso:', EXCEL_FILE_PATH);
  } catch (error) {
    console.error('Erro ao atualizar planilha Excel:', error);
    // Não falhar o cadastro se houver erro na planilha
  }
};

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

    // Criar tabela de usuários se não existir
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        nome TEXT NOT NULL,
        hospital TEXT NOT NULL,
        tipo_usuario TEXT NOT NULL CHECK (tipo_usuario IN ('R1', 'R2', 'R3', 'R4', 'R5', 'Ortopedista')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      (err) => {
        if (err) {
          console.error("Erro ao criar tabela de usuários:" + err.message);
        } else {
          console.log("Tabela 'users' criada ou já existe.");
        }
      }
    );
  }
});

// Middleware de autenticação
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ success: false, message: "Token de acesso requerido" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Token inválido" });
    }
    req.user = user;
    next();
  });
}

// Rota de teste básica (sem autenticação)
app.get("/api/test", (req, res) => {
  res.json({ message: "Servidor funcionando!", timestamp: new Date().toISOString() });
});

// Rotas de Autenticação

// Cadastro de usuário
app.post("/api/auth/register", [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  body('hospital').notEmpty().withMessage('Hospital é obrigatório'),
  body('tipo_usuario').isIn(['R1', 'R2', 'R3', 'R4', 'R5', 'Ortopedista']).withMessage('Tipo de usuário inválido')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Dados inválidos",
      errors: errors.array()
    });
  }

  const { email, password, nome, hospital, tipo_usuario } = req.body;

  try {
    // Verificar se email já existe
    db.get("SELECT id FROM users WHERE email = ?", [email], async (err, row) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Erro interno do servidor" });
      }
      
      if (row) {
        return res.status(400).json({
          success: false,
          message: "Email já está em uso",
          errors: [{ field: "email", message: "Email já está em uso" }]
        });
      }

      // Hash da senha
      const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
      const password_hash = await bcrypt.hash(password, saltRounds);

      // Inserir usuário
      db.run(
        `INSERT INTO users (email, password_hash, nome, hospital, tipo_usuario) VALUES (?, ?, ?, ?, ?)`,
        [email, password_hash, nome, hospital, tipo_usuario],
        function (err) {
          if (err) {
            return res.status(500).json({ success: false, message: "Erro ao criar usuário" });
          }

          const userId = this.lastID;

          // Atualizar planilha Excel automaticamente (não bloquear se falhar)
          try {
            updateExcelFile({
              id: userId,
              nome,
              email,
              hospital,
              tipo_usuario
            });
          } catch (excelError) {
            console.error('Erro ao atualizar Excel:', excelError);
            // Não falhar o cadastro se houver erro na planilha
          }

          // Gerar token JWT
          const token = jwt.sign(
            { id: userId, email, nome, hospital, tipo_usuario },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
          );

          res.json({
            success: true,
            message: "Usuário cadastrado com sucesso",
            data: {
              token,
              user: {
                id: userId,
                email,
                nome,
                hospital,
                tipo_usuario
              }
            }
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro interno do servidor" });
  }
});

// Login de usuário
app.post("/api/auth/login", [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Senha é obrigatória')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Dados inválidos",
      errors: errors.array()
    });
  }

  const { email, password } = req.body;

  try {
    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Erro interno do servidor" });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Credenciais inválidas"
        });
      }

      // Verificar senha
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: "Credenciais inválidas"
        });
      }

      // Gerar token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, nome: user.nome, hospital: user.hospital, tipo_usuario: user.tipo_usuario },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      );

      res.json({
        success: true,
        message: "Login realizado com sucesso",
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            nome: user.nome,
            hospital: user.hospital,
            tipo_usuario: user.tipo_usuario
          }
        }
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro interno do servidor" });
  }
});

// Obter perfil do usuário logado
app.get("/api/auth/profile", authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      user: {
        id: req.user.id,
        email: req.user.email,
        nome: req.user.nome,
        hospital: req.user.hospital,
        tipo_usuario: req.user.tipo_usuario
      }
    }
  });
});

// Atualizar perfil do usuário logado
app.put("/api/auth/profile", authenticateToken, [
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  body('hospital').notEmpty().withMessage('Hospital é obrigatório'),
  body('tipo_usuario').isIn(['R1', 'R2', 'R3', 'R4', 'R5', 'Ortopedista']).withMessage('Tipo de usuário inválido')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Dados inválidos",
      errors: errors.array()
    });
  }

  const { nome, hospital, tipo_usuario } = req.body;

  db.run(
    `UPDATE users SET nome = ?, hospital = ?, tipo_usuario = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [nome, hospital, tipo_usuario, req.user.id],
    function (err) {
      if (err) {
        return res.status(500).json({ success: false, message: "Erro ao atualizar perfil" });
      }

      res.json({
        success: true,
        message: "Perfil atualizado com sucesso",
        data: {
          user: {
            id: req.user.id,
            email: req.user.email,
            nome,
            hospital,
            tipo_usuario
          }
        }
      });
    }
  );
});

// Rotas de Usuários (Administração)

// Listar todos os usuários
app.get("/api/users", authenticateToken, (req, res) => {
  db.all("SELECT id, email, nome, hospital, tipo_usuario, created_at FROM users ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Erro ao buscar usuários" });
    }

    res.json({
      success: true,
      data: rows
    });
  });
});

// Exportar usuários para Excel
app.get("/api/users/export", authenticateToken, (req, res) => {
  db.all("SELECT id, email, nome, hospital, tipo_usuario, created_at FROM users ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Erro ao buscar usuários" });
    }

    try {
      // Criar workbook e worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(rows.map(row => ({
        'ID': row.id,
        'Email': row.email,
        'Nome': row.nome,
        'Hospital': row.hospital,
        'Tipo de Usuário': row.tipo_usuario,
        'Data de Cadastro': new Date(row.created_at).toLocaleDateString('pt-BR')
      })));

      // Adicionar worksheet ao workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuários');

      // Gerar buffer do arquivo Excel
      const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

      // Configurar headers para download
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=usuarios_ortopedia_${new Date().toISOString().split('T')[0]}.xlsx`);

      res.send(excelBuffer);
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao gerar arquivo Excel" });
    }
  });
});

// Rotas da API de Questões (agora protegidas)

// Rotas do Simulado integradas diretamente

// Buscar questões para o simulado (5 por página)
app.get('/api/simulado/questoes', authenticateToken, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;
  
  const { area, ano, tipo } = req.query;
  
  let query = `
    SELECT q.*, 
           GROUP_CONCAT(a.id || '|' || a.letra || '|' || a.texto, ';;;') as alternativas
    FROM questoes q
    LEFT JOIN alternativas a ON q.id = a.questao_id
    WHERE 1=1
  `;
  
  const params = [];
  
  if (area && area !== 'todas') {
    query += ' AND q.area = ?';
    params.push(area);
  }
  
  if (ano && ano !== 'todos') {
    query += ' AND q.ano = ?';
    params.push(ano);
  }
  
  if (tipo && tipo !== 'todos') {
    query += ' AND q.tipo = ?';
    params.push(tipo);
  }
  
  query += ' GROUP BY q.id ORDER BY q.id LIMIT ? OFFSET ?';
  params.push(limit, offset);
  
  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar questões' });
    }
    
    // Processar alternativas
    const questoes = rows.map(row => {
      const alternativas = row.alternativas ? 
        row.alternativas.split(';;;').map(alt => {
          const [id, letra, texto] = alt.split('|');
          return { id: parseInt(id), letra, texto };
        }) : [];
      
      return {
        ...row,
        alternativas,
        alternativas: undefined // Remove o campo concatenado
      };
    });
    
    // Contar total de questões para paginação
    let countQuery = 'SELECT COUNT(*) as total FROM questoes WHERE 1=1';
    const countParams = [];
    
    if (area && area !== 'todas') {
      countQuery += ' AND area = ?';
      countParams.push(area);
    }
    
    if (ano && ano !== 'todos') {
      countQuery += ' AND ano = ?';
      countParams.push(ano);
    }
    
    if (tipo && tipo !== 'todos') {
      countQuery += ' AND tipo = ?';
      countParams.push(tipo);
    }
    
    db.get(countQuery, countParams, (err, countRow) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao contar questões' });
      }
      
      const total = countRow.total;
      const totalPages = Math.ceil(total / limit);
      
      res.json({
        questoes,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      });
    });
  });
});

// Buscar filtros disponíveis
app.get('/api/simulado/filtros', authenticateToken, (req, res) => {
  const queries = [
    'SELECT DISTINCT area FROM questoes WHERE area IS NOT NULL ORDER BY area',
    'SELECT DISTINCT ano FROM questoes WHERE ano IS NOT NULL ORDER BY ano DESC',
    'SELECT DISTINCT tipo FROM questoes WHERE tipo IS NOT NULL ORDER BY tipo'
  ];
  
  Promise.all(queries.map(query => 
    new Promise((resolve, reject) => {
      db.all(query, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    })
  )).then(([areas, anos, tipos]) => {
    res.json({
      areas: areas.map(row => row.area),
      anos: anos.map(row => row.ano),
      tipos: tipos.map(row => row.tipo)
    });
  }).catch(err => {
    res.status(500).json({ error: 'Erro ao buscar filtros' });
  });
});

// Buscar referência de uma questão
app.get('/api/simulado/questoes/:id/referencia', authenticateToken, (req, res) => {
  const questaoId = req.params.id;
  
  db.get('SELECT referencia_imagem, referencia_texto FROM questoes WHERE id = ?', 
    [questaoId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar referência' });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Questão não encontrada' });
    }
    
    res.json({
      imagem: row.referencia_imagem,
      texto: row.referencia_texto
    });
  });
});

// Verificar resposta
app.post('/api/simulado/questoes/:id/responder', authenticateToken, (req, res) => {
  const questaoId = req.params.id;
  const { alternativaId } = req.body;
  
  if (!alternativaId) {
    return res.status(400).json({ error: 'ID da alternativa é obrigatório' });
  }
  
  // Buscar a questão e alternativa correta
  db.get(`
    SELECT q.gabarito, q.comentario_gabarito,
           a.letra as alternativa_selecionada
    FROM questoes q
    LEFT JOIN alternativas a ON a.id = ? AND a.questao_id = q.id
    WHERE q.id = ?
  `, [alternativaId, questaoId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao verificar resposta' });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Questão ou alternativa não encontrada' });
    }
    
    const correto = row.alternativa_selecionada === row.gabarito;
    
    res.json({
      correto,
      gabarito: row.gabarito,
      comentario: row.comentario_gabarito,
      alternativa_selecionada: row.alternativa_selecionada
    });
  });
});

// Buscar comentários de uma questão
app.get('/api/simulado/questoes/:id/comentarios', authenticateToken, (req, res) => {
  const questaoId = req.params.id;
  
  db.all(`
    SELECT c.*, u.nome as autor_nome
    FROM comentarios c
    JOIN users u ON c.usuario_id = u.id
    WHERE c.questao_id = ?
    ORDER BY c.created_at DESC
  `, [questaoId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar comentários' });
    }
    
    res.json(rows);
  });
});

// Adicionar comentário
app.post('/api/simulado/questoes/:id/comentarios', authenticateToken, (req, res) => {
  const questaoId = req.params.id;
  const { texto } = req.body;
  const usuarioId = req.user.id;
  
  if (!texto || texto.trim().length === 0) {
    return res.status(400).json({ error: 'Texto do comentário é obrigatório' });
  }
  
  db.run(`
    INSERT INTO comentarios (questao_id, usuario_id, texto, created_at)
    VALUES (?, ?, ?, datetime('now'))
  `, [questaoId, usuarioId, texto.trim()], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao adicionar comentário' });
    }
    
    // Buscar o comentário criado com o nome do autor
    db.get(`
      SELECT c.*, u.nome as autor_nome
      FROM comentarios c
      JOIN users u ON c.usuario_id = u.id
      WHERE c.id = ?
    `, [this.lastID], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar comentário criado' });
      }
      
      res.status(201).json(row);
    });
  });
});

// Deletar comentário (apenas o próprio usuário)
app.delete('/api/simulado/comentarios/:id', authenticateToken, (req, res) => {
  const comentarioId = req.params.id;
  const usuarioId = req.user.id;
  
  // Verificar se o comentário pertence ao usuário
  db.get('SELECT usuario_id FROM comentarios WHERE id = ?', [comentarioId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao verificar comentário' });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Comentário não encontrado' });
    }
    
    if (row.usuario_id !== usuarioId) {
      return res.status(403).json({ error: 'Não autorizado a deletar este comentário' });
    }
    
    db.run('DELETE FROM comentarios WHERE id = ?', [comentarioId], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao deletar comentário' });
      }
      
      res.json({ message: 'Comentário deletado com sucesso' });
    });
  });
});

// Fim das rotas do simulado

// Rota para obter todas as questões com filtros opcionais
app.get("/api/questoes", authenticateToken, (req, res) => {
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
app.get("/api/questoes/:id", authenticateToken, (req, res) => {
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
app.post("/api/questoes", authenticateToken, (req, res) => {
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
app.put("/api/questoes/:id", authenticateToken, (req, res) => {
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
app.delete("/api/questoes/:id", authenticateToken, (req, res) => {
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
app.get("/api/estatisticas", authenticateToken, (req, res) => {
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
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Arquivo .env carregado com JWT_SECRET configurado`);
});