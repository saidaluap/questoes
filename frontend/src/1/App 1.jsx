import React, { useState, useEffect } from 'react';
import { Stethoscope, Users, BookOpen, BarChart3, AlertCircle } from 'lucide-react';
import FiltroQuestoes from './components/FiltroQuestoes';
import QuestaoCard from './components/QuestaoCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from './components/ui/pagination';
import ApiService from './services/api';
import './App.css';

function App() {
  const [filtros, setFiltros] = useState({
    palavraChave: '',
    tipo: '',
    area: '',
    subtema: '',
    ano: '',
    excluirAnuladas: false,
    excluirDesatualizadas: false,
    comGabarito: false,
    comComentarios: false
  });

  const [questoesFiltradas, setQuestoesFiltradas] = useState([]);
  const [estatisticas, setEstatisticas] = useState({
    total: 0,
    teot: 0,
    taro: 0,
    areas: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para paginação
  const [paginaAtual, setPaginaAtual] = useState(1);
  const questoesPorPagina = 5;

  // Função para carregar questões da API
  const carregarQuestoes = async (filtrosAplicados = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      // Preparar filtros para a API
      const filtrosAPI = {};
      if (filtrosAplicados.palavraChave) filtrosAPI.palavraChave = filtrosAplicados.palavraChave;
      if (filtrosAplicados.tipo) filtrosAPI.tipo = filtrosAplicados.tipo;
      if (filtrosAplicados.area) filtrosAPI.area = filtrosAplicados.area;
      if (filtrosAplicados.subtema) filtrosAPI.subtema = filtrosAplicados.subtema;
      if (filtrosAplicados.ano) filtrosAPI.ano = filtrosAplicados.ano;
      
      const response = await ApiService.getQuestoes(filtrosAPI);
      setQuestoesFiltradas(response.data || []);
      setPaginaAtual(1); // Reset para primeira página quando carregar novas questões
    } catch (err) {
      setError('Erro ao carregar questões. Verifique se o servidor está rodando.');
      console.error('Erro ao carregar questões:', err);
    } finally {
      setLoading(false);
    }
  };

  // Função para carregar estatísticas
  const carregarEstatisticas = async () => {
    try {
      const response = await ApiService.getEstatisticas();
      setEstatisticas(response.data || { total: 0, teot: 0, taro: 0, areas: 0 });
    } catch (err) {
      console.error('Erro ao carregar estatísticas:', err);
    }
  };

  // Carregar dados iniciais
  useEffect(() => {
    carregarQuestoes();
    carregarEstatisticas();
  }, []);

  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleAplicarFiltros = () => {
    carregarQuestoes(filtros);
  };

  const handleLimparFiltros = () => {
    const filtrosLimpos = {
      palavraChave: '',
      tipo: '',
      area: '',
      subtema: '',
      ano: '',
      excluirAnuladas: false,
      excluirDesatualizadas: false,
      comGabarito: false,
      comComentarios: false
    };
    setFiltros(filtrosLimpos);
    carregarQuestoes();
  };

  // Cálculos para paginação
  const totalPaginas = Math.ceil(questoesFiltradas.length / questoesPorPagina);
  const indiceInicio = (paginaAtual - 1) * questoesPorPagina;
  const indiceFim = indiceInicio + questoesPorPagina;
  const questoesPaginaAtual = questoesFiltradas.slice(indiceInicio, indiceFim);

  // Função para mudar de página
  const handleMudarPagina = (novaPagina) => {
    if (novaPagina >= 1 && novaPagina <= totalPaginas) {
      setPaginaAtual(novaPagina);
      // Scroll para o topo da lista de questões
      document.getElementById('lista-questoes')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Função para gerar números das páginas para exibir na paginação
  const gerarNumerosPaginas = () => {
    const numeros = [];
    const maxPaginasVisiveis = 5;
    
    if (totalPaginas <= maxPaginasVisiveis) {
      for (let i = 1; i <= totalPaginas; i++) {
        numeros.push(i);
      }
    } else {
      const inicio = Math.max(1, paginaAtual - 2);
      const fim = Math.min(totalPaginas, inicio + maxPaginasVisiveis - 1);
      
      for (let i = inicio; i <= fim; i++) {
        numeros.push(i);
      }
    }
    
    return numeros;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Questões de Ortopedia</h1>
              <span className="text-sm text-gray-500">TEOT e TARO - Preparação para Títulos</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                TEOT
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                TARO
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <FiltroQuestoes
          filtros={filtros}
          onFiltroChange={handleFiltroChange}
          onLimparFiltros={handleLimparFiltros}
          onAplicarFiltros={handleAplicarFiltros}
        />

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600">{estatisticas.total}</div>
            <div className="text-sm text-gray-600">Total de Questões</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600">{estatisticas.teot}</div>
            <div className="text-sm text-gray-600">TEOT</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-600">{estatisticas.taro}</div>
            <div className="text-sm text-gray-600">TARO</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-orange-600">{estatisticas.areas}</div>
            <div className="text-sm text-gray-600">Áreas</div>
          </div>
        </div>

        {/* Lista de Questões */}
        <div className="mb-6" id="lista-questoes">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Todas as Questões
          </h2>
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">
              {questoesFiltradas.length} questão(ões) encontrada(s)
              {totalPaginas > 1 && (
                <span className="ml-2">
                  - Página {paginaAtual} de {totalPaginas} 
                  (exibindo {questoesPaginaAtual.length} de {questoesPorPagina} questões por página)
                </span>
              )}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-red-800 font-medium">Erro</span>
              </div>
              <p className="text-red-700 mt-1">{error}</p>
              <p className="text-red-600 text-sm mt-2">
                Certifique-se de que o servidor backend está rodando na porta 3001.
              </p>
            </div>
          )}

          {loading ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Carregando questões...
              </h3>
              <p className="text-gray-600">
                Aguarde enquanto buscamos as questões no banco de dados.
              </p>
            </div>
          ) : questoesFiltradas.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma questão encontrada
              </h3>
              <p className="text-gray-600">
                Tente ajustar os filtros para encontrar questões.
              </p>
            </div>
          ) : (
            <>
              {/* Questões da página atual */}
              <div className="space-y-6">
                {questoesPaginaAtual.map((questao, index) => (
                  <QuestaoCard
                    key={questao.id}
                    questao={questao}
                    numero={indiceInicio + index + 1}
                  />
                ))}
              </div>

              {/* Componente de Paginação */}
              {totalPaginas > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      {/* Botão Anterior */}
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => handleMudarPagina(paginaAtual - 1)}
                          className={paginaAtual === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>

                      {/* Primeira página */}
                      {paginaAtual > 3 && (
                        <>
                          <PaginationItem>
                            <PaginationLink 
                              onClick={() => handleMudarPagina(1)}
                              className="cursor-pointer"
                            >
                              1
                            </PaginationLink>
                          </PaginationItem>
                          {paginaAtual > 4 && (
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                          )}
                        </>
                      )}

                      {/* Páginas visíveis */}
                      {gerarNumerosPaginas().map((numeroPagina) => (
                        <PaginationItem key={numeroPagina}>
                          <PaginationLink
                            onClick={() => handleMudarPagina(numeroPagina)}
                            isActive={numeroPagina === paginaAtual}
                            className="cursor-pointer"
                          >
                            {numeroPagina}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      {/* Última página */}
                      {paginaAtual < totalPaginas - 2 && (
                        <>
                          {paginaAtual < totalPaginas - 3 && (
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                          )}
                          <PaginationItem>
                            <PaginationLink 
                              onClick={() => handleMudarPagina(totalPaginas)}
                              className="cursor-pointer"
                            >
                              {totalPaginas}
                            </PaginationLink>
                          </PaginationItem>
                        </>
                      )}

                      {/* Botão Próximo */}
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => handleMudarPagina(paginaAtual + 1)}
                          className={paginaAtual === totalPaginas ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Stethoscope className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">Questões de Ortopedia</span>
            </div>
            <p className="text-gray-600 mb-2">
              Plataforma de estudos para TEOT e TARO
            </p>
            <p className="text-sm text-gray-500">
              Desenvolvido para estudantes de ortopedia e traumatologia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

