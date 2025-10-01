import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { temasData, anosDisponiveis } from '../data/questoes';

const FiltroQuestoes = ({ filtros, onFiltroChange, onLimparFiltros, onAplicarFiltros }) => {
  const [mostrarAvancados, setMostrarAvancados] = useState(false);

  const handleInputChange = (campo, valor) => {
    onFiltroChange(campo, valor);
  };

  const getSubtemas = () => {
    if (!filtros.area) return [];
    return temasData[filtros.area] || [];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Questões de Ortopedia</h2>
      </div>

      {/* Filtros Básicos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Palavra Chave */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Palavra Chave
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={filtros.palavraChave || ''}
              onChange={(e) => handleInputChange('palavraChave', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Tipo de Prova */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Prova
          </label>
          <select
            value={filtros.tipo || ''}
            onChange={(e) => handleInputChange('tipo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecione...</option>
            <option value="TEOT">TEOT</option>
            <option value="TARO">TARO</option>
          </select>
        </div>

        {/* Área Anatômica */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Área Anatômica
          </label>
          <select
            value={filtros.area || ''}
            onChange={(e) => {
              handleInputChange('area', e.target.value);
              handleInputChange('subtema', ''); // Limpar subtema quando área muda
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecione...</option>
            {Object.keys(temasData).map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>

        {/* Ano */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ano
          </label>
          <select
            value={filtros.ano || ''}
            onChange={(e) => handleInputChange('ano', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecione...</option>
            {anosDisponiveis.map(ano => (
              <option key={ano} value={ano}>{ano}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Subtema (aparece apenas se área estiver selecionada) */}
      {filtros.area && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subtema
          </label>
          <select
            value={filtros.subtema || ''}
            onChange={(e) => handleInputChange('subtema', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecione...</option>
            {getSubtemas().map(subtema => (
              <option key={subtema} value={subtema}>{subtema}</option>
            ))}
          </select>
        </div>
      )}

      {/* Botão para mostrar filtros avançados */}
      <button
        onClick={() => setMostrarAvancados(!mostrarAvancados)}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 flex items-center gap-1"
      >
        {mostrarAvancados ? 'Mostrar filtros simples' : 'Mostrar filtros avançados'} 
        <span className="text-xs">{mostrarAvancados ? '↑' : '↓'}</span>
      </button>

      {/* Filtros Avançados */}
      {mostrarAvancados && (
        <div className="border-t pt-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Excluir questões */}
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Excluir questões</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filtros.excluirAnuladas || false}
                    onChange={(e) => handleInputChange('excluirAnuladas', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Anuladas</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filtros.excluirDesatualizadas || false}
                    onChange={(e) => handleInputChange('excluirDesatualizadas', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Desatualizadas</span>
                </label>
              </div>
            </div>

            {/* Questões com */}
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Questões com</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filtros.comGabarito || false}
                    onChange={(e) => handleInputChange('comGabarito', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Gabarito Comentado</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filtros.comComentarios || false}
                    onChange={(e) => handleInputChange('comComentarios', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Comentários</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botões de ação */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onAplicarFiltros}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtrar
        </button>
        <button
          onClick={onLimparFiltros}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Limpar
        </button>
      </div>

      {/* Indicador de filtros ativos */}
      <div className="mt-4 text-sm text-gray-600">
        Filtrar por: Os seus filtros aparecerão aqui.
      </div>
    </div>
  );
};

export default FiltroQuestoes;

