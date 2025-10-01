import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Header from './Header';
import Footer from './Footer';

function Dashboard() {
  const { user, token } = useAuth();
  const [questoes, setQuestoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filtros, setFiltros] = useState({
    tipo: '',
    area: '',
    subtema: '',
    ano: '',
    palavraChave: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    teot: 0,
    taro: 0,
    areas: 0
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState({});
  const [activeTab, setActiveTab] = useState({});
  const [comentarios, setComentarios] = useState({});
  const [novoComentario, setNovoComentario] = useState({});
  const [loadingComentarios, setLoadingComentarios] = useState({});
  const [notificacaoErro, setNotificacaoErro] = useState({});
  const [loadingNotificacao, setLoadingNotificacao] = useState({});
  
  const [historico, setHistorico] = useState([]);

  const QUESTIONS_PER_PAGE = 5;

  const fetchQuestoes = async () => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
      Object.keys(filtros).forEach(key => {
        if (filtros[key]) {
          params.append(key, filtros[key]);
        }
      });
      params.append('page', currentPage);
      params.append('limit', QUESTIONS_PER_PAGE);

      const response = await fetch(`http://localhost:3001/api/questoes?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setQuestoes(data.data);
        
        // Usar os dados de paginação da API se disponíveis
        if (data.pagination) {
          setTotalPages(data.pagination.totalPages);
        } else {
          // Fallback para cálculo manual se não houver dados de paginação
          const total = data.total || data.data.length;
          setTotalPages(Math.ceil(total / QUESTIONS_PER_PAGE));
        }
        
        // Atualizar estatísticas com o total filtrado
        const totalItems = data.pagination ? data.pagination.totalItems : (data.total || data.data.length);
        setStats(prev => ({
          ...prev,
          total: totalItems
        }));
        
        // Se não há filtros, buscar estatísticas completas
        if (!Object.values(filtros).some(f => f)) {
          fetchFullStats();
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erro ao carregar questões');
      }
    } catch (error) {
      console.error('Erro ao buscar questões:', error);
      setError('Erro de conexão. Verifique se o servidor está rodando na porta 3001.');
    } finally {
      setLoading(false);
    }
  };

const fetchHistorico = async () => {
  try {
    const res = await fetch('http://localhost:3001/api/historico', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      setHistorico(data.data); // ajuste conforme response real
    } else {
      console.error('Erro ao buscar histórico');
    }
  } catch (error) {
    console.error('Erro ao buscar histórico', error);
  }
};


  const fetchFullStats = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/questoes`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const total = data.total || data.data.length;
        const teot = data.data ? data.data.filter(q => q.tipo === 'TEOT').length : 0;
        const taro = data.data ? data.data.filter(q => q.tipo === 'TARO').length : 0;
        const areas = data.data ? new Set(data.data.map(q => q.area)).size : 0;
        
        setStats({ total, teot, taro, areas });
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  };

  useEffect(() => {
  fetchQuestoes();
  //fetchHistorico(); // Adicione esta linha aqui
}, [token, currentPage, filtros]);


  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }));
    setCurrentPage(1); // Resetar para primeira página quando filtro mudar
  };

  const aplicarFiltros = () => {
    setCurrentPage(1); // Resetar para primeira página
    fetchQuestoes();
  };

  const limparFiltros = () => {
    setFiltros({
      tipo: '',
      area: '',
      subtema: '',
      ano: '',
      palavraChave: ''
    });
    setCurrentPage(1);
    setTimeout(() => {
      fetchQuestoes();
    }, 100);
  };

const handleAnswerSelect = (questionId, selectedAnswer) => {
  setUserAnswers(prev => ({
    ...prev,
    [questionId]: selectedAnswer
  }));
};

