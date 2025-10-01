import React, { useState } from 'react';

function Footer() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

    // Simular envio do email
    const mailtoLink = `mailto:matheusdepaladias@gmail.com?subject=Relato de Problema - Aprova Ortopedia&body=De: ${formData.email}%0D%0A%0D%0AProblema relatado:%0D%0A${encodeURIComponent(formData.message)}`;
    
    // Abrir cliente de email
    window.location.href = mailtoLink;
    
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      
      // Fechar modal após 2 segundos
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        setFormData({ email: '', message: '' });
      }, 2000);
    }, 1000);
  };

  const openModal = () => {
    setShowModal(true);
    setSuccess(false);
    setFormData({ email: '', message: '' });
  };

  const closeModal = () => {
    setShowModal(false);
    setSuccess(false);
    setFormData({ email: '', message: '' });
  };

  return (
    <>
      <footer className="app-footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2025 Aprova Ortopedia. Todos os direitos reservados.</p>
            <button className="footer-link" onClick={openModal}>
              RELATAR PROBLEMA
            </button>
          </div>
        </div>
      </footer>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Relatar Problema</h2>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            
            {success ? (
              <div className="modal-body">
                <div className="success-message">
                  <h3>Problema relatado com sucesso!</h3>
                  <p>Seu cliente de email foi aberto com a mensagem pré-preenchida.</p>
                </div>
              </div>
            ) : (
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Seu e-mail:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Descreva o problema:</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      placeholder="Descreva detalhadamente o problema encontrado..."
                      required
                    ></textarea>
                  </div>
                  
                  <div className="modal-actions">
                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      disabled={loading}
                    >
                      {loading ? 'Enviando...' : 'Enviar Relatório'}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={closeModal}
                      disabled={loading}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;

