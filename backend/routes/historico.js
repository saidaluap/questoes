const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware para verificar token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Token de acesso requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'seu_jwt_secret_aqui');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token inválido' });
  }
};

// Salvar resposta do usuário
router.post('/salvar-resposta', verifyToken, (req, res) => {
  const { questao_id, resposta_usuario, resposta_correta } = req.body;
  const user_id = req.user.id;
  const acertou = resposta_usuario === resposta_correta;

  if (!questao_id || !resposta_usuario || !resposta_correta) {
    return res.status(400).json({
      success: false,
      message: 'Dados obrigatórios: questao_id, resposta_usuario, resposta_correta'
    });
  }

  const db = req.app.get('db');

  // Primeiro, deletar resposta anterior se existir
  const deleteQuery = `DELETE FROM historico_respostas WHERE user_id = ? AND questao_id = ?`;
  db.run(deleteQuery, [user_id, questao_id], function(deleteErr) {
    if (deleteErr) {
      console.error('Erro ao deletar resposta anterior:', deleteErr);
      return res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }

    // Inserir nova resposta
    const insertQuery = `
      INSERT INTO historico_respostas (user_id, questao_id, resposta_usuario, resposta_correta, acertou)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.run(insertQuery, [user_id, questao_id, resposta_usuario, resposta_correta, acertou], function(insertErr) {
      if (insertErr) {
        console.error('Erro ao salvar resposta:', insertErr);
        return res.status(500).json({ success: false, message: 'Erro ao salvar resposta' });
      }

      res.json({
        success: true,
        message: 'Resposta salva com sucesso',
        data: {
          id: this.lastID,
          questao_id,
          resposta_usuario,
          resposta_correta,
          acertou
        }
      });
    });
  });
});

// Buscar histórico de respostas do usuário
router.get('/historico', verifyToken, (req, res) => {
  const user_id = req.user.id;
  const { search, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const db = req.app.get('db');

  let whereClause = 'WHERE hr.user_id = ?';
  let queryParams = [user_id];

  if (search && search.trim()) {
    whereClause += ` AND (q.questao LIKE ? OR q.area LIKE ? OR q.subtema LIKE ?)`;
    const searchTerm = `%${search.trim()}%`;
    queryParams.push(searchTerm, searchTerm, searchTerm);
  }

  // Query para buscar histórico com dados das questões
  const query = `
    SELECT 
      hr.id,
      hr.questao_id,
      hr.resposta_usuario,
      hr.resposta_correta,
      hr.acertou,
      hr.data_resposta,
      q.questao,
      q.tipo,
      q.area,
      q.subtema,
      q.ano,
      q.alternativas
    FROM historico_respostas hr
    LEFT JOIN questoes q ON hr.questao_id = q.id
    ${whereClause}
    ORDER BY hr.data_resposta DESC
    LIMIT ? OFFSET ?
  `;

  // Query para contar total de registros
  const countQuery = `
    SELECT COUNT(*) as total
    FROM historico_respostas hr
    LEFT JOIN questoes q ON hr.questao_id = q.id
    ${whereClause}
  `;

  // Executar query de contagem
  db.get(countQuery, queryParams, (countErr, countResult) => {
    if (countErr) {
      console.error('Erro ao contar registros:', countErr);
      return res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }

    const total = countResult.total;
    const totalPages = Math.ceil(total / limit);

    // Executar query principal
    queryParams.push(parseInt(limit), parseInt(offset));
    
    db.all(query, queryParams, (err, rows) => {
      if (err) {
        console.error('Erro ao buscar histórico:', err);
        return res.status(500).json({ success: false, message: 'Erro ao buscar histórico' });
      }

      // Processar alternativas (converter de JSON string para array)
      const processedRows = rows.map(row => ({
        ...row,
        alternativas: row.alternativas ? JSON.parse(row.alternativas) : []
      }));

      res.json({
        success: true,
        data: processedRows,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      });
    });
  });
});

// Buscar estatísticas do usuário
router.get('/estatisticas', verifyToken, (req, res) => {
  const user_id = req.user.id;
  const db = req.app.get('db');

  const query = `
    SELECT 
      COUNT(*) as total_respostas,
      SUM(CASE WHEN acertou = 1 THEN 1 ELSE 0 END) as total_acertos,
      SUM(CASE WHEN acertou = 0 THEN 1 ELSE 0 END) as total_erros,
      ROUND(
        (SUM(CASE WHEN acertou = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)), 1
      ) as percentual_acertos
    FROM historico_respostas 
    WHERE user_id = ?
  `;

  db.get(query, [user_id], (err, row) => {
    if (err) {
      console.error('Erro ao buscar estatísticas:', err);
      return res.status(500).json({ success: false, message: 'Erro ao buscar estatísticas' });
    }

    res.json({
      success: true,
      data: {
        total_respostas: row.total_respostas || 0,
        total_acertos: row.total_acertos || 0,
        total_erros: row.total_erros || 0,
        percentual_acertos: row.percentual_acertos || 0
      }
    });
  });
});

// Deletar resposta específica
router.delete('/deletar-resposta/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  const db = req.app.get('db');

  if (!id) {
    return res.status(400).json({ success: false, message: 'ID da resposta é obrigatório' });
  }

  const query = `DELETE FROM historico_respostas WHERE id = ? AND user_id = ?`;

  db.run(query, [id, user_id], function(err) {
    if (err) {
      console.error('Erro ao deletar resposta:', err);
      return res.status(500).json({ success: false, message: 'Erro ao deletar resposta' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ success: false, message: 'Resposta não encontrada' });
    }

    res.json({ success: true, message: 'Resposta deletada com sucesso' });
  });
});

module.exports = router;

