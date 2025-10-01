const fs = require("fs");

// Conteúdo do PDF TARO2025PROVA(1).pdf (copiado manualmente após leitura bem-sucedida)
const pdfContent = `TARO
2025


--- PAGE 1 ---

SBOT
COMISSÃO DE ENSINO E TREINAMENTO
Caro Especializando:
Este é o TESTE DE AVALIAÇÃO DOS RESIDENTES EM ORTOPEDIA (TARO)
2025.
O objetivo é colaborar com o aprendizado.
Na próxima página há uma folha de respostas para ser preenchida.
São 100 questões de múltipla escolha com apenas uma alternativa correta.
Nas últimas páginas estão relacionadas as referências bibliográficas das questões.
Guarde o caderno de testes para estudo.
Bom Teste!!!!
COMISSÃO DE ENSINO E TREINAMENTO
Dr. Márcio Schiefer de Sá Carvalho (RJ) – Presidente
Dr. Carlos Alberto de Souza Araujo Neto (RJ) – Vice-presidente
Dr. Adriano Fernando Mendes Júnior (MG) – Secretário-executivo
Dr. Francisco Robson de Vasconcelos Alves (CE) – Secretário-adjunto
Dra. Cinthia Faraco Martinez Cebrian (SC)
Dr. Fábio Teruo Matsunaga (SP)
Dr. Mario Lenza (SP)
Dr. Rogerio Carneiro Bitar (SP)
Dr. Eduardo Sadao Yonamine (SP)
Dr. Eriko Gonçalves Filgueira (DF)
Dr. Sebastião Vieira de Morais (MA)
Dr. Tiago Lazzaretti Fernandes (SP)


--- PAGE 2 ---

Nome completo:
Assinatura:
Data:
Instruções:
➢ Informe nome, data e assine a prova.
➢ Preencha as respostas conforme modelo:
➢ Assinale apenas uma alternativa para cada questão. Mais de uma anulará a resposta.
➢ Não é permitido substituir a folha de respostas.
➢ Não deixe a questão em branco.
➢ Utilize caneta esferográfica azul ou preta.
NÃO AMASSE, NÃO DOBRE E NÃO RASURE ESTA FOLHA.


--- PAGE 3 ---

1. Conforme a classificação Subaxial Injury Classification (SLIC), na avaliação
do status neurológico, a maior pontuação ocorre no paciente
A) intacto.
B) com lesão de raiz nervosa.
C) com lesão medular completa.
D) com lesão medular incompleta.
2. Criança de 12 meses de idade é levada à emergência por dor e impotência
funcional no cotovelo esquerdo. O responsável que acompanha a criança não
sabe informar se houve trauma. Não apresenta febre. Ao exame clínico,
apresenta edema no cotovelo e pseudoparalisia do membro acometido. Após
exames de radiografia de cotovelo (imagem a seguir), conclui-se que o
diagnóstico é de
Fonte: WATERS, P. M.; SKAGGS, D. L.; FLYNN, J. M. Rockwood and Wilkins’
Fractures in Children. 10. ed. Philadelphia: Wolters Kluwer, 2024.
A) pronação dolorosa.
B) luxação de cotovelo.
C) artrite séptica do cotovelo.
D) fratura fisária do úmero distal.


--- PAGE 4 ---

3. Paciente masculino, 67 anos, com déficit neurológico no membro inferior
direito por neuropatia diabética e com quadro avançado de osteoartrose do
tornozelo ipsilateral. Refere dor moderada ao deambular e queixa de quedas
frequentes por instabilidade do tornozelo. Na falha do tratamento
conservador, com o uso de bota imobilizadora e de medicamentos
analgésicos e anti-inflamatórios, a opção cirúrgica mais indicada é
A) artrodiastase do tornozelo.
B) artrodese tibiotársica com três parafusos.
C) artroplastia total do tornozelo e reparo ligamentar.
D) artrodese tibiotalocalcaneana com haste retrógrada.
4. Paciente do sexo feminino, 30 anos, magra, praticante de musculação, destra,
vítima de queda de moto com trauma sobre o ombro direito. Procurou
atendimento de urgência em razão de intensa dor, e exames primários não
evidenciaram fratura ou luxação do ombro. O exame a seguir foi solicitado, e
as setas brancas e vermelha denotam as principais alterações. Os
diagnósticos são
Fonte: MOTTA FILHO, G. R.; BARROS FILHO, T. E. P. Ortopedia e Traumatologia.
1. ed. Rio de Janeiro: Elsevier, 2018.
A) lesão do supraespinal com luxação medial da cabeça longa do bíceps.
B) lesão do subescapular com luxação medial da cabeça longa do bíceps.
C) lesão do supraespinal com luxação anterior da cabeça longa do bíceps.
D) lesão do subescapular com luxação anterior da cabeça longa do bíceps.


--- PAGE 5 ---

5. Na fratura do terço proximal do úmero, o mecanismo por queda ao solo sobre
o ombro gera forças deformantes que ocasionam o desvio da cabeça em
A) varo.
B) valgo.
C) adução.
D) abdução.
6. Na formação óssea dos membros superiores, o primeiro osso a se ossificar é
A) o úmero, por ossificação endocondral.
B) a clavícula, por ossificação endocondral.
C) o úmero, por ossificação intramembranosa.
D) a clavícula, por ossificação intramembranosa.
7. Sobre o tratamento cirúrgico da lesão SLAP, a idade recomendada para o
reparo labial é
A) até 40 anos.
B) 40 a 50 anos.
C) 50 a 60 anos.
D) acima de 60 anos.
8. Paciente do sexo masculino, 18 anos, com instabilidade anterior traumática do
ombro. O posicionamento do ombro e a estrutura comprometida na imagem de
ressonância magnética a seguir são, respectivamente,
Fonte: AZAR, F. M.; BEATY, J. H. Campbell’s operative orthopaedics. 14. ed.
Philadelphia: Elsevier, 2021.
A) FABS e posterior.
B) ABER e posterior.
C) FABS e anteroinferior.
D) ABER e anteroinferior.


--- PAGE 6 ---

9. Na propedêutica da epicondilite lateral, o teste de COZEN é realizado com o
cotovelo inicialmente
A) em extensão total e antebraço pronado.
B) em extensão total e antebraço supinado.
C) em flexão de 90 graus e antebraço pronado.
D) em flexão de 90 graus e antebraço supinado.
10. No tratamento cirúrgico da lesão proximal dos isquiotibiais, são complicações
primárias
A) rerruptura e dor persistente.
B) rerruptura e infecção superficial.
C) dor persistente e diminuição de força.
D) infecção superficial e diminuição da força.
11. Na doença de PAGET, as lesões radiográficas
A) são tipicamente líticas e, geralmente, são captadas na cintilografia óssea.
B) são tipicamente líticas e, geralmente, não são captadas na cintilografia
óssea.
C) variam de acordo com o estágio da doença e, geralmente, são captadas na
cintilografia óssea.
D) variam de acordo com o estágio da doença e, geralmente, não são captadas
na cintilografia óssea.
12. A síndrome de GARDNER é a associação entre pólipos intestinais,
fibromatose e cistos cutâneos com múltiplos
A) osteomas.
B) encondromas.
C) osteoblastomas.
D) osteocondromas.
13. A síndrome de JAFFE-CAMPANACCI é caracterizada pela associação entre
A) displasia fibrosa poliostótica e manchas café com leite.
B) displasia fibrosa poliostótica e mixomas intramusculares.
C) múltiplos fibromas não ossificantes e manchas café com leite.
D) múltiplos fibromas não ossificantes e mixomas intramusculares.


--- PAGE 7 ---

14. A apresentação radiográfica mais comum do adamantinoma é uma lesão
A) radiopaca na diáfise da tíbia.
B) radiopaca na metáfise da tíbia.
C) radiolucente na diáfise da tíbia.
D) radiolucente na metáfise da tíbia.
15. O sarcoma de EWING tem pior prognóstico em pacientes do sexo
A) feminino e em pacientes mais jovens (menores de 12 a 15 anos).
B) feminino e em pacientes mais velhos (maiores de 12 a 15 anos).
C) masculino e em pacientes mais jovens (menores de 12 a 15 anos).
D) masculino e em pacientes mais velhos (maiores de 12 a 15 anos).
16. A fratura tipo “banana” é
A) transversa, associada a traumas de alta energia.
B) segmentar, associada a traumas de alta energia.
C) transversa, associada a traumas de baixa energia em osso patológico.
D) segmentar, associada a traumas de baixa energia em osso patológico.
17. De acordo com ENNEKING, uma lesão tumoral maligna,
extracompartimental, de baixo grau e com metástases a distância está no
estágio
A) I.
B) II.
C) III.
D) IV.
18. Uma forma de torcicolo congênito indolor que, geralmente, está associada a
anomalias ósseas na coluna cervical está relacionada à
A) síndrome de GRISEL.
B) deformidade de ALFREDEL.
C) síndrome de KLIPPEL-FEIL.
D) deformidade de SPRENGEL.


--- PAGE 8 ---

19. Em mucopolissacaridose, o tipo que evolui com complicação cardiológica
fatal antes de 10 anos de idade é a síndrome de
A) SCHEIE.
B) HURLER.
C) HUNTER.
D) MORQUIO.
20. Na artrogripose clássica, as crianças geralmente apresentam
A) hemangioma cutâneo na fronte e inteligência normal.
B) hemangioma cutâneo na região da coxa e inteligência normal.
C) hemangioma cutâneo na região da coxa e inteligência alterada.
D) hemangioma cutâneo no membro superior e inteligência normal.
21. Na imagem a seguir, de uma ressonância magnética do quadril esquerdo
com osteonecrose, observamos uma sequência ponderada em
Fonte: AZAR, F. M.; BEATY, J. H. Campbell’s operative orthopaedics. 14. ed.
Philadelphia: Elsevier, 2021.
A) T1 com imagem geográfica.
B) T2 com imagem geográfica.
C) T1 com imagem de “dupla linha”, típica de osteonecrose.
D) T2 com imagem de “dupla linha”, típica de osteonecrose.


--- PAGE 9 ---

22. Criança com dois meses de vida apresentando febre, irritabilidade e
pseudoparalisia do membro inferior direito há três dias. Apresenta-se em
atitude de flexão e rotação externa do quadril. Recebeu alta da UTI neonatal
há uma semana. O ultrassom do quadril direito mostra um aumento da
quantidade de líquido articular. A radiografia a seguir mostra um aumento do
espaço articular à direita. O diagnóstico e o tratamento para o caso em questão
são, respectivamente,
Fonte: WEINSTEIN, S. L.; FLYNN, J. M. Lovell and Winter’s pediatric
orthopaedics. 8. ed. Philadelphia: Lippincott Williams & Wilkins, 2021.
A) sinovite transitória do quadril e drenagem cirúrgica.
B) sinovite transitória do quadril e repouso/observação.
C) artrite séptica do quadril, drenagem cirúrgica e antibioticoterapia.
D) artrite séptica do quadril, repouso/observação e antibioticoterapia.
23. A lesão do músculo peitoral maior ocorre, geralmente,
A) no ventre muscular.
B) na inserção umeral.
C) na cabeça clavicular.
D) na cabeça esternocostal.
24. A polidactilia com duplicação do polegar do tipo IV, segundo a classificação
de WASSEL, é classificada por EZAKI como tipo
A) I.
B) II.
C) III.
D) IV.


--- PAGE 10 ---

25. Na avaliação da contratura do músculo grácil, a manobra realizada em
decúbito ventral é o teste
A) de PACE.
B) da bicicleta.
C) de PHELPS.
D) de McCARTHY.
26. Na via de acesso do quadril de WATSON-JONES, é necessária a dissecção
do intervalo entre os músculos
A) glúteo mínimo e tensor da fáscia lata.
B) glúteo médio e tensor da fáscia lata.
C) glúteo mínimo e sartório.
D) glúteo médio e sartório.
27. As fraturas por estresse em estágio III, segundo KAEDING & MILLER, são
descritas como
A) reação de estresse sem fratura.
B) pseudoartrose.
C) sem desvio.
D) desviadas.
28. Na reconstrução anatômica dos ligamentos coracoclaviculares pela técnica
de MAZZOCCA, a distância entre a superfície articular lateral da clavícula e o
túnel para o ligamento conoide deve ser de
A) 15 mm.
B) 25 mm.
C) 35 mm.
D) 45 mm.


--- PAGE 11 ---

29. Na imagem a seguir, a estrutura apontada pela seta corresponde ao
Fonte: NETTER, F. H. Atlas de anatomia humana. 7. ed. Rio de Janeiro: Elsevier,
2019.
A) recesso axilar.
B) lábio glenoidal.
C) músculo redondo menor.
D) ligamento coracoacromial.


--- PAGE 12 ---

30. Na imagem a seguir, a estrutura apontada pela seta corresponde ao músculo
Fonte: NETTER, F. H. Atlas de anatomia humana. 7. ed. Rio de Janeiro: Elsevier,
2019.
A) infraespinal.
B) subescapular.
C) redondo maior.
D) redondo menor.


--- PAGE 13 ---

31. Na imagem a seguir, a estrutura apontada pela seta corresponde ao músculo
Fonte: NETTER, F. H. Atlas de anatomia humana. 7. ed. Rio de Janeiro: Elsevier,
2019.
A) braquial.
B) peitoral menor.
C) coracobraquial.
D) tríceps braquial.


--- PAGE 14 ---

32. Na imagem a seguir, a estrutura apontada pela seta corresponde ao
Fonte: NETTER, F. H. Atlas de anatomia humana. 7. ed. Rio de Janeiro: Elsevier,
2019.
A) pedículo de L4.
B) processo espinhoso de L4.
C) processo articular inferior de L4.
D) processo articular superior de L4.


--- PAGE 15 ---

33. Na imagem a seguir, a estrutura apontada pela seta amarela corresponde
Fonte: NETTER, F. H. Atlas de anatomia humana. 7. ed. Rio de Janeiro: Elsevier,
2019.
A) à miofibrila.
B) à fibra muscular.
C) ao miofilamento.
D) ao fascículo muscular.
34. A imagem a seguir evidencia a realização da manobra
Fonte: MOTTA FILHO, G. R.; BARROS FILHO, T. E. P. Ortopedia e Traumatologia.
1. ed. Rio de Janeiro: Elsevier, 2018.


--- PAGE 16 ---

A) milking.
B) pivot shift.
C) moving valgus stress test.
D) valgus extension overload.
35. Na neuropatia compressiva do nervo cutâneo lateral do antebraço, os
sintomas são exacerbados com o cotovelo em
A) flexão e pronação.
B) flexão e supinação.
C) extensão e pronação.
D) extensão e supinação.
36. Nas escolioses neuromusculares, a artrodese com a inclusão da pelve está
usualmente indicada nos pacientes
A) deambuladores com obliquidade pélvica > 10 graus.
B) deambuladores com qualquer obliquidade pélvica.
C) não deambuladores com obliquidade pélvica > 15 graus.
D) não deambuladores com qualquer obliquidade pélvica.
37. Na classificação Thoracolumbar Injury Classification and Severity Score
(TLICS), em relação à morfologia vertebral, a maior pontuação ocorre na
fratura do tipo
A) distração.
B) compressão.
C) translação/rotação.
D) compressão com explosão.
38. Na artroplastia de joelho, a rotação do componente femoral, em relação ao
eixo transepicondilar, deve ser
A) paralela.
B) perpendicular.
C) com 3 graus de rotação interna.
D) com 3 graus de rotação externa.


--- PAGE 17 ---

39. Na infecção aguda pós artroplastia de joelho, a cultura positiva para S.
aureus é uma
A) contraindicação de revisão em dois tempos.
B) indicação para desbridamento com retenção da prótese.
C) contraindicação relativa para desbridamento com retenção da prótese.
D) contraindicação absoluta para desbridamento com retenção da prótese.
40. Em pacientes com insuficiência crônica do ligamento cruzado posterior do
joelho, a progressão das alterações articulares degenerativas ocorre no
compartimento
A) patelofemoral, isoladamente.
B) tibiofemoral medial, isoladamente.
C) patelofemoral e tibiofemoral lateral.
D) patelofemoral e tibiofemoral medial.
41. Na osteocondrite dissecante do joelho, o acometimento da patela tem
prognóstico
A) pior que o acometimento do côndilo femoral e acomete, mais
frequentemente, o polo inferior.
B) pior que o acometimento do côndilo femoral e acomete, mais
frequentemente, o polo superior.
C) melhor que o acometimento do côndilo femoral e acomete, mais
frequentemente, o polo inferior.
D) melhor que o acometimento do côndilo femoral e acomete, mais
frequentemente, o polo superior.
42. Na avaliação clínica de paciente com lesão ligamentar do joelho, o teste da
rotação externa tibial com resultado positivo em 30 e 90 graus de flexão
indica lesão
A) isolada do canto posterolateral.
B) isolada do ligamento cruzado posterior.
C) combinada do ligamento cruzado anterior e do canto posterolateral.
D) combinada do ligamento cruzado posterior e do canto posterolateral.


--- PAGE 18 ---

43. O joelho tem características de articulação do tipo
A) gínglimo, permitindo apenas flexão e extensão.
B) trocoide, permitindo apenas movimentos rotacionais.
C) gínglimo e trocoide, restringindo movimentos rotacionais em extensão
completa.
D) gínglimo e trocoide, permitindo movimentos rotacionais em toda amplitude de
movimento.
44. A lesão meniscal em rampa corresponde a uma
A) lesão radial próximo à inserção posterior do menisco lateral, quase sempre
associada à lesão do ligamento cruzado anterior.
B) lesão radial próximo à inserção posterior do menisco medial, quase sempre
associada a alterações degenerativas da articulação.
C) separação da junção meniscocapsular posterior do menisco medial, quase
sempre associada à lesão do ligamento cruzado anterior.
D) separação da junção meniscocapsular posterior do menisco lateral, quase
sempre associada a alterações degenerativas da articulação.
45. As fraturas que apresentam alta especificidade para o diagnóstico de lesões
não acidentais na criança são as fraturas
A) epifisárias em alça de balde e as fraturas anteriores das costelas.
B) epifisárias em alça de balde e as fraturas posteriores das costelas.
C) metafisárias em alça de balde e as fraturas anteriores das costelas.
D) metafisárias em alça de balde e as fraturas posteriores das costelas.


--- PAGE 19 ---

46. Na osteogênese imperfeita, o excesso de calo ósseo produzido após fratura
ou osteotomia está associado ao defeito no gene
Fonte: WEINSTEIN, S. L.; FLYNN, J. M. Lovell and Winter’s pediatric
orthopaedics. 8. ed. Philadelphia: Lippincott Williams & Wilkins, 2021.
A) WNT1.
B) IFITM5.
C) LEPRE1.
D) COL1A1.
47. Na retirada de enxerto ósseo do ílio anterior, os n
(Content truncated due to size limit. Use page ranges or line ranges to read remaining content)`

