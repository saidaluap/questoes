import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // Simular envio de email de recuperação
    setTimeout(() => {
      setMessage(`Um link de redefinição de senha foi enviado para ${email}. Verifique sua caixa de entrada.`);
      setLoading(false);
      
      // Redirecionar para página de nova senha após 3 segundos
      setTimeout(() => {
        navigate('/nova-senha');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="logo-text">Aprova Ortopedia</h1>
            <h2 className="form-subtitle">Recuperar Senha</h2>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail cadastrado"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
            </button>
            
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error">{error}</div>}
            
            <div className="login-footer">
              <Link to="/" className="signup-link">Voltar ao Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RecuperarSenha;
