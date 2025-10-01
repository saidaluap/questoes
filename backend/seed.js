const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

// Conectar ao banco de dados
const db = new sqlite3.Database("./questoes.db");

// Carregar questões do arquivo JSON gerado
const questoesTARO2025 = JSON.parse(fs.readFileSync("./questoes_taro_2025.json", "utf8"));
const questoesTEOT2024 = JSON.parse(fs.readFileSync("./questoes_teot_2024_modified.json", "utf8"));
const questoesTEOT2023 = JSON.parse(fs.readFileSync("./questoes_teot_2023_modified.json", "utf8"));

const todasAsQuestoes = questoesTARO2025.concat(questoesTEOT2024).concat (questoesTEOT2023);

// Inserir questões no banco
console.log("Populando banco de dados com questões do TARO 2025 e TEOT 2024 (IDs únicos)...");

db.serialize(() => {
  // Limpar a tabela antes de inserir novas questões
  db.run("DELETE FROM questoes", (err) => {
    if (err) {
      console.error("Erro ao limpar a tabela de questões:", err.message);
    } else {
      console.log("Tabela de questões limpa.");
    }
  });

  const stmt = db.prepare(
    `INSERT INTO questoes (id, tipo, area, subtema, ano, questao, alternativas, gabarito, comentario, imagemJustificativa, imagemQuestao, dificuldade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );

  todasAsQuestoes.forEach((questao) => {
    stmt.run(
      [
        questao.id,
        questao.tipo,
        questao.area,
        questao.subtema,
        questao.ano,
        questao.questao,
        JSON.stringify(questao.alternativas),
        questao.gabarito,
        questao.comentario,
        questao.imagemJustificativa,
        questao.imagemQuestao,
        questao.dificuldade,
      ],
      function (err) {
        if (err) {
          console.error(`Erro ao inserir questão ${questao.id}:`, err.message);
        }
      }
    );
  });

  stmt.finalize(() => {
    db.close((err) => {
      if (err) {
        console.error("Erro ao fechar banco:", err.message);
      } else {
        console.log("Banco de dados populado e conexão fechada.");
      }
    });
  });
});


