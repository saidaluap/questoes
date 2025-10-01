const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro na requisição');
      }
      
      return data;
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  }

  // Questões
  async getQuestoes(filtros = {}) {
    const params = new URLSearchParams();
    
    Object.keys(filtros).forEach(key => {
      if (filtros[key] && filtros[key] !== '') {
        params.append(key, filtros[key]);
      }
    });
    
    const queryString = params.toString();
    const endpoint = queryString ? `/questoes?${queryString}` : '/questoes';
    
    return this.request(endpoint);
  }

  async getQuestao(id) {
    return this.request(`/questoes/${id}`);
  }

  async criarQuestao(questao) {
    return this.request('/questoes', {
      method: 'POST',
      body: JSON.stringify(questao),
    });
  }

  async atualizarQuestao(id, questao) {
    return this.request(`/questoes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(questao),
    });
  }

  async deletarQuestao(id) {
    return this.request(`/questoes/${id}`, {
      method: 'DELETE',
    });
  }

  // Estatísticas
  async getEstatisticas() {
    return this.request('/estatisticas');
  }

// Histórico
async getHistorico(page = 1, limit = 10) {
  const params = new URLSearchParams({ page, limit });
  return this.request(`/historico?${params.toString()}`);
}

async getEstatisticasHistorico() {
  return this.request('/historico/estatisticas');
}

async salvarRespostaHistorico(resposta) {
  return this.request('/historico/salvar-resposta', {
    method: 'POST',
    body: JSON.stringify(resposta),
  });
}

}

export default new ApiService();

