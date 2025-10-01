import React, { useState } from 'react';
import { CheckCircle, XCircle, MessageCircle, BookOpen } from 'lucide-react';

const QuestaoCard = ({ questao, numero, onRespostaSalva }) => {
  const [respostaSelecionada, setRespostaSelecionada] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [mostrarComentario, setMostrarComentario] = useState(false);

const handleResponder = async () => {
  if (respostaSelecionada) {
    setMostrarResultado(true);
    setMostrarComentario(true);

    // Faz o POST para salvar a resposta no backend
    try {
      await fetch('http://localhost:3001/api/historico/salvar-resposta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Inclua o token no cabeçalho se necessário
        },
        body: JSON.stringify({
          questao_id: questao.id,
          resposta_usuario: respostaSelecionada,
          resposta_correta: questao.gabarito,
          acertou: respostaSelecionada === questao.gabarito ? 1 : 0,
        }),
      });
      // Após salvar, chama a função que atualiza o histórico
      onRespostaSalva && onRespostaSalva();
    } catch (error) {
      console.error('Erro ao salvar resposta:', error);
      // Aqui pode colocar um feedback visual para o usuário, se desejar
    }
  }
};



  const isCorreta = respostaSelecionada === questao.gabarito;


  
  const getDificuldadeCor = (dificuldade) => {
    switch (dificuldade) {
      case 'Fácil': return 'bg-green-100 text-green-800';
      case 'Média': return 'bg-yellow-100 text-yellow-800';
      case 'Difícil': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoCor = (tipo) => {
    return tipo === 'TEOT' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Cabeçalho da questão */}
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-blue-600">{numero}</span>
          <span className="text-lg font-bold text-gray-800">{questao.id}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTipoCor(questao.tipo)}`}>
            {questao.tipo}
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {questao.area}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDificuldadeCor(questao.dificuldade)}`}>
            {questao.dificuldade}
          </span>
        </div>
      </div>

      {/* Informações da questão */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <strong>Subtema:</strong> {questao.subtema}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Ano:</strong> {questao.ano}
        </p>
      </div>

      {/* Texto da questão */}
      <div className="mb-6">
        <p className="text-gray-800 leading-relaxed">{questao.questao}</p>
        {questao.imagemQuestao && (
          <div className="mt-4">
            <img 
              src={questao.imagemQuestao} 
              alt="Imagem da questão" 
              className="max-w-full h-auto rounded border shadow-sm"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <p className="text-xs text-red-500 mt-2" style={{display: 'none'}}>
              ⚠️ Erro ao carregar imagem da questão. Verifique se o caminho está correto.
            </p>
          </div>
        )}
      </div>

      {/* Alternativas */}
      <div className="space-y-3 mb-6">
        {questao.alternativas.map((alternativa) => (
          <label
            key={alternativa.letra}
            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              // Lógica de cores para feedback visual
              mostrarResultado
                ? (alternativa.letra === questao.gabarito)
                  ? 'bg-green-50 border-green-300' // Gabarito correto (sempre verde após mostrar resultado)
                  : (respostaSelecionada === alternativa.letra && alternativa.letra !== questao.gabarito)
                    ? 'bg-red-50 border-red-300'    // Resposta selecionada e incorreta (vermelho)
                    : 'border-gray-200' // Outras alternativas (neutras)
                : respostaSelecionada === alternativa.letra
                  ? 'bg-blue-50 border-blue-300' // Alternativa selecionada antes de mostrar resultado (azul)
                  : 'hover:bg-gray-50 border-gray-200'
            }`}
          >
            <input
              type="radio"
              name={`questao-${questao.id}`}
              value={alternativa.letra}
              checked={respostaSelecionada === alternativa.letra}
              onChange={(e) => {
                setRespostaSelecionada(e.target.value);
                console.log('DEBUG: Resposta Selecionada:', e.target.value);
              }}
              disabled={mostrarResultado}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-orange-600">{alternativa.letra}:</span>
                <span className="text-gray-800">{alternativa.texto}</span>
                {mostrarResultado && alternativa.letra === questao.gabarito && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
                {mostrarResultado && 
                 respostaSelecionada === alternativa.letra && 
                 alternativa.letra !== questao.gabarito && (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Botão Responder */}
      {!mostrarResultado && (
        <button
  onClick={handleResponder}

          disabled={!respostaSelecionada}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            respostaSelecionada
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Responder
        </button>
      )}

      {/* Resultado e Comentário */}
      {mostrarResultado && (
        <div className="mt-6 pt-6 border-t">
          <div className={`flex items-center gap-2 mb-4 p-3 rounded-lg ${
            isCorreta ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {isCorreta ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <XCircle className="h-5 w-5" />
            )}
            <span className="font-medium">
              {isCorreta ? 'Resposta Correta!' : 'Resposta Incorreta'}
            </span>
            <span className="text-sm">
              Gabarito: {questao.gabarito}
            </span>
          </div>

          {mostrarComentario && questao.comentario && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Comentário:</span>
              </div>
              <p className="text-blue-700 leading-relaxed">{questao.comentario}</p>
            </div>
          )}

          {/* Imagem de Justificativa */}
          {mostrarComentario && questao.imagemJustificativa && (
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-800">Imagem de Justificativa:</span>
              </div>
              <img 
                src={questao.imagemJustificativa} 
                alt="Justificativa da questão" 
                className="max-w-full h-auto rounded border shadow-sm"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <p className="text-xs text-red-500 mt-2" style={{display: 'none'}}>
                ⚠️ Erro ao carregar imagem. Verifique se o caminho está correto.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Ações adicionais */}
      <div className="mt-6 pt-4 border-t flex flex-wrap gap-4 text-sm">
        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
          <BookOpen className="h-4 w-4" />
          Gabarito Comentado
        </button>
        <button className="text-gray-600 hover:text-blue-600 transition-colors">
          Notificar Erro
        </button>
      </div>
    </div>
  );
};

export default QuestaoCard;

