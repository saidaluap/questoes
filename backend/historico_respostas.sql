CREATE TABLE IF NOT EXISTS historico_respostas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  questao_id INTEGER NOT NULL,
  resposta_usuario TEXT NOT NULL,
  resposta_correta TEXT NOT NULL,
  acertou BOOLEAN NOT NULL,
  data_resposta DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_historico_user_id ON historico_respostas(user_id);
CREATE INDEX IF NOT EXISTS idx_historico_questao_id ON historico_respostas(questao_id);
CREATE INDEX IF NOT EXISTS idx_historico_data ON historico_respostas(data_resposta);