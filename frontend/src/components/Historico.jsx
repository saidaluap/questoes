import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

function Historico() {
  const { token } = useAuth();
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [stats, setStats] = useState({
    total_respostas: 0,
    total_acertos: 0,
    total_erros: 0,
    percentual_acertos: 0
  });
  const [expandedQuestions, setExpandedQuestions] = useState({});

  const ITEMS_PER_PAGE = 10;

const [filtroTipo, setFiltroTipo] = useState('');
const [filtroArea, setFiltroArea] = useState('');
const [filtroAno, setFiltroAno] = useState('');

  const fetchHistorico = async () => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
        if (searchTerm.trim()) params.append('palavraChave', searchTerm.trim());
        if (filtroTipo) params.append('tipo', filtroTipo);
        if (filtroArea) params.append('area', filtroArea);
        if (filtroAno) params.append('ano', filtroAno); 
      //params.append('page', currentPage);
      //params.append('limit', ITEMS_PER_PAGE);


      // Buscar histórico
      const response = await fetch(`http://localhost:3001/api/historico?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setHistorico(data.data);
        setTotalPages(data.pagination.totalPages);
      } else {
        const errorData = await response.json();
       // setError(errorData.message || 'Erro ao carregar histórico');
      }
    } finally {
      setLoading(false);
    }
  };


  const totalRespostasFiltradas = historico.length;
  const totalAcertosFiltrados = historico.filter(r => r.acertou === 1).length;
  const totalErrosFiltrados = historico.filter(r => r.acertou === 0).length;
  const taxaAcertoFiltrada = totalRespostasFiltradas > 0
    ? Math.round((totalAcertosFiltrados / totalRespostasFiltradas) * 100)
    : 0;


  // Buscar estatísticas
  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/historico/estatisticas', {
        headers: { 'Authorization': `Bearer ${token}` }
});

      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  };

  useEffect(() => {
    fetchHistorico();
    fetchStats();
  }, [token, currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchHistorico();
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
    setTimeout(() => {
      fetchHistorico();
    }, 100);
  };

  const handleDeleteResposta = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar esta resposta? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/historico/deletar-resposta/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Remover do localStorage também
        const historicoLocal = JSON.parse(localStorage.getItem('historico_respostas') || '[]');
        const respostaParaDeletar = historico.find(r => r.id === id);
        if (respostaParaDeletar) {
          const historicoFiltrado = historicoLocal.filter(r => r.questao_id !== respostaParaDeletar.questao_id);
          localStorage.setItem('historico_respostas', JSON.stringify(historicoFiltrado));
        }

        // Recarregar dados
        fetchHistorico();
        fetchStats();
        alert('Resposta deletada com sucesso!');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Erro ao deletar resposta');
      }
    } catch (error) {
      console.error('Erro ao deletar resposta:', error);
      alert('Erro de conexão ao deletar resposta');
    }
  };

  const toggleQuestionExpansion = (id) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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
          ◀ Anterior
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

    // Botão Next
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => goToPage(currentPage + 1)}
          className="pagination-btn"
        >
          Próximo ▶
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="historico-container">
      <div className="historico-header">
        <h2>📚 Histórico de Respostas</h2>
        <p>Visualize e gerencie suas respostas anteriores</p>
      </div>

      {/* Estatísticas */}
<div className="stats-grid">
  <div className="stat-card blue">
    <div className="stat-number">{totalRespostasFiltradas}</div>
    <div className="stat-label">Total de Respostas</div>
  </div>
  <div className="stat-card green">
    <div className="stat-number">{totalAcertosFiltrados}</div>
    <div className="stat-label">Acertos</div>
  </div>
  <div className="stat-card red">
    <div className="stat-number">{totalErrosFiltrados}</div>
    <div className="stat-label">Erros</div>
  </div>
  <div className="stat-card purple">
    <div className="stat-number">{taxaAcertoFiltrada}%</div>
    <div className="stat-label">Taxa de Acerto</div>
  </div>
</div>

      {/* Barra de pesquisa */}
<div className="search-container">
  <div className="search-input-group" style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",   // espaçamento entre filtros
    alignItems: "center",
    justifyContent: "flex-start" // ou "center"
  }}>
    <input
      type="text"
      placeholder="Pesquisar"
      className="search-input"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      onKeyPress={e => e.key === 'Enter' && handleSearch()}
      style={{ flex: "2 1 250px", minWidth: 220 }}
    />
    <select
      value={filtroTipo}
      onChange={e => setFiltroTipo(e.target.value)}
      className="search-input"
      style={{ flex: "1 1 140px", minWidth: 120 }}
    >
      <option value="">Tipo de Prova</option>
      <option value="TEOT">TEOT</option>
      <option value="TARO">TARO</option>
    </select>
    <select
      value={filtroArea}
      onChange={e => setFiltroArea(e.target.value)}
      className="search-input"
      style={{ flex: "1 1 140px", minWidth: 120 }}
    >
                  <option value="">Selecione...</option>
                  <option value="Ortopedia">Ortopedia</option>
                  <option value="Trauma">Traumatologia</option>
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
    <select
      value={filtroAno}
      onChange={e => setFiltroAno(e.target.value)}
      className="search-input"
      style={{ flex: "1 1 100px", minWidth: 100 }}
    >
      <option value="">Ano</option>
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
    </select>
    <button onClick={handleSearch} className="btn btn-search">
      🔍 Pesquisar
    </button>
    {(searchTerm || filtroTipo || filtroArea || filtroAno) && (
      <button onClick={handleClearSearch} className="btn btn-clear">
        ✕ Limpar
      </button>
    )}
  </div>
</div>


      {/* Lista do histórico */}
      <div className="historico-content">
        {loading && <p>Carregando histórico...</p>}
        {error && (!historico || historico.length === 0) && (
  <div className="alert alert-danger">
    <b>Erro</b>
    <br />
    {error}
    <br />
    {searchTerm ? 'Tente pesquisar com outros termos ou limpe o filtro.' : 'Você ainda não respondeu nenhuma questão. Vá para o banco de questões e comece a praticar!' }
  </div>
)}

        {!loading && !error && historico.length === 0 && (
          <div className="empty-state">
            <h3>📝 Nenhuma resposta encontrada</h3>
            <p>
              {searchTerm 
                ? 'Tente pesquisar com outros termos ou limpe o filtro.'
                : 'Você ainda não respondeu nenhuma questão. Vá para o banco de questões e comece a praticar!'
              }
            </p>
          </div>
        )}

        {historico.map((resposta, index) => {
          const isExpanded = expandedQuestions[resposta.id];
          const questionNumber = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
          
          return (
            <div key={resposta.id} className="historico-item">
              <div className="historico-header-item">
                <div className="historico-info">
                  <div className="question-number">{questionNumber}</div>
                  <div className="question-meta">
                    <span className={`tag tag-${(resposta.tipo || '').toLowerCase()}`}>{resposta.tipo}</span>
                    <span className="tag tag-area">{resposta.area || ''}</span>
                    {resposta.subtema && <span className="tag tag-subtema">{resposta.subtema}</span>}
                    <span className="tag tag-ano">{resposta.ano || ''}</span>
                    <span className="tag tag-id">ID Questão: {resposta.questao_id}</span>
                  </div>
                </div>
                <div className="historico-result">
                  <div className={`result-badge ${resposta.acertou ? 'correct' : 'incorrect'}`}>
                    {resposta.acertou ? '✓ Acertou' : '✗ Errou'}
                  </div>
                  <div className="response-info">
                    <span>Sua resposta: <strong>{resposta.resposta_usuario}</strong></span>
                    <span>Resposta correta: <strong>{resposta.resposta_correta}</strong></span>
                  </div>
                  <div className="historico-date">
                    {new Date(resposta.data_resposta).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>

              <div className="historico-actions">
                <button 
                  onClick={() => toggleQuestionExpansion(resposta.id)}
                  className="btn btn-expand"
                >
                  {isExpanded ? '▲ Ocultar Questão' : '▼ Ver Questão'}
                </button>
                <button 
                  onClick={() => handleDeleteResposta(resposta.id)}
                  className="btn btn-delete"
                >
                  🗑️ Deletar
                </button>
              </div>

              {isExpanded && (
                <div className="question-details">
                  <div className="question-text">
                    {resposta.questao}
                  </div>
                  
                  {resposta.alternativas && resposta.alternativas.length > 0 && (
                    <div className="alternatives">
                      {resposta.alternativas.map((alt, altIndex) => {
                        const isUserAnswer = alt.letra === resposta.resposta_usuario;
                        const isCorrectAnswer = alt.letra === resposta.resposta_correta;
                        let className = 'alternative';
                        
                        if (isCorrectAnswer) {
                          className += ' correct-answer';
                        } else if (isUserAnswer) {
                          className += ' incorrect-answer';
                        }
                        
                        return (
                          <div key={altIndex} className={className}>
                            <span className="alternative-letter">{alt.letra}:</span> {alt.texto}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="pagination">
            {renderPagination()}
          </div>
        )}
      </div>
    </div>
  );
}

export default Historico;