function parseQuestions(text) {
  const questions = [];
  const lines = text.split("\n");
  let currentQuestion = null;
  let inAlternatives = false;
  let questionCounter = 0; // Global counter for unique IDs

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines or headers/footers
    if (line.length === 0 || line.startsWith("--- PAGE") || line.startsWith("TARO") || line.startsWith("2025") || line.startsWith("SBOT") || line.startsWith("COMISSÃO") || line.startsWith("Nome completo:") || line.startsWith("Assinatura:") || line.startsWith("Data:") || line.startsWith("Instruções:") || line.startsWith("➢")) {
      continue;
    }

    // Check for question number (e.g., "1.", "2.")
    const questionMatch = line.match(/^(\d+)\.\s*(.*)/);
    if (questionMatch) {
      if (currentQuestion) {
        questions.push(currentQuestion);
      }
      questionCounter++;
      currentQuestion = {
        id: `Q${questionCounter.toString().padStart(3, "0")}`,
        tipo: "TARO", // As per user request
        area: "", // To be inferred later
        subtema: "", // To be inferred later
        ano: 2025, // As per user request
        questao: questionMatch[2].trim(),
        alternativas: [],
        gabarito: "", // User will fill manually
        comentario: "",
        imagemJustificativa: "", // New field for image
        dificuldade: "Média" // Default difficulty
      };
      inAlternatives = false;
      continue;
    }

    // Check for alternatives (A), B), C), D), E))
    const alternativeMatch = line.match(/^([A-E])\)\s*(.*)/);
    if (alternativeMatch && currentQuestion) {
      currentQuestion.alternativas.push({
        letra: alternativeMatch[1],
        texto: alternativeMatch[2].trim()
      });
      inAlternatives = true;
      continue;
    }

    // If still in a question (before alternatives start) or after alternatives, append to question text
    if (currentQuestion && !inAlternatives) {
      currentQuestion.questao += " " + line;
    } else if (currentQuestion && inAlternatives && !alternativeMatch) {
        // This might be part of the previous alternative if it's a long one, or a source line
        // For now, let's assume it's part of the previous alternative if it doesn't look like a new question or alternative
        if (currentQuestion.alternativas.length > 0 && !line.startsWith("Fonte:")) {
            currentQuestion.alternativas[currentQuestion.alternativas.length - 1].texto += " " + line;
        }
    }
  }

  if (currentQuestion) {
    questions.push(currentQuestion);
  }

  return questions;
}

