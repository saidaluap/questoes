import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import Header from './Header';
import Footer from './Footer';
import Historico from './Historico';

function Perfil() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('perfil');
  const [formData, setFormData] = useState({
    nome: user?.nome || '',
    email: user?.email || '',
    hospital: user?.hospital || '',
    tipo_usuario: user?.tipo_usuario || ''
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Simular atualização do perfil
    setTimeout(() => {
      setMessage('Perfil atualizado com sucesso!');
      setEditing(false);
      setLoading(false);
      
      // Limpar mensagem após 3 segundos
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  const handleCancel = () => {
    setFormData({
      nome: user?.nome || '',
      email: user?.email || '',
      hospital: user?.hospital || '',
      tipo_usuario: user?.tipo_usuario || ''
    });
    setEditing(false);
    setMessage('');
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="profile-container">
            <h1>Meu Perfil</h1>
            
            {/* Abas de navegação */}
            <div className="profile-tabs">
              <button 
                className={`tab-btn ${activeTab === 'perfil' ? 'active' : ''}`}
                onClick={() => setActiveTab('perfil')}
              >
                👤 Meu Perfil
              </button>
              <button 
                className={`tab-btn ${activeTab === 'historico' ? 'active' : ''}`}
                onClick={() => setActiveTab('historico')}
              >
                📚 Histórico
              </button>
            </div>

            {/* Conteúdo das abas */}
            {activeTab === 'perfil' && (
              <div className="tab-content">
                {message && <div className="success-message">{message}</div>}
                
                <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nome">Nome completo:</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  disabled={!editing}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled={true}
                  title="O e-mail não pode ser alterado"
                />
              </div>

              <div className="form-group">
                <label htmlFor="hospital">Hospital:</label>
                <input
                  type="text"
                  id="hospital"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  disabled={!editing}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="tipo_usuario">Ano de Residência:</label>
                <select
                  id="tipo_usuario"
                  name="tipo_usuario"
                  value={formData.tipo_usuario}
                  onChange={handleChange}
                  disabled={!editing}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Acadêmico">Acadêmico</option>
                  <option value="R1">R1</option>
                  <option value="R2">R2</option>
                  <option value="R3">R3</option>
                  <option value="R4">R4</option>
                  <option value="R5">R5</option>
                  <option value="Ortopedista">Cirurgião Ortopédico</option>
                </select>
              </div>

              <div className="profile-actions">
                {!editing ? (
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={() => setEditing(true)}
                  >
                    Editar Perfil
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      disabled={loading}
                    >
                      {loading ? 'Salvando...' : 'Salvar'}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </form>
              </div>
            )}

            {activeTab === 'historico' && (
              <div className="tab-content">
                <Historico />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Perfil;

