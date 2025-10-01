const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'questoes_taro_2025.json');
let questoes = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const q002Index = questoes.findIndex(q => q.id === 'Q002');

if (q002Index !== -1) {
  questoes[q002Index].imagemQuestao = '/images/002.png';
  fs.writeFileSync(filePath, JSON.stringify(questoes, null, 2), 'utf8');
  console.log('Caminho da imagem para Q002 adicionado com sucesso.');
} else {
  console.log('Questão Q002 não encontrada.');
}