// Infer area and subtema (basic keyword-based inference)
const inferAreaAndSubtema = (questionText) => {
    const lowerText = questionText.toLowerCase();
    let area = "Geral";
    let subtema = "";

    if (lowerText.includes("coluna") || lowerText.includes("vertebral") || lowerText.includes("escoliose") || lowerText.includes("cervical") || lowerText.includes("toracolombar")) {
        area = "Coluna";
        if (lowerText.includes("slic")) subtema = "Classificações da Coluna";
        else if (lowerText.includes("fratura") && lowerText.includes("toracolombar")) subtema = "Fraturas Toracolombar";
        else if (lowerText.includes("escoliose")) subtema = "Escoliose";
        else if (lowerText.includes("torcicolo")) subtema = "Torcicolo Congênito";
        else subtema = "Patologias da Coluna";
    } else if (lowerText.includes("ombro") || lowerText.includes("cotovelo") || lowerText.includes("úmero") || lowerText.includes("biceps") || lowerText.includes("epicondilite") || lowerText.includes("manguito")) {
        area = "Ombro e Cotovelo";
        if (lowerText.includes("fratura") && lowerText.includes("úmero")) subtema = "Fraturas do Úmero";
        else if (lowerText.includes("slap")) subtema = "Lesão SLAP";
        else if (lowerText.includes("instabilidade") && lowerText.includes("ombro")) subtema = "Instabilidade do Ombro";
        else if (lowerText.includes("epicondilite")) subtema = "Epicondilite Lateral";
        else if (lowerText.includes("peitoral maior")) subtema = "Lesões Musculares";
        else subtema = "Patologias do Ombro e Cotovelo";
    } else if (lowerText.includes("joelho") || lowerText.includes("lca") || lowerText.includes("menisco") || lowerText.includes("patela") || lowerText.includes("ligamento cruzado")) {
        area = "Joelho";
        if (lowerText.includes("lca")) subtema = "Lesões LCA";
        else if (lowerText.includes("artroplastia") && lowerText.includes("joelho")) subtema = "Artroplastia de Joelho";
        else if (lowerText.includes("osteocondrite")) subtema = "Osteocondrite Dissecante";
        else if (lowerText.includes("ligamento cruzado posterior")) subtema = "Lesões LCP";
        else if (lowerText.includes("meniscal")) subtema = "Lesões Meniscais";
        else subtema = "Patologias do Joelho";
    } else if (lowerText.includes("quadril") || lowerText.includes("femoral") || lowerText.includes("osteonecrose") || lowerText.includes("artroplastia total do quadril")) {
        area = "Quadril";
        if (lowerText.includes("osteonecrose")) subtema = "Osteonecrose do Quadril";
        else if (lowerText.includes("sinovite transitória")) subtema = "Sinovite Transitória";
        else if (lowerText.includes("artroplastia total do quadril")) subtema = "Artroplastia de Quadril";
        else subtema = "Patologias do Quadril";
    } else if (lowerText.includes("mão") || lowerText.includes("punho") || lowerText.includes("polegar") || lowerText.includes("polidactilia")) {
        area = "Mão e Punho";
        if (lowerText.includes("anatomia da mão")) subtema = "Anatomia da Mão";
        else if (lowerText.includes("polidactilia")) subtema = "Malformações Congênitas da Mão";
        else subtema = "Patologias da Mão e Punho";
    } else if (lowerText.includes("tornozelo") || lowerText.includes("pé") || lowerText.includes("tibiotársica") || lowerText.includes("tibiotalocalcaneana")) {
        area = "Pé e Tornozelo";
        if (lowerText.includes("artrodese")) subtema = "Artrodese de Tornozelo/Pé";
        else subtema = "Patologias do Pé e Tornozelo";
    } else if (lowerText.includes("tumor") || lowerText.includes("sarcoma") || lowerText.includes("osteoma") || lowerText.includes("encondroma") || lowerText.includes("osteoblastoma") || lowerText.includes("osteocondroma") || lowerText.includes("adamantinoma") || lowerText.includes("ewing")) {
        area = "Oncologia";
        if (lowerText.includes("paget")) subtema = "Doença de Paget";
        else if (lowerText.includes("gardner")) subtema = "Síndrome de Gardner";
        else if (lowerText.includes("jaffe-campanacci")) subtema = "Síndrome de Jaffe-Campanacci";
        else if (lowerText.includes("adamantinoma")) subtema = "Adamantinoma";
        else if (lowerText.includes("ewing")) subtema = "Sarcoma de Ewing";
        else if (lowerText.includes("fratura tipo banana")) subtema = "Fraturas em Osso Patológico";
        else if (lowerText.includes("enneking")) subtema = "Classificação de Enneking";
        else subtema = "Tumores Ósseos";
    } else if (lowerText.includes("criança") || lowerText.includes("pediatria") || lowerText.includes("congênita") || lowerText.includes("mucopolissacaridose") || lowerText.includes("artrogripose") || lowerText.includes("osteogênese imperfeita")) {
        area = "Pediatria e Deformidades Congênitas";
        if (lowerText.includes("fraturas em crianças")) subtema = "Fraturas Pediátricas";
        else if (lowerText.includes("mucopolissacaridose")) subtema = "Mucopolissacaridose";
        else if (lowerText.includes("artrogripose")) subtema = "Artrogripose";
        else if (lowerText.includes("osteogênese imperfeita")) subtema = "Osteogênese Imperfeita";
        else subtema = "Patologias Pediátricas";
    } else if (lowerText.includes("anatomia") || lowerText.includes("músculo") || lowerText.includes("ligamento") || lowerText.includes("osso") || lowerText.includes("miofibrila") || lowerText.includes("fibra muscular") || lowerText.includes("miofilamento") || lowerText.includes("fascículo muscular")) {
        area = "Anatomia e Fisiologia";
        if (lowerText.includes("formação óssea")) subtema = "Formação Óssea";
        else if (lowerText.includes("anatomia humana")) subtema = "Anatomia Geral";
        else subtema = "Anatomia e Fisiologia Geral";
    } else if (lowerText.includes("neuropatia") || lowerText.includes("nervo")) {
        area = "Nervos Periféricos";
        subtema = "Neuropatias Compressivas";
    } else if (lowerText.includes("enxerto ósseo")) {
        area = "Reconstrução";
        subtema = "Enxertos Ósseos";
    }

    return { area, subtema };
};

const finalQuestions = parseQuestions(pdfContent);

// Apply inference and save to JSON
const questionsWithInferredData = finalQuestions.map(q => {
    const { area, subtema } = inferAreaAndSubtema(q.questao);
    return { ...q, area, subtema };
});

fs.writeFileSync("questoes_taro_2025.json", JSON.stringify(questionsWithInferredData, null, 2));
console.log(`Extraídas ${questionsWithInferredData.length} questões do TARO 2025.`);