const handleResponder = async (questionId) => {
  const userAnswer = userAnswers[questionId];
  const questao = questoes.find(q => q.id === questionId);

  // Verifica se existe resposta e questão válida antes de continuar
  if (!userAnswer || !questao) return;

  // Cria o objeto novaResposta aqui, após a verificação
  const novaResposta = {
    questao_id: questionId,
    resposta_usuario: userAnswer,
    resposta_correta: questao.gabarito,
    acertou: userAnswer === questao.gabarito,
    data_resposta: new Date().toISOString(),
    questao: questao.questao,
    tipo: questao.tipo,
    area: questao.area,
    subtema: questao.subtema,
    ano: questao.ano,
    alternativas: questao.alternativas
  };

  try {
    const response = await fetch('http://localhost:3001/api/historico/salvar-resposta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        questao_id: questionId,
        resposta_usuario: userAnswer,
        resposta_correta: questao.gabarito,
        acertou: userAnswer === questao.gabarito
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Resposta salva no histórico com sucesso');
      // Atualiza o estado local do histórico para refletir a nova resposta imediatamente
      setHistorico(prev => {
  const novoHistorico = [
    ...prev.filter(r => String(r.questao_id) !== String(novaResposta.questao_id)),
    novaResposta
  ];
  console.log("novoHistorico após salvar:", novoHistorico);
  console.log("historico atual:", historico);
  return novoHistorico;
});

    } else {
      console.error('Erro ao salvar resposta no histórico');
    }
  } catch (error) {
    console.error('Erro ao salvar resposta:', error);
  }

  // Salvar também no localStorage como backup
  const historicoLocal = JSON.parse(localStorage.getItem('historico_respostas') || '[]');

  // Remove resposta anterior se existir
  const historicoFiltrado = historicoLocal.filter(r => r.questao_id !== questionId);
  historicoFiltrado.unshift(novaResposta);

  // Mantém apenas as últimas 100 respostas no localStorage
  const historicoLimitado = historicoFiltrado.slice(0, 100);
  localStorage.setItem('historico_respostas', JSON.stringify(historicoLimitado));

  // Atualiza UI para mostrar o feedback e ativa aba "gabarito"
  setShowFeedback(prev => ({
    ...prev,
    [questionId]: true
  }));
  setActiveTab(prev => ({
    ...prev,
    [questionId]: 'gabarito'
  }));
};

  const handleTabClick = (questionId, tabName) => {
    setActiveTab(prev => ({
      ...prev,
      [questionId]: tabName
    }));
    
    // Carregar comentários quando a aba de comentários for clicada
    if (tabName === 'comentarios' && !comentarios[questionId]) {
      fetchComentarios(questionId);
    }
  };

  const fetchComentarios = async (questionId) => {
    setLoadingComentarios(prev => ({ ...prev, [questionId]: true }));
    
    try {
      const response = await fetch(`http://localhost:3001/api/questoes/${questionId}/comentarios`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setComentarios(prev => ({
          ...prev,
          [questionId]: data.data
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    } finally {
      setLoadingComentarios(prev => ({ ...prev, [questionId]: false }));
    }
  };

  const handleComentarioSubmit = async (questionId) => {
    const comentarioData = novoComentario[questionId];
    
    if (!comentarioData?.comentario?.trim()) {
      alert('Por favor, escreva um comentário.');
      return;
    }
    
    if (!comentarioData?.usuario_nome?.trim()) {
      alert('Por favor, informe seu nome.');
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3001/api/questoes/${questionId}/comentarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(comentarioData)
      });
      
      if (response.ok) {
        // Limpar o formulário
        setNovoComentario(prev => ({
          ...prev,
          [questionId]: { usuario_nome: '', usuario_hospital: '', comentario: '' }
        }));
        
        // Recarregar comentários
        fetchComentarios(questionId);
        alert('Comentário adicionado com sucesso!');
      } else {
        alert('Erro ao adicionar comentário.');
      }
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
      alert('Erro ao enviar comentário.');
    }
  };

  const handleComentarioChange = (questionId, field, value) => {
    setNovoComentario(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: value
      }
    }));
  };

  const handleNotificacaoErroSubmit = async (questionId) => {
    const descricaoErro = notificacaoErro[questionId]?.descricao_erro;
    const usuarioNome = notificacaoErro[questionId]?.usuario_nome;
    
    if (!descricaoErro?.trim()) {
      alert('Por favor, descreva o erro encontrado.');
      return;
    }
    
    setLoadingNotificacao(prev => ({ ...prev, [questionId]: true }));
    
    try {
      const response = await fetch(`http://localhost:3001/api/questoes/${questionId}/notificar-erro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          descricao_erro: descricaoErro,
          usuario_nome: usuarioNome || 'Anônimo'
        })
      });
      
      if (response.ok) {
        // Limpar o formulário
        setNotificacaoErro(prev => ({
          ...prev,
          [questionId]: { usuario_nome: '', descricao_erro: '' }
        }));
        
        alert('Notificação de erro enviada com sucesso! O administrador será notificado por email.');
      } else {
        alert('Erro ao enviar notificação.');
      }
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
      alert('Erro ao enviar notificação.');
    } finally {
      setLoadingNotificacao(prev => ({ ...prev, [questionId]: false }));
    }
  };

  const handleNotificacaoErroChange = (questionId, field, value) => {
    setNotificacaoErro(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: value
      }
    }));
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setUserAnswers({});
      setShowFeedback({});
      setActiveTab({});
      // Scroll para o topo da página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Botão Previous
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => goToPage(currentPage - 1)}
          className="pagination-btn"
        >
          ◀ Previous
        </button>
      );
    }

    // Números das páginas
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`pagination-btn ${i === currentPage ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    // Reticências se necessário
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="dots" className="pagination-dots">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className="pagination-btn"
        >
          {totalPages}
        </button>
      );
    }

    // Botão Next
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => goToPage(currentPage + 1)}
          className="pagination-btn"
        >
          Next ▶
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="dashboard-header">
            <h1>🔍 Banco de Questões</h1>
          </div>

          {/* Filtros */}
          <div className="filters-container">
            <div className="filters-grid">
              <div className="filter-group">
                <label>Palavra Chave</label>
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="search-input"
                  value={filtros.palavraChave}
                  onChange={(e) => handleFiltroChange('palavraChave', e.target.value)}
                />
              </div>
              <div className="filter-group">
                <label>Tipo de Prova</label>
                <select
                  className="filter-select"
                  value={filtros.tipo}
                  onChange={(e) => handleFiltroChange('tipo', e.target.value)}
                >
                  <option value="">Selecione...</option>
                  <option value="TEOT">TEOT</option>
                  <option value="TARO">TARO</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Área Anatômica</label>
                <select
                  className="filter-select"
                  value={filtros.area}
                  onChange={(e) => handleFiltroChange('area', e.target.value)}
                >
                  <option value="">Selecione...</option>
                  <option value="Trauma">Trauma</option>
                  <option value="Ortopedia Pediátrica">Ortopedia Pediátrica</option>
                  <option value="Coluna">Coluna</option>
                  <option value="Mão">Mão</option>
                  <option value="Joelho">Joelho</option>
                  <option value="Quadril">Quadril</option>
                  <option value="Ombro">Ombro</option>
                  <option value="Pé e Tornozelo">Pé e Tornozelo</option>
                  <option value="Tumores">Tumores</option>
                  <option value="Infecção">Infecção</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Ano</label>
                <select
                  className="filter-select"
                  value={filtros.ano}
                  onChange={(e) => handleFiltroChange('ano', e.target.value)}
                >
                  <option value="">Selecione...</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
            </div>
            
            <a 
              href="#" 
              className="advanced-filters-link"
              onClick={(e) => {
                e.preventDefault();
                setShowAdvancedFilters(!showAdvancedFilters);
              }}
            >
              Mostrar filtros avançados ↓
            </a>

            <div className="filter-buttons">
              <button onClick={aplicarFiltros} className="btn btn-filter">
                🔍 Filtrar
              </button>
              <button onClick={limparFiltros} className="btn btn-clear">
                ✕ Limpar
              </button>
            </div>

            <div className="filter-info">
              Filtrar por: Os seus filtros aparecerão aqui.
            </div>
          </div>

          {/* Estatísticas */}
          <div className="stats-grid">
            <div className="stat-card blue">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total de Questões</div>
            </div>
            <div className="stat-card green">
              <div className="stat-number">{stats.teot}</div>
              <div className="stat-label">TEOT</div>
            </div>
            <div className="stat-card purple">
              <div className="stat-number">{stats.taro}</div>
              <div className="stat-label">TARO</div>
            </div>
            <div className="stat-card orange">
              <div className="stat-number">{stats.areas}</div>
              <div className="stat-label">Áreas</div>
            </div>
          </div>

          {/* Lista de Questões */}
          <div className="questions-section">
            <div className="questions-header">
              <h2>Todas as Questões</h2>
              <div className="questions-info">
                {stats.total} questão(ões) encontrada(s) - Página {currentPage} de {totalPages} (exibindo {Math.min(QUESTIONS_PER_PAGE, questoes.length)} questões por página)
              </div>
            </div>
            
            {loading && <p>Carregando questões...</p>}
            {error && (
              <div className="error-box">
                <strong>⚠ Erro</strong><br />
                {error}<br />
                <small>Certifique-se de que o servidor backend está rodando na porta 3001.</small>
              </div>
            )}
                
          console.log("State historico antes do map:", historico);
            {questoes.map((questao, index) => {
              console.log(
                "questao:", questao.id,
                "historicoIds:", historico.map(h => h.questao_id),
                "respondida:", historico.some(h => String(h.questao_id) === String(questao.id)));

              const questionNumber = (currentPage - 1) * QUESTIONS_PER_PAGE + index + 1;
              const userAnswer = userAnswers[questao.id];
              const showQuestionFeedback = showFeedback[questao.id];

              // NOVA LINHA: Checar se está respondida!
              const respondida = historico.some(h => String(h.questao_id) === String(questao.id));
              
              return (
                <div key={questao.id} className="question-card">
                  <div className="question-header">
                    <div className="question-number">{questionNumber}</div>
                    <div className="question-id">Q{String(questao.id).padStart(3, '0')}</div>
                    <div className="question-tags">
                      <span className="tag tag-taro">{questao.tipo}</span>
                      <span className="tag tag-area">{questao.area}</span>
                      {questao.subtema && <span className="tag tag-subtema">{questao.subtema}</span>}
                    </div>
                  </div>
                  
                  <div className="question-meta">
                    <span>Subtema:</span>
                    <span>Ano: {questao.ano}</span>
                  </div>
                  
                  <div className="question-text">
                    {questao.questao}
                  </div>

                  {questao.imagemQuestao && (
                    <img 
                      src={questao.imagemQuestao} 
                      alt="Imagem da questão" 
                      className="question-image"
                    />
                  )}

                  <div className="alternatives">
                    {questao.alternativas && questao.alternativas.map((alt, altIndex) => {
                      const isSelected = userAnswer === alt.letra;
                      const isCorrect = alt.letra === questao.gabarito;
                      let className = 'alternative';
                      
                      if (showQuestionFeedback) {
                        if (isCorrect) {
                          className += ' correct-answer';
                        } else if (isSelected) {
                          className += ' incorrect-answer';
                        }
                      } else if (isSelected) {
                        className += ' selected';
                      }
                      
                      return (
                        <div 
                          key={altIndex} 
                          className={className}
                          onClick={() => !showQuestionFeedback && handleAnswerSelect(questao.id, alt.letra)}
                        >
                          <span className="alternative-letter">{alt.letra}:</span> {alt.texto}
                        </div>
                      );
                    })}
                  </div>

                  <div className="question-actions">
                    {!showQuestionFeedback && userAnswer && (
                      <button 
                        onClick={() => handleResponder(questao.id)}
                        className="btn btn-respond"
                      >
                        Responder
                      </button>
                    )}
                  </div>

                  {showQuestionFeedback && (
                    <div className="feedback-section">
                      <div className="feedback-tabs">
                        <button 
                          className={`tab-btn ${activeTab[questao.id] === 'gabarito' ? 'active' : ''}`}
                          onClick={() => handleTabClick(questao.id, 'gabarito')}
                        >
                          📝 Gabarito Comentado
                        </button>
                        <button 
                          className={`tab-btn ${activeTab[questao.id] === 'comentarios' ? 'active' : ''}`}
                          onClick={() => handleTabClick(questao.id, 'comentarios')}
                        >
                          💬 Comentários (12)
                        </button>
                        <button 
                          className={`tab-btn ${activeTab[questao.id] === 'estatisticas' ? 'active' : ''}`}
                          onClick={() => handleTabClick(questao.id, 'estatisticas')}
                        >
                          📊 Estatísticas
                        </button>
                        <button 
                          className={`tab-btn ${activeTab[questao.id] === 'notificar' ? 'active' : ''}`}
                          onClick={() => handleTabClick(questao.id, 'notificar')}
                        >
                          🚨 Notificar Erro
                        </button>
                      </div>
                      
                      <div className="tab-content">
                        {activeTab[questao.id] === 'gabarito' && (
                          <div className="gabarito-content">
                            <h4>Gabarito Comentado</h4>
                            <p>Resposta correta: <strong>{questao.gabarito}</strong></p>
                            {questao.gabaritoComentado ? (
                              <div dangerouslySetInnerHTML={{ __html: questao.gabaritoComentado }} />
                            ) : (
                              <p>Comentário do gabarito não disponível para esta questão.</p>
                            )}
                          </div>
                        )}
                        
                        {activeTab[questao.id] === 'comentarios' && (
                          <div className="comentarios-content">
                            <h4>Comentários dos Usuários</h4>
                            
                            {/* Formulário para novo comentário */}
                            <div className="novo-comentario-form">
                              <h5>Adicionar Comentário</h5>
                              <div className="form-row">
                                <input
                                  type="text"
                                  placeholder="Seu nome"
                                  value={novoComentario[questao.id]?.usuario_nome || ''}
                                  onChange={(e) => handleComentarioChange(questao.id, 'usuario_nome', e.target.value)}
                                  className="comentario-input"
                                />
                                <input
                                  type="text"
                                  placeholder="Hospital (opcional)"
                                  value={novoComentario[questao.id]?.usuario_hospital || ''}
                                  onChange={(e) => handleComentarioChange(questao.id, 'usuario_hospital', e.target.value)}
                                  className="comentario-input"
                                />
                              </div>
                              <textarea
                                placeholder="Escreva seu comentário..."
                                value={novoComentario[questao.id]?.comentario || ''}
                                onChange={(e) => handleComentarioChange(questao.id, 'comentario', e.target.value)}
                                className="comentario-textarea"
                                rows="3"
                              />
                              <button 
                                onClick={() => handleComentarioSubmit(questao.id)}
                                className="btn btn-comentario"
                              >
                                Enviar Comentário
                              </button>
                            </div>
                            
                            {/* Lista de comentários */}
                            <div className="comentarios-lista">
                              {loadingComentarios[questao.id] ? (
                                <p>Carregando comentários...</p>
                              ) : comentarios[questao.id] && comentarios[questao.id].length > 0 ? (
                                comentarios[questao.id].map((comentario, index) => (
                                  <div key={index} className="comentario-item">
                                    <div className="comentario-header">
                                      <strong>{comentario.usuario_nome}</strong>
                                      {comentario.usuario_hospital && (
                                        <span className="comentario-hospital"> - {comentario.usuario_hospital}</span>
                                      )}
                                      <span className="comentario-data">
                                        {new Date(comentario.data_criacao).toLocaleDateString('pt-BR')}
                                      </span>
                                    </div>
                                    <div className="comentario-texto">
                                      {comentario.comentario}
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {activeTab[questao.id] === 'estatisticas' && (
                          <div className="estatisticas-content">
                            <h4>Estatísticas da Questão</h4>
                            <div className="stats-grid-small">
                              <div className="stat-item">
                                <span className="stat-label">Acertos:</span>
                                <span className="stat-value">75%</span>
                              </div>
                              <div className="stat-item">
                                <span className="stat-label">Tentativas:</span>
                                <span className="stat-value">1,234</span>
                              </div>
                              <div className="stat-item">
                                <span className="stat-label">Dificuldade:</span>
                                <span className="stat-value">Média</span>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {activeTab[questao.id] === 'notificar' && (
                          <div className="notificar-content">
                            <h4>Notificar Erro</h4>
                            <p>Encontrou algum erro nesta questão? Descreva o problema e enviaremos para o email: <strong>matheusdepauladias@gmail.com</strong></p>
                            
                            <div className="notificar-form">
                              <input
                                type="text"
                                placeholder="Seu nome (opcional)"
                                value={notificacaoErro[questao.id]?.usuario_nome || ''}
                                onChange={(e) => handleNotificacaoErroChange(questao.id, 'usuario_nome', e.target.value)}
                                className="notificar-input"
                              />
                              <textarea 
                                className="error-textarea"
                                placeholder="Descreva o erro encontrado..."
                                value={notificacaoErro[questao.id]?.descricao_erro || ''}
                                onChange={(e) => handleNotificacaoErroChange(questao.id, 'descricao_erro', e.target.value)}
                                rows="4"
                              ></textarea>
                              <button 
                                className="btn btn-send-error"
                                onClick={() => handleNotificacaoErroSubmit(questao.id)}
                                disabled={loadingNotificacao[questao.id]}
                              >
                                {loadingNotificacao[questao.id] ? 'Enviando...' : 'Enviar Notificação'}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Paginação - sempre visível quando há mais de uma página */}
            {totalPages > 1 && (
              <div className="pagination">
                {renderPagination()}
              </div>
            )}
            
            {/* Debug info - remover em produção */}
            {process.env.NODE_ENV === 'development' && (
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f0f0f0', fontSize: '0.8rem' }}>
                Debug: currentPage={currentPage}, totalPages={totalPages}, questoes.length={questoes.length}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;

